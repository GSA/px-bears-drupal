#!/bin/bash

# Define the threshold for stale branches (e.g., 30 days)
export STALE_THRESHOLD_DAYS=30

export CURRENT_DATE=$(date +%Y-%m-%d)  # Define and set the current date in the desired format
# Run the git for-each-ref command and save the output to a variable
output=$(git for-each-ref --format='%(refname:short) %(committerdate:short)' refs/remotes/origin/ | sort | uniq)

# Initialize an empty array
branch_list=()

# Read lines one by one and append them to the array
while IFS= read -r line; do
  if [ "$line" != "origin/main" ] && [ "$line" != "origin/release" ]; then
    branch_list+=("$line")
  fi
done <<< "$output"

for branch in "${branch_list[@]}"; do
  branch_name=$(echo $branch | cut -d ' ' -f 1)
  last_commit_date=$(echo $branch | cut -d ' ' -f 2)

  # Calculate the age of the branch in days
  branch_age=$(( ( $(date -d "$CURRENT_DATE" +%s) - $(date -d "$last_commit_date" +%s) ) / 86400 ))

  echo "Branch: $branch_name, Last Commit Date: $last_commit_date, Age: $branch_age days"

  # Check if the branch is stale
  if [ "$branch_age" -gt "$STALE_THRESHOLD_DAYS" ]; then
      git checkout $branch_name
    # Create a pull request to merge the stale branch into the main branch
      gh pr create --base "main" --title "[Stale Branch] - Please review $branch_name" --assignee "${Tech_lead}" --reviewer "${Tech_lead}" --body "Hi ${Tech_lead} This PR is ready for your review! This branch has been stale. Thank you!"
      exit 0
  fi
done

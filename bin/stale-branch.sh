#!/bin/bash

# Define the threshold for stale branches (e.g., 30 days)
export STALE_THRESHOLD_DAYS=30

export CURRENT_DATE=$(date +%Y-%m-%d)  # Define and set the current date in the desired format
# Run the git for-each-ref command and save the output to a variable
output=$(git branch -r |  grep -v "main\|release")
# Initialize an empty array
branch_list=()

# Read lines one by one and append them to the array
while IFS= read -r line; do
    branch_list+=("$line")
done <<< "$output"

git fetch --all --prune 
for branch in "${branch_list[@]}"; do
  now=$(date +'%s')
  commit_time=$(git log -1 --date=raw ${branch} | grep ^Date | awk '{print $2}')
  commit_days=$(( (${now} - ${commit_time}) / 86400 ))
  echo "Branch: $branch, Last Commit Date: $commit_time, Age: $commit_days days"

  # Check if the branch is stale
  if [ ${commit_days} -gt ${STALE_THRESHOLD_DAYS} ]; then
      git checkout $branch 
      current_branch=$(git branch --show-current)
      echo "current branch is $current_branch"
      echo $branch
      git pull $branch
    # Create a pull request to merge the stale branch into the main branch
      gh pr create --base "main" --head $branch --title  "[Stale Branch] - Please review $branch" --assignee "${Tech_lead}" --reviewer "${Tech_lead}" --body "Hi ${Tech_lead} This PR is ready for your review! This branch has been stale. Thank you!"
      exit 0
  fi
done

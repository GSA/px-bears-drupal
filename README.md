# BEARS custom module and USWDS theme

Docs to be written

# Accessibility Statement

We are committed to making our site accessible to all visitors. Our ongoing accessibility effort works towards conforming to Web Content Accessibility Guidelines (WCAG) version 2.1, level AA criteria and by performing regular automatic and manual testing audits.

# Local Development Environment using LANDO

### Get USAgov code
```
git clone git@github.com:GSA/usagov-benefits-eligibility.git poc
cd poc`
```

### Remove /bin files
```
rm -rf bin
```

### Start LANDO

```
Create .lando.yml
name: poc
recipe: drupal9
config:
webroot: web
```
```
lando start
lando ssh
```

### Install Drupal modules
```
composer install --no-interaction --optimize-autoloader
```

### Install Drupal site
```
drush site:install --db-url=mysql://drupal9:drupal9@database/drupal9 -y
```

###Import USAgov database

Download SQL Database
Safe development database dumps are kept in Google Drive:
https://drive.google.com/drive/folders/1zVDr7dxzIa3tPsdxCb0FOXNvIFz96dNx?usp=sharing.
Download and Unzip the respective zip file, for example stage.prod.4564.post-deploy.sql.zip
Rename uncompressed .sql file to just usagov.sql, and place it into the root of your repo.

```
sed -e 's/utf8mb4_0900_ai_ci/utf8mb4_unicode_ci/g' usagov.sql | drush sqlc
```
This could take over 10 minutes. It will return you to the command prompt when it is done.

Get into USAgov database.
```
mysql -u drupal9 -pdrupal9 --host database drupal9
```

### Get into USAgov local website
```
drush cr
drush uli
http://default/user/reset/1/123456789/ai6u4-iY1LgZFUjwVW2uXjh5jblqgsfUHGFS_U/login

http://poc.lndo.site
```

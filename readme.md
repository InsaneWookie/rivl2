# Getting started

- Get the Homestead vagrant up and running: https://laravel.com/docs/5.5/homestead
- Check out this project
- Update the vagrant file to map the checked out directory 
- Make a copy of .env.example and rename it to .env
  - Set the APP_KEY and DB_DATABASE 
- TODO: create database (for now restore from backup)
- run `composer install`
- run `npm install` this will mostly complete 
- run `npm install --no-bin-links` (there is some issue with the vagrant shared folder and symlinks)
- update host file, add something like `192.168.10.10	rivl2`
- `npm run watch-poll` to recompile frontend on save

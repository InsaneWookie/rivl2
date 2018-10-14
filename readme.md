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


Docker (Laradock)
- Enable debugging, edit laradock .env file (WORKSPACE_INSTALL_XDEBUG=true)

docker-compose build mysql nginx workspace

Running tests
Unit test from PhpStorm


Using custom docker-compose

- Make a copy of .env.example and rename it to .env
  - Set the APP_KEY
  
- Create a .env.mysql file
  - add MYSQL_ROOT_PASSWORD=\<root user password\>  
- Set database params 
  - DB_HOST=db 
  - DB_PORT=3306
  - DB_DATABASE=rivl2
  - DB_USERNAME=root
  - DB_PASSWORD=\<same as MYSQL_ROOT_PASSWORD\>
  
`docker-compose up -d`

`docker-compose exec db mysql -p -e 'create database rivl2'`

Composer install

`docker run --rm --interactive --tty --volume $PWD:/app --user $(id -u):$(id -g) composer install`

NPM install

`docker run --rm --interactive --tty --volume $PWD:/app -w /app --user $(id -u):$(id -g) node npm install`

Database

`docker-compose exec app php artisan migrate`
  
 


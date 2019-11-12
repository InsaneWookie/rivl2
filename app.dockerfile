FROM composer AS composer_install

COPY . /app

RUN composer install

FROM node:10 AS npm_install

WORKDIR /home/node/app/

COPY package.json /home/node/app
COPY package-lock.json /home/node/app

RUN npm install

FROM php:7.2-fpm-alpine3.8

RUN apk add libmcrypt-dev \
    && docker-php-ext-install pdo_mysql

WORKDIR /var/www
COPY . /var/www/
COPY --from=composer_install /app/vendor ./vendor
COPY --from=npm_install /home/node/app/node_modules ./node_modules

RUN chown -R www-data:www-data /var/www/bootstrap
RUN chown -R www-data:www-data /var/www/storage


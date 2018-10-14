FROM php:7.2-fpm-alpine3.8

RUN apk add libmcrypt-dev \
    && docker-php-ext-install pdo_mysql

COPY . /var/www/

RUN chown -R www-data:www-data /var/www/bootstrap
RUN chown -R www-data:www-data /var/www/storage

WORKDIR /var/www
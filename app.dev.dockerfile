FROM php:7.2-fpm-alpine3.8

RUN apk add libmcrypt-dev \
    && docker-php-ext-install pdo_mysql

RUN apk add git zip

RUN apk add --update nodejs nodejs-npm

WORKDIR /var/www

RUN curl --silent --show-error https://getcomposer.org/installer | php
RUN mv composer.phar /usr/local/bin/composer

WORKDIR /var/www
COPY . /var/www/
#COPY --from=composer_install /app/vendor ./vendor
#COPY --from=npm_install /home/node/app/node_modules ./node_modules

RUN chown -R www-data:www-data /var/www/bootstrap
RUN chown -R www-data:www-data /var/www/storage


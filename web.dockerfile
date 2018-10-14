FROM nginx:alpine

COPY ./public /var/www/public

ADD ./vhost.conf /etc/nginx/conf.d/default.conf
WORKDIR /var/www
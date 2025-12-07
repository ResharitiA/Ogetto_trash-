FROM php:8.2-cli

RUN apt-get update && apt-get install -y \
    libpq-dev && \
    docker-php-ext-install pgsql pdo_pgsql

COPY php.ini /usr/local/etc/php/php.ini

WORKDIR /var/www/html

CMD ["php", "-S", "0.0.0.0:8000", "-t", "/var/www/html"]

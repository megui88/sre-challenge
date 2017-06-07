#!/bin/bash

set -e

host="$1"
user="$2"
pass="$3"

until mysql -h"$host" -u"$user" -p"$pass"; do
  >&2 echo "Mysql is unavailable - sleeping"
  sleep 1
done

>&2 echo "Mysql is up - executing command"
cd /src;
node app/daemon.js
#!/bin/bash

#cat /usr/share/nginx/html/assets/settings.json | jq '.apiBaseUrl=$API_BASE_URL' --arg API_BASE_URL "$API_BASE_URL" >>tmp.$$.json
#mv tmp.$$.json /usr/share/nginx/html/assets/settings.json

#cat /usr/share/nginx/html/assets/settings.json

config="window.config = { baseUrl: '$API_BASE_URL', webhost: '$WEB_BASE_URL' };"

echo $config > /usr/share/nginx/html/config.js

find /usr/share/nginx/html -exec touch -a -m {} +

exec "$@"

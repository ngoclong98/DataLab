FROM nginx:1.21

# UPDATE TIMEZONE
ENV TZ=Asia/Bangkok
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

# INSTALL JSON EDITOR
RUN apt-get update \
    && apt-get install -y jq

# COPY CONF
COPY docker/nginx_default.conf /etc/nginx/conf.d/default.conf

# ENV VARIABLE
ENV API_BASE_URL "http://localhost:8080"

# COPY START SCRIPT
ADD docker/docker-entrypoint.sh docker-entrypoint.sh
RUN chmod +x docker-entrypoint.sh

# COPY HTML
COPY build /usr/share/nginx/html

ENTRYPOINT ["./docker-entrypoint.sh"]

CMD ["nginx", "-g", "daemon off;"]

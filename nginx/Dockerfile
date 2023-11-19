FROM nginx:stable-alpine

RUN rm /etc/nginx/conf.d/*
RUN rm /usr/share/nginx/html/*

COPY ./configs/default.conf /etc/nginx/conf.d/default.conf

CMD [ "nginx", "-g", "daemon off;" ]
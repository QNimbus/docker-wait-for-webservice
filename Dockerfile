FROM node:latest

WORKDIR /

ADD healthcheck.js /

ENTRYPOINT ["node", "healthcheck.js"]
CMD []
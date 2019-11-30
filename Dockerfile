FROM python:3.6-alpine

# set work directory
WORKDIR /app/api

# set environment variables
ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

# install psycopg2 and yarn
RUN apk update \
    && apk add --virtual build-deps gcc python3-dev musl-dev \
    && apk add postgresql-dev curl nodejs yarn\
    && pip install psycopg2 \
    && apk del build-deps

# install Python dependencies
COPY api/requirements.txt /app/api/requirements.txt
RUN pip install -r requirements.txt

# install JS dependencies
WORKDIR /app/frontend
COPY ./frontend/package.json ./frontend/yarn.lock /app/frontend/
RUN yarn install

# copy rest of project
COPY . /app/

# build static files
RUN yarn build

# collect static files
WORKDIR /app/frontend/build
RUN mkdir root && mv *.ico *.js *.json root

WORKDIR /app/api

# run entrypoint.sh
ENTRYPOINT ["/app/api/entrypoint.sh"]
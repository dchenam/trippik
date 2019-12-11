# Trippik

Trippik is a platform for creating trip itineraries and tourist locations similar to 
Trip Advisor made for fun and self-learning.

It's built using Django and Django Rest Framework, while the frontend is done in React and Redux.
While Trippik is configured to be deployed on Heroku, the entire application 
is dockerized such that you deploy it on any platform.

[Demo Site](https://trippik.io)

### Features
 - Place creation, deletion, and viewing.
 - Place search by keyword and location.
 - Anonymous trip creation, editing, and viewing.
 - Saving multiple user trips.
 - URL link trip sharing.
 - User Login and Authentication.

#### In Progress
 - [ ] Picture Upload
 - [ ] Place recommendations
 - [ ] Trip ordering recommendations by distance and time allotted
 
## Usage
**Local**

1) Define environmental variables for postgres and a secret key.
2) ```$ docker-compose build && docker-compose up ```

# Micro-Messenger

# Description
  Micro-Messenger is a simple, micro-service based chat application consisting of an authentication, group, message, and web service. Micro-Messenger runs on Docker for local development and each micro-service runs in a Docker container. Each micro-service is also configured for load testing. Descriptions of each micro-service below and how to load test locally can be found below.


# Micro-services
  Authentication service:
    - Stores users' usernames and passwords (encrypted with bcrypt)
    - Handles signing up new users and logging in existing users

  Group service:
    - Stores and deletes group name(s) in the database (must be unique name)

  Message service:
    - Stores and deletes messages in database for each group

  Web service:
    - Front-end service, contains React components
    - Delegates requests to other micro-services

# Load testing


# Installation


# Usage


# Credits
  Bongani Mashele: https://github.com/bjmashele
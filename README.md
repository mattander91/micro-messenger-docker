# Micro-Messenger

# Description
  Micro-Messenger is a simple, micro-service based chat application consisting of an authentication, group, message, and web service and serves as a demonstration for how each service is connected together. Micro-Messenger runs on Docker for local development and each micro-service runs in a Docker container. Each micro-service is also configured for load testing. Descriptions of each micro-service below and how to load test locally can be found below.


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


# Installation
  Micro-Messenger micro-services run on Docker containers which can be thought of as virtual environments containing their dependencies, code, environment variables, and anything else specific to the micro-service.

  1.) Clone this repo on your local machine: https://github.com/mattander91/micro-messenger.git

  2.) Install Docker:
    Docker for Mac: https://docs.docker.com/docker-for-mac/install/
    Docker for Windows: https://docs.docker.com/docker-for-windows/install/

  3.) Once Docker is successfully installed, Docker-specifc commands can be used in the terminal. Assuming Node is installed, cd into the cloned repo and run docker-compose up on the terminal. This will take some time to run the Docker containers as dependencies need to be installed for each micro-service. Once the Docker images have been built, running docker-compose up will run the app quicker than the initial installation.

  4.) Once the containers are running, visit http://0.0.0.0:3000/ in a browser window to view the app.


# Load testing
  Artillery.io is installed on each Docker container running a micro-service, and each micro-service can be load tested on the command line. After running docker-compose up (see 'Installation'), cd into the 'test' directory of the microservice you want to load test, and run artillery run -e dev loadTest.yml. Once the test is done running, a summary report will appear.

  Each 'test' directory contains a .csv file containing test data to load test each service. Test parameters (seconds run, number of virtual users) can be configured in each loadTest.yml file.

  Artillery.io references:
    - General docs: https://artillery.io/docs/
    - Test file reference: https://artillery.io/docs/script-reference/
    - Summary report reference: https://artillery.io/docs/getting-started/   (see bottom)


# Usage
  1.) To submit/send messages, first create a new group in the input that says 'Add new group...' and click enter.
  2.) Click on the group name on the left column and type a message in the input toward the bottom of the page and click enter to submit the message.
  3.) If you are currently logged in, you should see your messages appear toward the right side of the page with your username tagged.
  4.) To delete a group, click the trash can icon next to the group name to remove the group and the group's messages.


# Credits
  Matthew Anderson: https://github.com/mattander91


# Issues
  Refactor click handling methods on web_service. Condense into one function
  Refactor SignUp.js and Login.js components into one. Refactor form submissions
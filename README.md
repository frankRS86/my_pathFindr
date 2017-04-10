This is the pathfindr browser game designed for Adidas.

It's written with the Angular 2 framework and TypeScript as main language.

### install and run ###

1. clone the project to your local repository

#host via node.js#
This is the most interesting way if you want see the typescript compiler and continuous
unit tests working live while changing something locally 

- install node.js (https://nodejs.org/en/download/)
- remember to add installation-path to your path variable
- open a terminal and move to your local cloned repository
- run "npm install" 
- maybe you have to install cli separately ("npm install angular-cli")
- when it's finished run "npm start" or "ng serve"
-> this starts a websever on "localhost" and port 3000. (port 4200 if ng serve is executed) It should also open your default browser
with this adress. If not please start manually. 

- if you are interested in the karma unit-tests and continuous-testing run "npm test"

#deploy on webserver#
- might not work on every webserver without making further settings.


#if you want to run karma unit-tests:
- node.js should be installed


#
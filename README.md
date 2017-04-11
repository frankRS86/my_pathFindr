This is the pathfindr browser game.

It's written with the Angular 2 framework and TypeScript as main language.

I used Angular because in my opinion, it's currenty one of the best SPA Framework available.
With the component based structure and the use of Typescript, it's possible to build very well structured object oriented
applications. This makes it easy to work as a team on large scale applications, by separating the program in
modules and subcomponents.
It's possible to define own directives and services which can be used in the whole project (e.g. the Tile-Component here).

One of the most popular features is the double-property-binding. In the pathfindr application some synchronisation
work has to be done to update the view and process the user input. The property binding helps, keeping all data between view
and model layer automatically up to date. You can see this effect in the views/board.component.ts and its corresponding html file which basically represents the playing-board.
It large-scale applications this saves a lot of synchronisation effort and middleware code.

The framework also includes good support and integration of the reactive Rxjs framework for event driven structures.
Keeping all parts of the application up to date is challenging and polling of data should be avoided because of traffic and performance reasons. Rxjs offers a perfect possibiliy via the observable pattern to inform all interested clients about certain events (in this case it's used for the scoreboard). This is a very powerful and fast mechanism for asynchronous programming
and currently one of the most hyped topics in software development. It can be used for any async request, like classic http-request/responses

In regards of quality assurance the continous test integration by jasmine-framework and karma should be mentioned, which heavily support test driven development.
These offer a way to unit test single services and components or create end-to-end tests. You can have a look at the .spec.ts
files, which contain the unit tests for the game. If you like to run continuous testing on the project call "npm test" in the cloned repo 


### install and run ###

1. clone the repository to your local machine
git clone https://github.com/frankRS86/my_pathFindr

#host via node.js#

This is the most interesting way if you want see the typescript compiler and continuous
unit tests working live while changing something locally 

- install node.js (https://nodejs.org/en/download/)
- remember to add installation-path to your path variable
- open a terminal and move to your local cloned repository
- run "npm install" 
- when it's finished run "npm start" or "ng serve"
-> this starts a websever on "localhost" and port 4200. (might be port 3000 if cli is not installed properly) It should also open your default browser
with this adress. If not please start manually and type in the url "localhost:4200". (Replace localhost by the ip-adress if you want to access the game via a mobile device in the same network)

- if you are interested in the karma unit-tests and continuous-testing run "npm test"

#deploy on any webserver#
- might not work on every webserver without making further configs/settings!
- I testet it with the OSX Build-In Apache Server and Node http-server
- copy the content of the "dist" folder to the root of your webserver. 
  (index.html must be there)
- access the host adress via any browser (e.g. localhost:yourPort or 127.0.0.q:yourPort)



// express.js for creating web servers and HTTP requests really easy

var express = require('express'); // we're going to store all the code in the express library
var app = express();

// heroku actually sets an environment variable and it gives you the port you need to listen to
var PORT = process.env.PORT || 3000; // when you use uppercase for a variable name in javascript, you're saying that variables value shouldn't be changed, should be constant

/*
    + When deploying to the cloud, port ?
    - This will depend on your cloud hosting server/service. 
      They usually assign a port for your Node app to use by providing the PORT environment variable.    
*/
var middleware = require('./middleware.js');
/*
    express feature => middleware: makes it really easy to run a specific function for all of your routes or just for some.
    you could add have a middleware that requires authentication.
    app level middleware which runs for every route --- route level middleware for certain routes
    it lets you add stuff to specific routes or to everything in your application
*/

// it runs for every single route and it's pretty useful
app.use(middleware.logger); // ctrl + shift + R(ctrl + f5) force(hard) reload - overriding cache => when you load a page, your browser stores a local copy on your computer — this is called a 'cache'.
// favicon.ico => this file is used inside of the tab in chrome, it's like your little logo for your website

// sense require auth is going to run first before the body 
// * the order you define them in is important 
// * if i were to put this use call down below the about route, it would never run 
// when you call app.use you adding app level middleware, it's gonna get called every page requested and every route hit 
// app.use(middleware.requireAuthentication); 

// now we can add route
// app.get('/', function (req, res) { // first argument for app is route (url)
//     res.send('Hello Express!');
// });
// index.html => it's the default file if none is specified for route '/'


// add another route to our express server app
// route level authenticaton => add as a second argument to route
app.get('/about', middleware.requireAuthentication, function (req, res) { // about page
    res.send('About us!');
});

/*  
   we can also expose a folder in your project as a web server, any web site has a web server behind it
   it's serving up html files,css files, js files, images...

   everything in public is going to be exposed to any visitor of our site, front-end app inside of the public folder
   and it would access the back-end API to get data from the database and create new data 
*/

// what we need to do is tell express that we want to expose an entire folder inside of our web server
app.use(express.static(__dirname + '/public')); // takes the folder that you want to expose, we set up static server, we can now access anything inside of that folder, navigate to => localhost:3000/index.html

// app.use(express.static(__dirname + '/../public')); // maybe different folder level

/**
 *  express.static is built-in middleware. Since we're not using our requireAuth middleware with the static assets, it's never going to run. 
    To make your static assets private you'll need to add some top-level middleware by calling app.use.
 */

// and tell the app which port to listen on
app.listen(PORT, () => { // it gets called once the server starts
    console.log('Express server started to listening on port: %d', PORT);
});


/*
    req: request holds all the information sent from the user like url, any json they passed along, any cookies or other data, it's an object
    res: response is what you want to send back to the user, it's an object
    app.get: get corresponds to the HTTP GET METHOD, request method, request some info from the server with req data
*/

/*
    If you install nodemon and use it to run your server, it will auto-restart when changes are made to app.js

    npm install nodemon@... --save
    nodemon app.js  
*/

/**
    Middleware can be confusing, so let's make it as simple as possible. Middleware is nothing more than one JavaScript function. That's it.

    The function gets passed into app.use(someFunction); and now it's registered to the application and will get called every time a request comes through.

    Now onto the things you can do inside of middleware. You function should expect to get 3 arguments:

    1) req - This stores the request info like the url thats being requested and any data that may have been sent along to the server
    2) res - This object lets you respond to the request to send back to the user.
    3) next - This is a function that gets called when the middleware is done. It lets express know to move on to the next middleware function or onto the final request handler.

    Now middleware can do ANYTHING. But that's not useful to know! 
    I more realistic example would be middleware that helps authenticate users.
    You might use the req argument to get the users auth token or email/password. 
    If the user was not authenticated you can use the res object to send an error back.
    If they are authenticated you can call next to let them into the app.
 */

/**
    API is short for application programming interface.
    In a general sense, and API is how a programmer can interact with some library or system. 
    For example, most of the 3rd party modules have an API (a way the user can interact with the module, here user can be developer as well).
    In the case of the Todo API, it's an HTTP API. Meaning that instead of calling functions or methods, you're making HTTP requests to specific urls. 
    It's still an API though. It's a way for a developer to interact with the system.
 */

 /** --------------------------Git------------------------------------------
  * git init , initialize a new repository, the entire repository is stored under a hidden .git folder that's created inside web-server folder
  * git status , see which code hasn't been saved or saved to be committed => to be tracking changes or not
  * git add . , add all folders and files in current dir to tracking changes
  * git rm -r --cached node_modules ,  remove from cached to be committed(ignore) for not tracking changes,  we don't want to tracking the node_modules folder since we can reinstall these npm modules at any time, there is node need for us carry all that weight
  * .gitignore lets you specify files and folders you want git to ignore, in this case we never want to track changes to anything in the node_modules folder so we added to .gitignore file
  *   now we're ready to make our first commit which saves the current state of the project
  *   to make a commit;
  * git commit -a -m "Initialize repo"   => 'a' flag for changes(every file) - even those that are unstaged -  to commit for modified files or add files, m flag for message
  *   now anytime we make changes to files we can track these changes and see differences
  * ------ 
    *  There's files that git doesn't track those files are called untracked files
    *  Then there is individual file that get knows about
    *  They can either be unchanged or changed, if files changed;
    *  It's not necessarily going to be commited until it's what's called staged
    *  Everything that's staged is going to be committed on the next commit
  * git remote add origin https://github.com/serhatates/web-server.git (first we create repo on github)
  * git remote, check it see origin
  * git remote -v , verbose - see exact url
    * to use ssh-keygen on windows , need to use Git Bash 
    * ssh: The client needs the correct public key, and you need the private key on your local machine.
    *  Any service you give the public key to will be able to authenticate you just fine. 
    *
    * 
    * ----for heroku----
    git diff, see differences
    git commit -am "Update port for heroku"
    git push, leave off the remote which origin and the branch which is master, since the origin remote th master branch are default

    we also set that matching configuration variable when we first installed git, that's how heroku knows to push the branch you are on

  */

  /**
    * -----------------ssh key-------------------------
    * SSH Keys let you authenticate with a service without needing to type in your username and password every time you want to communicate.
    *
    * When you attempt to connect, your machine tells the server which public key it wants to use. 
    * This would be the one you copied over to GitHub/Heroku. 
    * The server checks if the associated public key exists on their side. 
    * If it does, it encrypts a random message using the public key and sends it back to your machine. 
    * The only way to decrypt that message is using the associated private key.
    *
    * Your machine tries to decrypt it using the private key. 
    * When it does, it hashes the result and sends it back to the server for verification.
    * Since the server is the one who generated the unencrypted random message, it's able to verify the result sent back from the client.
    *
    * I keep one SSH Key per machine. 
    * 
    * on git bash for adding shh key on windows, need to run;
    *   eval "$(ssh-agent -s)"
    *   ssh-add ~/.ssh/id_rsa
    * test for checking ssh key;
    *   ssh -T git@github.com
    * 
   */
  
   /**---------------heroku------------------------
    *  heroku create, creates a brand new Heroku app
    *  heroku open, open the app, boiler plate heroku app created
    *    once we push our code you are going to see our  project;
    *  git push heroku master
    */ 
   
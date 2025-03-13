# Paytm GitHub Challenge - Employee Review System

## About the solution

Only a subset of the requirements were implemented (per my conversation with Adam M).

Specifically, the following were implemented:
- A simple static React.js front end for viewing, adding and removing employees from the system.
  * Browser localStorage is used for persistence.
- A node/express-based REST API for managing employees
  * Employees are simply persisted in server memory at the moment
  * The validation and logic here is more robust than the localStorage implementation on the front end
- Skeletal structure, build scripts, etc. for the front and back end.
- A work-in-progress MongoDB database dump, which illustrates my thinking in terms of database design
- Tests

## Limitations

### Incomplete features

I'd be happy to discuss how the remaining features would work. My hope is that the existing functionality is sufficient to show that I'm capable of building the rest.

### Backend integration

I have not found the time to connect the front end to the REST API or the node back end to MongoDB, but I'd be more than happy to discuss how this would be done.

### Hastily-written front end code

The front end code was written quickly.  Logic is not properly separated from view and it does not follow React best practices, such as having stateless dumb components wrapped in smart components and using a proper state container like redux.

Again I'd be happy to tear apart my code and tell you everything wrong with each line and how it should be done instead. Just ask me :)

The front end UI/UX isn't great, but I'm no designer. I trust your browser supports [rebeccapurple](http://meyerweb.com/eric/thoughts/2014/06/19/rebeccapurple/).

### Authentication and employee profiles

Authentication was planned using passport.js and Google Accounts but I did not get the time to implement this.

The important thing to note here is that an internal system like this shouldn't force employees to create a new account/password for it.  Instead, the app should be able to leverage the IDs that employees already use in a day-to-day basis on their jobs (this would be Active Directory / AD FS for many enterprise customers, or for smaller companies that use GSuite / Google Apps it could use their Google Account).

Real-life employee profiles would have many more fields than the minimal set supported by this app (email and name).

Typically, an organization will have authoratitive sources for employee profile information such as AD, PeopleSoft, etc.  If organizations like this are the target customer then the app should strive not to needlessly duplicate or contradict this information (e.g. employee job titles).

## Alternative universes

I considered doing things differently.

To reduce boilerplate boring CRUD code I could have made an assumption that the admin functions (e.g. managing employees and their reviews) could have been handled in something like Excel or Google Sheets.  I could've assumed that only a small part of the application required a web interface to this employee and review data (e.g. a web UI just for employees to leave review feedback for each other).  But this isn't a great assumption, and I figured you're all interested in knowing if I can do fundamental things instead of mastering the simple Google Sheets API.

I could have also explored back-end as a service (e.g. Firebase), admin UI as a service (e.g. ForestAdmin.com), CRUD code generation tools, etc but again I figured you wanted to see the fundamentals implemented by hand.

## System requirements

This has been tested on node v6.9.x (LTS) on Windows and macOS.  It will likely work on older versions of node.js as well.

## Install dependencies

```bash
npm install -g create-react-app
npm install
```

or via yarn:

```bash
yarn global add create-react-app
yarn
```

Developers should install ```eslint```.  A code editor that supports hints and error checking via ```JSDoc``` is also highly recommended.  ```flow``` was considered, but there are currently no flow type hints in the custom code (during development ```flow``` was only used for editor hints on 3rd party libraries).

## Running webpack dev mode

Running in dev mode supports hot reloading of code changes, but it runs only the static React web app (does not run the node.js REST API at this time).  The front end React app does not currently make use of the REST API, so this works well enough to see the front end in action.

To run in dev mode:

```bash
npm start
```

In this mode when you save code changes (JS, CSS, etc) it should instantly reflect in the browser.

## Building and running production code

```bash
npm run build
node server
```

This serves a bundled/minified version of the app.  It still supports a decent level of debugging via source maps.

This will also serve the REST API at ```/api/employees```.

## Tests

```bash
npm run test
```

See *.test.js in the code, e.g. server/api/employees/employees.test.js.

Some rest API integration tests are available as a Postman collection (see 'API Integration Tests.postman_collection.json'). You can use [Newman](http://blog.getpostman.com/2014/05/12/meet-newman-a-command-line-companion-for-postman/) to automate the running of the Postman tests and this can be included in the build process.

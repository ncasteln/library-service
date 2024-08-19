# library-service

The App is a simulation of a Library service, in which the logged user can access either to the status of its own book status and perform related actions, nor to the admin's actions in the case he has the right permissions. Part of the tech stack used: React, Redux, react-router, [json-server](https://github.com/typicode/json-server).

The project is not finished. Next features to implement:
- Make the state persistent.
- Admin's actions: explore the registered users, modify the role of other users, add new books, edit existing books, look at the booking history.
- Fetch data from a GPS service which displays the nearest bibliothek to the logged user.

## Installation
I used [json-server](https://github.com/typicode/json-server) to mock the book catalogue; in the first step of the installation, you have to install the dependencies and run the server.
```bash
git clone https://github.com/NicoCastelnuovo/library-service.git;
cd library-service;
npm install;
npm install json-server;
npm run server;
```
In a separate terminal, run the following command:
```
npm start;
```
The website will be available at `http:localhost:3000`.

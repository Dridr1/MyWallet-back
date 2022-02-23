# MyWallet - Back-end
### A back-end API of a personal wallet built using Node JS and MongoDB.


## Setting everything up

### What you will need:
* MongoDB
* NodeJS
* npm

### How to run it locally:
* Clone this repository
* Install the dependencies using ```npm i ``` on a terminal
* Run a Mongo data base using ```mongod --dbpath <path>```
* Run Mongo or Mongosh and set the variable MONGO_URI to your local database link
* Run app.js using node or nodemon (```node app.js``` or ```npx nodemon app.js```)
* Start requesting using your own front-end or just clone mine https://github.com/Dridr1/MyWalllet-Front

## Features

### Here is a summarized list of features
#### Auth features:
* sign-up
* sign-in
#### Transactions features:
* post transaction
* get transactions
* edit transaction
* delete transaction

### And now a detailed list of routes and how to use it:
#### Auth routers:
* POST /sign-up

Send a new user information to the database and encrypt it's password using bcrypt. The request's body must follow this format:
```js
{
    email: <String> valid e-mail format,
    name: <String> first-name only,
    password: <String> alphanumerical password with at least 6 characters and maximum 30,
    repeat_password: <String> must be the same password
}
``` 

* POST /sign-in

Verify if the e-mail and password matches with the e-mail and password in the database and generate a new session token.
```js
{
    email: <String>,
    password: <String>
}
```

#### Transactions routes (all routes must include an authorization header with the given session token):

* POST /movements

Verifies if the body follows the correct format, sanitize data and add a new transaction to the database. The request's body must follow this object format:
```js
{
    description: <String>,
    value: <Number> higher than zero,
    type: <String> ("entry" or "exit")
}
```

* GET /movements

Get an array of transactions objects that belongs to the user.
```js
[
    {
        _id: ObjectId(<String>)
        description: <String>,
        value: <Number>,
        type: <string>    
    },
    {
        _id: ObjectId(<String>)
        description: <String>,
        value: <Number>,
        type: <string>    
    },
    {
        _id: ObjectId(<String>)
        description: <String>,
        value: <Number>,
        type: <string>    
    },

]
```

* PUT /movements?id=<String>

Update a movement with it's ID sent as a query string. The body is the same as in the POST /movements route.

* DELETE /movements?id=<String>

Delete a movement with it's ID sent as a query string

## Technologies used
![JavaScript](https://img.shields.io/static/v1?style=for-the-badge&message=JavaScript&color=222222&logo=JavaScript&logoColor=F7DF1E&label=)
![Node.js](https://img.shields.io/static/v1?style=for-the-badge&message=Node.js&color=339933&logo=Node.js&logoColor=FFFFFF&label=)
![MongoDB](https://img.shields.io/static/v1?style=for-the-badge&message=MongoDB&color=47A248&logo=MongoDB&logoColor=FFFFFF&label=)
![npm](https://img.shields.io/static/v1?style=for-the-badge&message=npm&color=CB3837&logo=npm&logoColor=FFFFFF&label=)
![Express](https://img.shields.io/static/v1?style=for-the-badge&message=Express&color=000000&logo=Express&logoColor=FFFFFF&label=)

## Workspace

![Visual Studio Code](https://img.shields.io/static/v1?style=for-the-badge&message=Visual+Studio+Code&color=007ACC&logo=Visual+Studio+Code&logoColor=FFFFFF&label=)
![Pop!_OS](https://img.shields.io/static/v1?style=for-the-badge&message=Pop%21_OS&color=222222&logo=Pop%21_OS&logoColor=48B9C7&label=)
![GitHub](https://img.shields.io/static/v1?style=for-the-badge&message=GitHub&color=181717&logo=GitHub&logoColor=FFFFFF&label=)
![Google Chrome](https://img.shields.io/static/v1?style=for-the-badge&message=Google+Chrome&color=4285F4&logo=Google+Chrome&logoColor=FFFFFF&label=)
## This is a challenge for chapter 5 to create API with Authentication and Authorization with Postgress 
Okay , now the REST API have many refactor from code program. I use Design pattern MVC to reusable and DRY from this. And i added a new algorithm to use of authentication and authorization for 2 table have a relation. It is users and cars model. 

## Build With
- [JavaScript](https://www.javascript.com/) - is a scripting language that enables you to create dynamically updating content, control multimedia, animate      images, and pretty much everything else.
- [Node JS](https://nodejs.org/en) - Node.js® is an open-source, cross-platform JavaScript runtime environment.
- [Express JS](https://expressjs.com/) - Fast, unopinionated, minimalist web framework for Node.js.
- [uuid](https://www.npmjs.com/package/uuid) - Creating UUID code with useful package in Node js.
- [Sequelize](https://sequelize.org) - Sequelize is a modern TypeScript and Node.js ORM for Oracle, Postgres, MySQL, MariaDB, SQLite and SQL Server, and more.
- [Multer](https://www.npmjs.com/package/multer) - Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files. It is written on top of busboy for maximum efficiency
- [JsonWebToken](https://jwt.io/) - is a compact URL-safe means of representing claims to be transferred between two parties.
- [bcrypt](https://www.npmjs.com/package/bcrypt) - bcrypt is a password hashing function designed by two computer security researchers Niels Provos and David Mazières, the Blowfish cipher is the basis for bcrypt, and was presented at USENIX in 1999.
- [Passport JS](https://www.passportjs.org/) - Passport is authentication middleware for Node.js.
- [Swagger](https://swagger.io/) - API Documentation & Design Tools for Teams.
- [Firebase](https://firebase.google.com/) - Firebase is an app development platform that helps you build and grow apps and games users love.

## FYI 
- For this project i refactory code to create a design pattern of MVC
- In this project i change my code from updated cars, becasue before this chapter 05 i used BLOB type data in image and now i used firebase storage cloud to management this file image and in databse i change string type data form image.
- To authentication i manage the jsonwebtoken to get token and auth form user login, After this i compare the passowrd user from registration user.
- And all many api from cars this is needed to authorization from role admin and superadmin. This is need to authentication form user to define permission form role user
- I also added authentication form third party or using the OAuth with passport js. and you can test the api to copy the address url then u can login form google or facebook account and get your token 
- For Api documentation i created with swagger and you can try it if you run the server okay. 

## ERD


## Getting Started

if you need to start api from your local and you want to change more algorithm from this, u can cloning first:

```sh
$ git clone https://github.com/MuhammadAliffandy/MSIB-Binar-Academy.git
$ cd chapter-05
```

## Usage

before you run this you must installation package to make the program its not error for u.

```sh
$ npm install
```

After this dont to add .env form your local files to create configuration many secret key or db config.

```javascript
//.env

SECRET_KEY = 'YOUR_SECRET_KEY';
SESSION_KEY = 'YOUR_SESSION_SECRET_KEY'
GOOGLE_CLIENT_ID = 'YOUR_GOOGLE_CLIENT_ID'
GOOGLE_CLIENT_SECRET = 'YOUR_GOOGLE_CLIENT_SECRET'
FACEBOOK_CLIENT_ID = 'YOUR_GOOGLE_FACEBOOK_ID'
FACEBOOK_CLIENT_SECRET = 'YOUR_GOOGLE_FACEBOOK_SECRET'
DATABASE_URL="YOUR_DB_CONFIGURATION"

```

run the server with Node JS runtime and i am used Node JS v 18+

```sh
$ npm run start
```
To check the documentation of API you can access url form your web machine 

```javascript
http://localhost:5000/api-documentation
```
NB : To using the google and facebook auth you can using in web machine like this

To using the api you can add the superadmin account from seeders 
you can run the syntax CLI like this : 

```sh
npx sequelize-cli db:seed --seed 20231003164819-demo-user
```
Email and password Account : 

```javascript
{
  "email": "aliffandy@gmail.com",
  "password": "fandy12345"
}

```



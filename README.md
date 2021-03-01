# CRUD MERN Challenge
App is available at: https://client-11111.herokuapp.com

## Notes
This is a create-react-app with an express backend and mongodb database. It has some basic signup/login functionality, using jwt.  Once the user is logged in, they can see the characters and mark characters as favorites, and that is persisted in the db.  The characters GET route and user PUT and GET routes are protected by a middleware that requires a valid token. I did some light responsiveness functionality like a collapsible navbar, and just having the characters view wrap and stack. Because of a requirement from another code challenge, I hit the Rick and Morty api from my backend and load some of the characters into my database when the app starts. The function that does that looks for duplicates (by the name field) and will only add characters fetched from the api that aren’t already in the database. And finally this is hooked up to build and deploy to two heroku apps whenever I push to the github repo, using github actions. 

---

## To run it
1.  From src/api: `npm install`
2. From src/web-client: `npm install`
3. Start up a mongodb instance and assign that connection string to DATABASE_URL in the src/api/.env file
4. From src/api: `npm run nodemon`
5. From src/web-client: `npm run start`
6. Should be up and running on localhost:3000
---
## Notes on packages
### Back-End
#### Dependencies
- axios - requests for front and back
-  bcryptjs - hashing and verifying passwords to store in db
-  body-parser - better ability acces info from a request
-  cors - enabling cors
-  dotenv - accessing env variables
-  jsonwebtoken - for signing a verifying tokens
-  mongoose - better ability to wrangle mongo
-  morgan - better logging
#### Dev dependencies
-  @babel/cli
-  @babel/core
-  @babel/node
-  @babel/preset-env
-  babel-plugin-module-resolver
-  eslint
-  eslint-config-prettier
-  eslint-plugin-prettier
-  nodemon
-  prettier

---
### Front-End


- @reduxjs/toolkit - I've been wanting to experiment with this library instead of doing it all manually, so it was a good opportunity to do that. It saved a good deal of boilerplate. Although maybe not as powerful as sagas.
- axios - requests
- react-router-dom - client side routing
- styled-components - Its nice for keeping your components more together
- reactIcon - quick icon

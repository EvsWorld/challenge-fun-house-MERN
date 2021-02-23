# Ricky and Morty Challenge
App is available at: https://client-11111.herokuapp.com/

## Notes
I took a bit longer than I would have liked to, but I went down a few rabbit holes. I was thinking I would try out react-query library but then realized you asked for redux. And I wanted to have it deployed, and so I spent a bit of time on hooking that up, and getting it deploy when I pushed. Then I really wanted to use esm style imports and exports and switched the backend over to that, but then that broke it when it deployed. So I lost time on that. I'm going to submit it now, without the character detail view. There are many other things I didn't include just in interest of time, for example: form validation, duplicate email/id verification, responsive/beautiful design, testing, seperating services out from controllers, et al.

---
## Notes on packages
### Back-End
#### Dependencies
    axios - requests for front and back
    bcryptjs - hashing and verifying passwords to store in db
    body-parser - better ability acces info from a request
    cors - enabling cors
    dotenv - accessing env variables
    jsonwebtoken - for signing a verifying tokens
    mongoose - better ability to wrangle mongo
    morgan - better logging
#### Dev dependencies
    @babel/cli
    @babel/core
    @babel/node
    @babel/preset-env
    babel-plugin-module-resolver
    eslint
    eslint-config-prettier
    eslint-plugin-prettier
    nodemon
    prettier

### Front-End


    @reduxjs/toolkit - I've been wanting to experiment with this library instead of doing it all manually, so it was a good opportunity to do that. It saved a good deal of boilerplate. Although maybe not as powerful as sagas.

    axios - requests

    react-router-dom - client side routing

    styled-components - Its nice for keeping your components more together

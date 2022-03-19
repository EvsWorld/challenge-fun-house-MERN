### Rick and Morty

Challenge required hitting the Rick and Morty api from my server and load some of the characters into database when the app starts. The function that does that looks for duplicates (by the name field) and will only add characters fetched from the api that aren’t already in the database.

Additional requirements were to use redux and for the 'characters' section to be only accessable if user is logged in, and this was to be done with jwt. Once the user is logged in, they should be allowed to see the characters list and a detail modal, be able to mark characters as favorites, and have that persisted in the db. The characters GET route and user PUT and GET routes are protected by a middleware that requires a valid token.

To test this part of the app, you can sign up with a fake email or use the existing login: `username: 1, password: 1`

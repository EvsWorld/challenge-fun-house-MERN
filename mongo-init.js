/**
 * Database initialisation script for MongoDB.
 *
 * Any files copied to the "/docker-entrypoint-initdb.d/" directory in the container will be executed by the MongoDB
 * instance on startup.
 *
 * Instead of copying files from the local filesystem to the container, it would be possible instead to map/mount a
 * local directory directly to the container directory.
 */

// Create an application user for the "SFA" database, this is the Spring Boot repository user.

// import fs from "fs";

// const jsonData = fs.readFileSync(
//   __dirname + "./mongo-seed/orgPersonsAbc.json",
//   "utf-8"
// );
// const personsData = JSON.parse(jsonData);

const personsData = [
  {
    name: "root",
    path: ",",
  },
  {
    name: "a",
    path: ",root,",
  },
  {
    name: "b",
    path: ",root,",
  },
  {
    name: "c",
    path: ",root,a,",
  },
  {
    name: "d",
    path: ",root,a,",
  },
  {
    name: "e",
    path: ",root,b,",
  },
  {
    name: "f",
    path: ",root,b,",
  },
  {
    name: "g",
    path: ",root,a,c,",
  },
  {
    name: "h",
    path: ",root,a,c,",
  },
  {
    name: "i",
    path: ",root,a,d,",
  },
  {
    name: "j",
    path: ",root,a,d,",
  },
  {
    name: "k",
    path: ",root,b,e,",
  },
  {
    name: "l",
    path: ",root,b,f,",
  },
];

print(
  "Start #################################################################"
);

db = db.getSiblingDB("challenge-fun-house-db-t");
db.createUser({
  user: "api_user_t",
  pwd: "api1234t",
  roles: [{ role: "readWrite", db: "challenge-fun-house-db-t" }],
});
db.createCollection("orgPersonsT");
db.orgPersonsT.insertMany(personsData);

// ******************
// db.db = db.getSiblingDB("api_prod_db");
// db.createUser({
//   user: "api_user",
//   pwd: "api1234",
//   roles: [{ role: "readWrite", db: "api_prod_db" }],
// });
// db.createCollection("uzers");

// db = db.getSiblingDB("api_dev_db");
// db.createUser({
//   user: "api_user",
//   pwd: "api1234",
//   roles: [{ role: "readWrite", db: "api_dev_db" }],
// });
// db.createCollection("uzers");

// db = db.getSiblingDB("api_test_db");
// db.createUser({
//   user: "api_user",
//   pwd: "api1234",
//   roles: [{ role: "readWrite", db: "api_test_db" }],
// });
// db.createCollection("uzers");

print("END #################################################################");

// console.log("ran mongoinit.js!!!!! :>> ");
// db.createUser({
//   user: "sfa",
//   pwd: "veryfineindeed",
//   roles: [
//     {
//       role: "readWrite",
//       db: "challenge-fun-house-db",
//     },
//   ],
// });

// // Switch to the SFA database

// db = db.getSiblingDB("challenge-fun-house-db");
// db.createCollection("user");
// db.createCollection("orgPersons");

// // Create document indices

// db.user.createIndex({ username: 1 });

// db.profile.createIndex({ username: 1 });

// // Create seed-data for the user collection

// // pw: toomanysecrets
// db.user.insert({
//   username: "mark",
//   password: "$2y$10$WxFrxAmdzXl21MSwydIBXeNzRCLqCeTzxPY6ow/0yq.v1ZfLl/6R6",
//   authorities: ["GET_MY_USER", "GET_MY_PROFILE", "UPDATE_MY_PROFILE"],
// });

// // pw: nexus6
// db.user.insert({
//   username: "deckard",
//   password: "$2y$10$Pyax032BmLcgazp1xYWygeCpfapylu5cUI5fRe5Xk.nmNPQ7Ae1lm",
//   authorities: ["GET_MY_USER", "GET_MY_PROFILE", "UPDATE_MY_PROFILE"],
// });

// // pw:daisy
// db.user.insert({
//   username: "babayaga",
//   password: "$2y$10$vnI90h6Y2nkJAEz33.XO1.fCbkuV84Mjqvy.vlrfxlfJ/OvmoDequ",
//   authorities: ["GET_MY_USER", "GET_MY_PROFILE", "UPDATE_MY_PROFILE"],
// });

// // pw:iambatman
// db.user.insert({
//   username: "bruce",
//   password: "$2y$10$DnsBGCMU26myi0Si1JAaL.ekIyRCi38uF1ONGwe8xB.bYvcH2EHxe",
//   authorities: ["GET_MY_USER", "GET_MY_PROFILE", "UPDATE_MY_PROFILE"],
// });

// // Create seed-data for the profile collection

// db.orgPersons.insert({
//   username: "mark",
//   firstName: "Mark",
//   lastName: "Lee",
//   position: "The Boss",
//   aboutMe: "I am like so totes awesome.",
// });

// db.orgPersons.insert({
//   username: "deckard",
//   firstName: "Rick",
//   lastName: "Deckard",
//   position: "Blade Runner",
//   aboutMe:
//     "Blade Runner, retired. I've seen things you people wouldn't believe.",
// });

// db.orgPersons.insert({
//   username: "babayaga",
//   firstName: "John",
//   lastName: "Wick",
//   position: "Assassin",
//   aboutMe: "I am revenge. And somewhat totally awesome.",
// });

// db.orgPersons.insert({
//   username: "bruce",
//   firstName: "Bruce",
//   lastName: "Wayne",
//   position: "Vigilante",
//   aboutMe:
//     "The world's greatest detective. Dark Knight. Eccentric billionaire.",
// });

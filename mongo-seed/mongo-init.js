/**
 * Database initialisation script for MongoDB.
 *
 * Any files copied to the "/docker-entrypoint-initdb.d/" directory in the container will be executed by the MongoDB
 * instance on startup.
 *
 * Instead of copying files from the local filesystem to the container, it would be possible instead to map/mount a
 * local directory directly to the container directory.
 */
const personsData = [
  { path: ",aboveRoot,", name: "root" },
  {
    path: ",aboveRoot,root,",
    name: "a",
  },
  {
    path: ",aboveRoot,root,",
    name: "b",
  },
  {
    path: ",aboveRoot,root,j,",
    name: "c",
  },
  {
    path: ",aboveRoot,root,e,",
    name: "d",
  },
  {
    path: ",aboveRoot,root,",
    name: "e",
  },
  {
    path: ",aboveRoot,root,e,g,",
    name: "f",
  },
  {
    path: ",aboveRoot,root,e,",
    name: "g",
  },
  {
    path: ",aboveRoot,root,e,g,",
    name: "h",
  },
  {
    path: ",aboveRoot,root,e,d,",
    name: "q",
  },
  {
    path: ",aboveRoot,root,e,",
    name: "i",
  },
  {
    path: ",aboveRoot,root,",
    name: "j",
  },
  {
    path: ",aboveRoot,root,a,",
    name: "k",
  },
  {
    path: ",aboveRoot,root,a,",
    name: "p",
  },
  {
    path: ",aboveRoot,root,j,",
    name: "l",
  },
  {
    path: ",aboveRoot,root,j,l,",
    name: "m",
  },
  {
    path: ",aboveRoot,root,j,l,",
    name: "n",
  },
  {
    path: ",aboveRoot,root,j,l,",
    name: "o",
  },
];

const personsData2 = [
  { path: ",aboveRoot,", name: "root" },
  { path: ",aboveRoot,root,", name: "a" },
  { path: ",aboveRoot,root,", name: "b" },
  { path: ",aboveRoot,root,j,", name: "c" },
  { path: ",aboveRoot,root,e,", name: "d" },
  { path: ",aboveRoot,root,", name: "e" },
  { path: ",aboveRoot,root,a,k,", name: "f" },
  { path: ",aboveRoot,root,e,", name: "g" },
  { path: ",aboveRoot,root,a,k,", name: "h" },
  { path: ",aboveRoot,root,a,k,", name: "q" },
  { path: ",aboveRoot,root,e,", name: "i" },
  { path: ",aboveRoot,root,", name: "j" },
  { path: ",aboveRoot,root,a,", name: "k" },
  { path: ",aboveRoot,root,a,", name: "p" },
  { path: ",aboveRoot,root,j,", name: "l" },
  { path: ",aboveRoot,root,j,l,", name: "m" },
  { path: ",aboveRoot,root,j,l,", name: "n" },
  { path: ",aboveRoot,root,j,l,", name: "o" },
];

print(
  "Start #################################################################"
);

db = db.getSiblingDB("challenge-fun-house-db");
db.createUser({
  user: "api_user_t",
  pwd: "api1234t",
  roles: [{ role: "readWrite", db: "challenge-fun-house-db" }],
});
db.createCollection("orgPersons");
db.orgPersons.insertMany(personsData);

print("END #################################################################");

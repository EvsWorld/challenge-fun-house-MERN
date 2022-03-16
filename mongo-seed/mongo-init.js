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
const gamesData = [
  {
    event_type: "game",
    status: "scheduled",
    home_away: "home",
    opponent_id: "52476d50-ace2-43ac-9947-d96c3629f161",
    opponent_name: "U13 Braves",
    start: {
      datetime: new Date("2022-02-05T19:00:00.000Z"),
    },
    end: {
      datetime: new Date("2022-02-05T20:00:00.000Z"),
    },
    timezone: "America/New_York",
    notes: null,
    location: "Holiday Park",
  },
  {
    event_type: "game",
    status: "scheduled",
    home_away: "away",
    opponent_id: "52476d50-ace2-43ac-9947-d96c3629f222",
    opponent_name: "U13 Cubs",
    start: {
      datetime: new Date("2022-02-09T22:00:00.000Z"),
    },
    end: {
      datetime: new Date("2022-02-09T23:00:00.000Z"),
    },
    timezone: "America/New_York",
    notes: null,
    location: "Holiday Park",
  },
  {
    event_type: "game",
    status: "scheduled",
    home_away: "home",
    opponent_id: "52476d50-ace2-43ac-9947-d96c3629f222",
    opponent_name: "U13 Cubs",
    start: {
      datetime: new Date("2022-02-10T22:00:00.000Z"),
    },
    end: {
      datetime: new Date("2022-02-10T23:00:00.000Z"),
    },
    timezone: "America/New_York",
    notes: null,
    location: "Holiday Park",
  },
  {
    event_type: "game",
    status: "scheduled",
    home_away: "away",
    opponent_id: "52476d50-ace2-43ac-9947-d96c3629f333",
    opponent_name: "Bulldogs",
    start: {
      datetime: new Date("2022-02-12T13:00:00.000Z"),
    },
    end: {
      datetime: new Date("2022-02-12T14:00:00.000Z"),
    },
    timezone: "America/New_York",
    notes: null,
    location: "Bayview Park",
  },
  {
    event_type: "game",
    status: "scheduled",
    home_away: "away",
    opponent_id: "52476d50-ace2-43ac-9947-d96c3629f161",
    opponent_name: "U13 Braves",
    start: {
      datetime: new Date("2022-02-19T14:00:00.000Z"),
    },
    end: {
      datetime: new Date("2022-02-19T15:00:00.000Z"),
    },
    timezone: "America/New_York",
    notes: null,
    location: "Bayview Park",
  },
  {
    event_type: "game",
    status: "scheduled",
    home_away: "away",
    opponent_id: "52476d50-ace2-43ac-9947-d96c3629f222",
    opponent_name: "U13 Cubs",
    start: {
      datetime: new Date("2022-02-26T14:30:00.000Z"),
    },
    end: {
      datetime: new Date("2022-02-26T15:30:00.000Z"),
    },
    timezone: "America/New_York",
    notes: null,
    location: "Bayview Park",
  },
  {
    event_type: "game",
    status: "scheduled",
    home_away: "home",
    opponent_id: "52476d50-ace2-43ac-9947-d96c3629f161",
    opponent_name: "U13 Braves",
    start: {
      datetime: new Date("2022-03-05T19:00:00.000Z"),
    },
    end: {
      datetime: new Date("2022-03-05T20:00:00.000Z"),
    },
    timezone: "America/New_York",
    notes: null,
    location: "Holiday Park",
  },
  {
    event_type: "game",
    status: "scheduled",
    home_away: "away",
    opponent_id: "52476d50-ace2-43ac-9947-d96c3629f222",
    opponent_name: "U13 Cubs",
    start: {
      datetime: new Date("2022-03-10T22:00:00.000Z"),
    },
    end: {
      datetime: new Date("2022-03-10T23:00:00.000Z"),
    },
    timezone: "America/New_York",
    notes: null,
    location: "Holiday Park",
  },
  {
    event_type: "game",
    status: "scheduled",
    home_away: "home",
    opponent_id: "52476d50-ace2-43ac-9947-d96c3629f222",
    opponent_name: "U13 Cubs",
    start: {
      datetime: new Date("2022-03-11T22:00:00.000Z"),
    },
    end: {
      datetime: new Date("2022-03-11T23:00:00.000Z"),
    },
    timezone: "America/New_York",
    notes: null,
    location: "Holiday Park",
  },
  {
    event_type: "game",
    status: "scheduled",
    home_away: "away",
    opponent_id: "52476d50-ace2-43ac-9947-d96c3629f333",
    opponent_name: "Bulldogs",
    start: {
      datetime: new Date("2022-03-13T13:00:00.000Z"),
    },
    end: {
      datetime: new Date("2022-03-13T14:00:00.000Z"),
    },
    timezone: "America/New_York",
    notes: null,
    location: "Bayview Park",
  },
  {
    event_type: "game",
    status: "scheduled",
    home_away: "away",
    opponent_id: "52476d50-ace2-43ac-9947-d96c3629f161",
    opponent_name: "U13 Braves",
    start: {
      datetime: new Date("2022-03-19T14:00:00.000Z"),
    },
    end: {
      datetime: new Date("2022-03-19T15:00:00.000Z"),
    },
    timezone: "America/New_York",
    notes: null,
    location: "Bayview Park",
  },
  {
    event_type: "game",
    status: "scheduled",
    home_away: "away",
    opponent_id: "52476d50-ace2-43ac-9947-d96c3629f222",
    opponent_name: "U13 Cubs",
    start: {
      datetime: new Date("2022-03-26T14:30:00.000Z"),
    },
    end: {
      datetime: new Date("2022-03-26T15:30:00.000Z"),
    },
    timezone: "America/New_York",
    notes: null,
    location: "Bayview Park",
  },
  {
    event_type: "game",
    status: "scheduled",
    home_away: "home",
    opponent_id: "52476d50-ace2-43ac-9947-d96c3629f161",
    opponent_name: "U13 Braves",
    start: {
      datetime: new Date("2022-04-02T19:00:00.000Z"),
    },
    end: {
      datetime: new Date("2022-04-02T20:00:00.000Z"),
    },
    timezone: "America/New_York",
    notes: null,
    location: "Holiday Park",
  },
  {
    event_type: "game",
    status: "scheduled",
    home_away: "away",
    opponent_id: "52476d50-ace2-43ac-9947-d96c3629f222",
    opponent_name: "U13 Cubs",
    start: {
      datetime: new Date("2022-04-10T22:00:00.000Z"),
    },
    end: {
      datetime: new Date("2022-04-10T23:00:00.000Z"),
    },
    timezone: "America/New_York",
    notes: null,
    location: "Holiday Park",
  },
  {
    event_type: "game",
    status: "scheduled",
    home_away: "home",
    opponent_id: "52476d50-ace2-43ac-9947-d96c3629f222",
    opponent_name: "U13 Cubs",
    start: {
      datetime: new Date("2022-04-11T22:00:00.000Z"),
    },
    end: {
      datetime: new Date("2022-04-11T23:00:00.000Z"),
    },
    timezone: "America/New_York",
    notes: null,
    location: "Holiday Park",
  },
  {
    event_type: "game",
    status: "scheduled",
    home_away: "away",
    opponent_id: "52476d50-ace2-43ac-9947-d96c3629f333",
    opponent_name: "Bulldogs",
    start: {
      datetime: new Date("2022-04-13T13:00:00.000Z"),
    },
    end: {
      datetime: new Date("2022-04-13T14:00:00.000Z"),
    },
    timezone: "America/New_York",
    notes: null,
    location: "Bayview Park",
  },
  {
    event_type: "game",
    status: "scheduled",
    home_away: "away",
    opponent_id: "52476d50-ace2-43ac-9947-d96c3629f161",
    opponent_name: "U13 Braves",
    start: {
      datetime: new Date("2022-04-19T14:00:00.000Z"),
    },
    end: {
      datetime: new Date("2022-04-19T15:00:00.000Z"),
    },
    timezone: "America/New_York",
    notes: null,
    location: "Bayview Park",
  },
  {
    event_type: "game",
    status: "scheduled",
    home_away: "away",
    opponent_id: "52476d50-ace2-43ac-9947-d96c3629f222",
    opponent_name: "U13 Cubs",
    start: {
      datetime: new Date("2022-04-26T14:30:00.000Z"),
    },
    end: {
      datetime: "2022-04-26T15:30:00.000Z",
    },
    timezone: "America/New_York",
    notes: null,
    location: "Bayview Park",
  },
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
db.createCollection("games");
db.orgPersons.insertMany(personsData);
db.games.insertMany(gamesData);

print("END #################################################################");

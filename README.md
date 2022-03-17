# CRUD MERN Challenge

## Notes

This is a project that started as a code challenge, and I've added to it for experimentation, and some other challenges. The app, for now, is a create-react-app with an express backend and mongodb database.

---

## Game Schedule

This challenge required aggregating and serving a game schedule grouping by month. The front end route is: `/game-schedule`

---

## Org Char

Challenge required querying and updating a company's organizational chart. The requirements specifically were to:

1. Get all (direct and non-direct) descendant nodes of a given node (the given node can be anyone in the tree structure).
2. Change the parent node of a given node (the given node can be anyone in the tree structure).

- They need to answer quickly, even with tons of nodes.
- Also, we can’t afford to lose this information, so persistence is required.
- Each node should have the following info:
  a) node identification
  b) who is the parent node
  c) who is the root node
  d) the height of the node. In the above example, height(root) = 0 and height(a) == 1.

My approach was to use a 'materialized paths' strategy in mongodb. Each node has a 'name' and 'path'. The path contains a comma seperated string containing its ancestors. Therefore, querying for a specific node's descendents is done by querying using RegExp in the 'path' field, like this:

```
Model.find({ path: new RegExp('Bob') }
```

---

## Characters

Challenge required hitting the Rick and Morty api from my server and load some of the characters into my database when the app starts. The function that does that looks for duplicates (by the name field) and will only add characters fetched from the api that aren’t already in the database. This challenge also required signup/login functionality done with jwt, listing the characters, a detail modal, and the ability to favorite characters and persist to db.

It has some basic signup/login functionality, using jwt.  Once the user is logged in, they can see the characters and mark characters as favorites, and that is persisted in the db.  The characters GET route and user PUT and GET routes are protected by a middleware that requires a valid token.

## Companies

This challenge required making a react filter and search component. It was to fetch a list of companies from a simple json db, and allow user to search for companies by name and filter them with checkboxes by the services they provide.

---

## To run it

### Docker

```
make run-dev
```

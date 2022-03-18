# CRUD MERN Challenge

## Notes

This is a project that started as a code challenge, and I've added to it for experimentation, and some other challenges. The app, for now, is a create-react-app with an express backend and mongodb database.

---

## To run it

### Docker

From the root directory, run:

```
make run-dev
```

---

## Challenges

### Game Schedule

This challenge required aggregating and serving a game schedule grouping by month. The front end route is: `/game-schedule`

---

### Org Char

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

#### My notes after finishing

There's one requirement I didn't explicitly address, and that is the part about the data to be stored in the node entities themselves. My solution has that information but it is not explicit. I used mongodb and what I believe is called 'materialized paths' pattern. So in each node is the path which includes the node's parent, the root, and if you were to count the paths then you'd of course have the level. I could have put those fields on the schema to have them be calculated on save and exist in the db, but I've always thought that it's best to not have duplicated/derived data in the db.

---

### Characters

Challenge required hitting the Rick and Morty api from my server and load some of the characters into database when the app starts. The function that does that looks for duplicates (by the name field) and will only add characters fetched from the api that aren’t already in the database.

Additional requirements were to use redux and for the 'characters' section to be only accessable if user is logged in, and this was to be done with jwt. Once the user is logged in, they should be allowed to see the characters list and a detail modal, be able to mark characters as favorites, and have that persisted in the db. The characters GET route and user PUT and GET routes are protected by a middleware that requires a valid token.

To test this part of the app, you can sign up with a fake email or use the existing login: `username: 1, password: 1`

---

### Companies

This challenge required making a react filter and search component. It was to fetch a list of companies from a simple json db, and allow user to search for companies by name and filter them with checkboxes by the services they provide.

I implemented something additional which was a script for reshapping the mock data, for it to be more believable and better show the capabilities of the filter. The script can be found at: `src/api/utilities/makeCompaniesWithArrays.js`.

The mock data I was able to generate from mockeroo.com was in the form found at: `src/api/mockdb/companyDataFromMockeroo.json`, and which can be seen below:

I however wanted to have arrays of random specialties for each company. The script just creates a new array of companies in the form seen at: `src/api/mockdb/companiesWithArrays.json`, and which takes the following shape:

```json
// src/api/mockdb/companyDataFromMockeroo.json

[
  {
    "id": 1,
    "company_name": "Watsica, Barrows and Conn",
    "city": "Itapé",
    "specialty": "Temp Fencing, Decorative Fencing and Gates",
    "logo": "http://dummyimage.com/107x100.png/ff4444/ffffff"
  },
  {
    "id": 2,
    "company_name": "Hickle, Barrows and Fahey",
    "city": "Woloara",
    "specialty": "Painting & Vinyl Wall Covering",
    "logo": "http://dummyimage.com/176x100.png/dddddd/000000"
  },
  {
    "id": 3,
    "company_name": "Lemke, Hintz and Hahn",
    "city": "La Tinguiña",
    "specialty": "EIFS",
    "logo": "http://dummyimage.com/193x100.png/5fa2dd/ffffff"
  },
  ...
]

```

```json
// src/api/mockdb/companiesWithArrays.json

[
  {
    "id": 1,
    "company_name": "Watsica, Barrows and Conn",
    "city": "Itapé",
    "logo": "http://dummyimage.com/107x100.png/ff4444/ffffff",
    "specialties": ["Fire Protection"]
  },
  {
    "id": 2,
    "company_name": "Hickle, Barrows and Fahey",
    "city": "Woloara",
    "logo": "http://dummyimage.com/176x100.png/dddddd/000000",
    "specialties": [
      "Soft Flooring and Base",
      "Sitework & Site Utilities",
      "Painting & Vinyl Wall Covering",
      "EIFS",
      "Plumbing & Medical Gas",
      "Structural & Misc Steel Erection",
      "Marlite Panels (FED)",
      "Doors, Frames & Hardware",
      "Exterior Signage",
      "Drywall & Acoustical (MOB)",
      "Casework",
      "Retaining Wall and Brick Pavers"
    ]
  },
  {
    "id": 3,
    "company_name": "Lemke, Hintz and Hahn",
    "city": "La Tinguiña",
    "logo": "http://dummyimage.com/193x100.png/5fa2dd/ffffff",
    "specialties": [
      "Sitework & Site Utilities",
      "Hard Tile & Stone",
      "Rebar & Wire Mesh Install",
      "Construction Clean and Final Clean",
      "Termite Control",
      "Structural and Misc Steel (Fabrication)",
      "Plumbing & Medical Gas",
      "Structural & Misc Steel Erection",
      "HVAC",
      "Granite Surfaces",
      "Fire Sprinkler System",
      "Epoxy Flooring",
      "Ornamental Railings",
      "Landscaping & Irrigation"
    ]
  },
  ...
]
```

# Challenge Funhouse MERN

The app, for now, is a create-react-app with an express backend and mongodb database.

---

### Game Schedule Challenge

This challenge required aggregating and serving a game schedule grouping by month. The front end route is: `http://localhost:3002/game-schedule`.

There is only one api route for this challange and is located at `http://localhost:5000/api/schedule`.

At app start up, `mongo-init.js` loads the given data into the db, then controller for the `/schedule` route serves the game data grouped by month.
The controller for the route is at `game.controller.js`.

---

## Building and running

The app will build, seed database, and run using docker.

From the root directory, run:

```
docker-compose up
```

## Documentation of other challenges contained in app

- [Org Chart](./challenge-requirements-docs/org-chart)
- [Company Filter](./challenge-requirements-docs/company-filter)
- [Rick and Morty Characters](./challenge-requirements-docs/rick-and-morty)

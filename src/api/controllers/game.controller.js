import { Game } from "../models/game.model";

// Retrieve all characters from the database.
export const findByMonth = (req, res) => {
  Game.aggregate([
    {
      $project: {
        event_type: 1,
        status: 1,
        home_away: 1,
        opponent_id: 1,
        opponent_name: 1,
        timezone: 1,
        notes: 1,
        location: 1,
        start: 1,
        date: "$start.datetime",
      },
    },
    {
      $unwind: "$date",
    },
    {
      $group: {
        _id: {
          month: { $month: "$date" },
          year: { $year: "$date" },
        },
        games: {
          $addToSet: {
            event_type: "$event_type",
            status: "$status",
            home_away: "$home_away",
            opponent_id: "$opponent_id",
            opponent_name: "$opponent_name",
            timezone: "$timezone",
            notes: "$notes",
            location: "$location",
            start: "$start",
          },
        },
      },
    },
  ])
    .then((data) => {
      console.log("from find: games :>> ", data);
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving games.",
      });
    });
};

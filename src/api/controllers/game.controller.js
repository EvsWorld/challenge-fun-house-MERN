import { Game } from "../models/game.model";

// Retrieve all characters from the database.
export const findByMonth = (req, res) => {
  Game.aggregate([
    {
      $unwind: "$start.datetime",
    },
    {
      $group: {
        _id: {
          month: { $month: "$start.datetime" },
          year: { $year: "$start.datetime" },
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
    { $sort: { _id: 1 } },
  ])
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving games.",
      });
    });
};

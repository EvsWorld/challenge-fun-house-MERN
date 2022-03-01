import { OrgPerson } from "../models/orgPerson.model";
import { makeTree } from "../services/orgPerson.service";

export const update = (req, res) => {
  // const id = req.params.id
  const id = req.user.user["_id"];

  OrgPerson.findByIdAndUpdate(id, req.body, {
    useFindAndModify: false,
    new: true,
  })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update User with id=${id}. Maybe User was not found!`,
        });
      } else
        res.send({
          message: "User was updated successfully.",
          path: {
            path: data.path,
          },
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating User with id=" + id,
      });
    });
};

export const info = (req, res) => {
  const { name } = req.params;

  console.log("name query string :>> ", name);
  OrgPerson.find({ $or: [{ path: new RegExp(name) }, { name }] }).exec(
    (err, persons) => {
      // OrgPerson.find({ path: new RegExp(name) }).exec((err, persons) => {
      console.log("persons :>> ", persons);

      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!persons) {
        return res.status(404).send({ message: "User Not found." });
      }

      res.status(200).send(makeTree(persons));
    }
  );
};

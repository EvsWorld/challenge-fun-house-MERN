import { OrgPerson } from "../models/orgPerson.model";
import { makeTree } from "../services/orgPerson.service";

export const update = (req, res) => {
  console.log("hit update!");
  const { name, newParent } = req.body;
  const nameRegex = `${name}`;

  OrgPerson.collection
    .updateMany({ path: { $regex: /helloWorldt/ } }, [
      {
        $set: {
          path: {
            $replaceOne: {
              input: "$path",
              find: "helloWorldt",
              replacement: "helloWorld",
            },
          },
        },
      },
    ])
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update person with name=${name}. Maybe person was not found!`,
        });
      } else
        res.send({
          message: "person was updated successfully.",
          updatedUser: {
            path: data.path,
            name: data.name,
          },
        });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating person with name=" + name,
      });
    });
};

export const info = (req, res) => {
  const { name } = req.params;

  console.log("name query string :>> ", name);
  // const target = await OrgPerson.findOne({ name });
  // const path = target.path;
  // console.log("target :>> ", target);
  // console.log("path :>> ", path);

  // TODO: sort by path so it returns the target at top, then in makeTrees,
  // build the path from the first one
  // await OrgPerson.find({ $or: [{ path: new RegExp(name) }, { name }] }).exec(
  //   (err, persons) => {
  OrgPerson.find({ path: new RegExp(name) }).exec((err, persons) => {
    console.log("persons :>> ", persons);

    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!persons) {
      return res.status(404).send({ message: "User Not found." });
    }

    res.status(200).send(makeTree(persons));
  });
};

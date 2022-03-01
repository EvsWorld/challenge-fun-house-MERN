import { OrgPerson } from "../models/orgPerson.model";
import { makeTree } from "../services/orgPerson.service";

export const update = async (req, res) => {
  console.log("hit update!");
  const { name, newParent } = req.query;
  console.log("{name, newParent} :>> ", { name, newParent });

  // TODO: find person by name and get their parent.
  // Get path, cut off next to last path var. Then that is their parent.
  const target = await OrgPerson.findOne({ name }).exec();
  console.log("target :>> ", target);
  const { path } = target;
  console.log("path :>> ", path);

  const pathArray = path.split(",");
  const targetParent = pathArray[pathArray.length - 2];
  console.log("targetParent :>> ", typeof targetParent);

  OrgPerson.collection
    .updateMany({ path: new RegExp(`,${targetParent},`) }, [
      {
        $set: {
          // do something here to replace the parent of the target node w/ newParent
          // match on name === name AND then doing the replace on the path
        },
      },
      {
        $set: {
          path: {
            $cond: [
              { $eq: ["$name", name] }, // if name === target
              {
                // replace parent with new one
                $replaceOne: {
                  input: "$path",
                  find: `,${targetParent},`,
                  replacement: `,${newParent},`,
                },
              },
              {
                // if its not the target, then just cut out the target name from the path
                $replaceOne: {
                  input: "$path",
                  find: `,${name},`,
                  replacement: `,`,
                },
              },
            ],
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

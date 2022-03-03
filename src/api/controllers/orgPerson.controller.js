import { OrgPerson } from "../models/orgPerson.model";
import { makeTree } from "../services/orgPerson.service";

export const updateParentConnectChildren = async (req, res) => {
  console.log("hit update!");
  const { name, newParent } = req.query;
  if (name === newParent) {
    res
      .status(400)
      .send({ message: "not possible to assign a user's parent as themself" });
  }
  const parent = await OrgPerson.findOne({ name: newParent }).exec();

  // find person by name and get their parent.
  // Get path, cut off next to last path var. Then that is their parent.
  const target = await OrgPerson.findOne({ name }).exec();
  const pathArray = target.path.split(",");
  const targetParent = pathArray[pathArray.length - 2];
  const effTarget = target.path;
  const effReplace = parent.path + newParent + ",";

  OrgPerson.collection
    .updateMany({ path: new RegExp(`,${targetParent},`) }, [
      {
        $set: {
          path: {
            $cond: [
              { $eq: ["$name", name] }, // if name === target
              {
                // replace parent with new one
                $replaceOne: {
                  input: "$path",
                  find: effTarget,
                  replacement: effReplace,
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
          message: `Cannot update paths for name=${name}.`,
        });
      } else
        res.send({
          message: "tree update successfully",
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send({
        message: "Error updating person with name=" + name,
      });
    });
};

export const info = (req, res) => {
  const { name } = req.params;
  console.log("name query string :>> ", name);
  OrgPerson.find({ path: new RegExp(name) }).exec((err, persons) => {
    if (err) {
      console.error(err);
      res.status(500).send({ message: err });
      return;
    }

    if (!persons) {
      return res.status(404).send({ message: "User Not found.", data: [] });
    }
    const response = persons?.length ? makeTree(persons) : [];
    res.status(200).send(response);
  });
};

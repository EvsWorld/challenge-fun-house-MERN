import fs from "fs";

export const findAll = (req, res) => {
  const jsonData = fs.readFileSync(
    __dirname + "/../companiesWithArrays.json",
    "utf-8"
  );
  const companies = JSON.parse(jsonData);
  res.send(companies);
};

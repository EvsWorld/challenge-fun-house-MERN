import fs from "fs";

export const findAll = (req, res) => {
  const jsonData = fs.readFileSync(
    __dirname + "/../mockdb/companiesWithArrays.json",
    "utf-8"
  );
  const companies = JSON.parse(jsonData);
  // res.send(companies.splice(0, 50));
  res.send(companies);
};

import fs from "fs";

const jsonData = fs.readFileSync(
  __dirname + "/../mockdb/companyDataFromMockeroo.json",
  "utf-8"
);
const companiesData = JSON.parse(jsonData);

function makeRandomSubset(arr) {
  if (!arr || arr.length === 0) {
    return;
  }
  const n = 15;
  const shuffled = arr.sort(function () {
    return 0.5 - Math.random();
  });
  const randomArrayLength = Math.random() * (n - 1) + 1;
  const selected = shuffled.slice(0, randomArrayLength);
  return selected;
}

export const allSpecialties = (companies) => {
  const specialties = [];
  companies.forEach((company) => {
    if (
      !specialties.includes(company.specialty) &&
      company.specialty !== undefined
    ) {
      specialties.push(company.specialty);
    }
  });
  return specialties;
};

function makeArrays(companies) {
  // const allSpecialtiesA = allSpecialties(companies);
  const companiesWithArrays = companies.map((company) => {
    const specialties = makeRandomSubset(allSpecialties(companies));
    delete company.specialty;
    return { ...company, specialties };
  });
  // console.log("companiesWithArrays :>> ", companiesWithArrays);

  let data = JSON.stringify(companiesWithArrays.splice(0, 150));
  fs.writeFileSync(__dirname + "/../mockdb/companiesWithArrays.json", data);
}

makeArrays(companiesData);

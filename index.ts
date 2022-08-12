const { promises: fs } = require('fs');
const readme = require('./readme');

const today = new Date();

function generateNewREADME() {
  const readmeRow = readme.split('\n');

  function updateIdentifier(identifier, replaceText) {
    const identifierIndex = findIdentifierIndex(
      readmeRow,
      identifier
    );
    readmeRow[identifierIndex] = readmeRow[identifierIndex].replace(
      `<#${identifier}>`,
      replaceText
    );
  }

  const identifierToUpdate = {
    today_date: getTodayDate(),
  };

  Object.entries(identifierToUpdate).forEach(([key, value]) => {
    updateIdentifier(key, value);
  });

  return readmeRow.join('\n');
}

function getTodayDate() {
  return today.toDateString();
}

const findIdentifierIndex = (rows, identifier) =>
  rows.findIndex((r) =>
    Boolean(r.match(new RegExp(`<#${identifier}>`, 'i')))
  );

const updateREADMEFile = (text) =>
  fs.writeFile('./README.md', text, () => console.log(text));

function main() {
  const newREADME = generateNewREADME();
  updateREADMEFile(newREADME);
}
main();

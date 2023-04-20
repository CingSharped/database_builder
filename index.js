const database = [];
const fs = require("fs");


var countries = require("./src/country-by-name.json");
var lifeExpectancy = require("./src/country-by-life-expectancy.json");
var surfaceArea = require("./src/country-by-surface-area.json");
var averageTemp = require("./src/country-by-yearly-average-temperature.json");
var population = require("./src/country-by-population.json");
var flags = require("./src/country-by-flag.json");
var establishment = require("./src/country-by-independence-date.json");

let countryList = ["Australia", "France", "Germany", "India", "Brazil", "Canada", "India", "Hungary", "Belgium", "Austria", "Barbados", "Belarus", "Denmark", "Greece", "Finland", "United States", "United Kingdom"];
let id = 1;

function findCountry(countryName, arr) {
    for (let i = 0; i < arr.length; i++) {
        if (arr[i].country === countryName) {
            return arr[i];
        }
    }
}

countryList.forEach(element => {
    combineStats(element);
});

function combineStats(countryName) {
    let flag = findCountry(countryName, flags);
    let expectency = findCountry(countryName, lifeExpectancy);
    let area = findCountry(countryName, surfaceArea);
    let temp = findCountry(countryName, averageTemp);
    let pop = findCountry(countryName, population);
    let established = findCountry(countryName, establishment);
    // Merge country data

    database.push({id, ...flag, ...expectency, ...area, ...temp, ...pop, ...established});
    id++;
}

function writeDatabaseToFile(data, filename) {
    const fileContent = JSON.stringify(data, null, 2);
    
    fs.writeFile(filename + '.js', fileContent, (err) => {
        if (err) {
            console.error(`Failed to write file ${filename}.js: ${err}`);
        } else {
            console.log(`File ${filename}.js written successfully!`);
        }
    });
}

writeDatabaseToFile(database, "countries")


// Loading the dependencies. We don't need pretty
// because we shall not log html to the terminal
const axios = require("axios");
const cheerio = require("cheerio");
const fs = require("fs");

// URL of the page we want to scrape
const url = "";

// Async function which scrapes the data
async function scrapeWebpageForData() {
  try {
    // Fetch HTML of the page we want to scrape
    const { data } = await axios.get(url);
    // Load HTML we fetched in the previous line
    const $ = cheerio.load(data);
    // Select all the list items in plainlist class
    const listItems = $("ul.listing li span");
    // Stores data for all car brands
    let carBrands = [];
    // Use .each method to loop through the li we selected
    listItems.each((idx, el) => {
      // Object holding data for each car brand
      const carBrand = { name: "" };
      // Select the text content of a and span elements
      // Store the textcontent in the above object
      carBrand.name = $(el).text();

      // Populate car brands array with country data
      carBrands.push(carBrand);
    });

    // Logs car brands array to the console
    console.dir(carBrands);

    // carBrands.slice(0, 1).each((car) => {
    //   console.log(car);
    // });

    // Write car brands array in cars.json file
    fs.writeFile("cars.json", JSON.stringify(carBrands, null, 2), (err) => {
      if (err) {
        ``;
        console.error(err);
        return;
      }
      console.log("Successfully written data to file");
    });
  } catch (err) {
    console.error(err);
  }
}
// Invoke the above function
scrapeWebpageForData();

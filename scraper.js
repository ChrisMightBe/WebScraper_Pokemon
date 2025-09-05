const cheerio = require('cheerio');

(async() => {
    const url =;
    const response = await fetch(url);

    const $ = cheerio.load(await response.text());
    console.log($.html());
})();

// dextab
const cheerio = require('cheerio');

(async () => {
    const url = 'https://serebii.net/pokemon/';  // Url of Serebii's pokemon page, the most bas epage with dex access
    const response = await fetch(url);  // fetch returns a promise, so we await it
    const html = await response.text(); // awaits .text() apparently, so the function will actually work?
    const $ = cheerio.load(html);  // loads html into cheerio

    const $dextab = $('table.dextab');
    console.log($dextab.html());
})();
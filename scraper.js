const puppeteer = require('puppeteer');

/*(async () => {
    const url = 'https://pokemondb.net/pokedex/bulbasaur';  // Url of pokemondb's pokemon page, the most base page with dex access
    const response = await fetch(url);  // fetch returns a promise, so we await it
    const html = await response.text(); // awaits .text() apparently, so the function will actually work?
    const $ = cheerio.load(html);  // loads html into cheerio

    

    const $dextab = $('.entity-nav-next'); // change selector to match the structure of pokemondb.net
    console.log($dextab.html());
})(); */


// maybe change to pokemondb.net, data might be easier to scrape

async function scrape() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://pokemondb.net/pokedex/bulbasaur');

    // Extract data from the page
    const data = await page.evaluate(() => {
        const name = document.querySelector('h1');
        const typeElements = document.querySelectorAll('.vitals-table .type-icon');
        const types = Array.from(typeElements).map(el => el.innerText);
        return { name, types };
    });
    console.log(data);
    await browser.close();

}

scrape();

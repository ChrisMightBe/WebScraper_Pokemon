import puppeteer from "puppeteer";
import fs from "fs";


// import cheerio from "cheerio";
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
    await page.goto('https://pokemondb.net/pokedex/bulbasaur', {timeout:0});

    const results = [];

    for(let i = 0; i < 809; i++) {
    const data = await page.evaluate(() => {
        const nameRaw = document.querySelector('h1');
        const name = nameRaw ? nameRaw.innerText : null;
        const typeRaws = Array.from(document.querySelectorAll('.vitals-table .type-icon'));
        const types = typeRaws
            .map(el => el.innerText)
            .filter(type => !/[a-z]/.test(type));
        return { name, types };
    });
    results.push(data);
    await Promise.all([
        page.click('.entity-nav-next'),
        page.waitForNavigation({ timeout: 0 })
    ]);
}
    
    await browser.close();

    //Convert to CSV
    const csvHEeader = 'Name,Type1,Type2\n';
    const csvRows = results.map(p =>
        [p.name, p.types[0] || "", p.types[1] || ""].join(",")
    );
    const csvContent = csvHEeader + csvRows.join("\n");

    fs.writeFileSync('pokemon.csv', csvContent, "utf-8");
    console.log('Data saved to pokemon.csv');
}

scrape();

//pokemondb, in their faqs, state that their data is not free for use
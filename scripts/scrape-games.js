import * as puppeteer from 'puppeteer';
import * as fs from 'fs';

async function getPartyGames(){
	let browser;
	try {
	    console.log("Opening the browser......");
	    browser = await puppeteer.launch({ headless: true });

        const page = await browser.newPage();
        await page.goto("https://www.jackboxgames.com/games/");

		return await page.evaluate(scrapeImgs);
	} catch (err) {
	    console.log("Could not create a browser instance => : ", err);
	} finally {
		browser.close();
	}
	return browser;
};

function scrapeImgs() {
	const partyGames = [];
	const imgs = document.querySelectorAll('[data-id="23c9bc6"] .attachment-woocommerce_thumbnail');
	imgs.forEach(img => {
		partyGames.push({
			imgSrc: img.getAttribute('src')
		})
	})
	return partyGames;
}

const allGames = await getPartyGames();
const _json = JSON.stringify({ allGames }, null, 4);

fs.writeFile('./src/games.json', _json, 'utf8', (err, data) => {
	if (err) {
		console.log(err);
	} else {
		console.log('Write to disk');
	}
});
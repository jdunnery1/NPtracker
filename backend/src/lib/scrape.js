import axios from 'axios'
import * as cheerio from 'cheerio'


export async function scrapeData(url) {
    try {
        const response = await axios.get(url);
        const html = response.data;
        const $ = cheerio.load(html);

        const parks = [];
        $('table:first').find('tr').each((i, el) => {
            let park = {}

            park.name = ($(el).find(':first').find('a').text())
            park.image = 'https:' + ($(el).find('img').attr('src'))
            park.description = ($(el).find(':last').text().replace('\n', ''))
            park.location = $(el).find('td:nth-child(3)').find('a:first').text()


            parks.push(park)
        })
        parks.shift()
        return parks.filter((park) => park.name !== '');
    } catch (error) {
        console.error('Error scraping data:', error);
        return null;
    }
}

// Usage
// scrapeData('https://en.wikipedia.org/wiki/List_of_national_parks_of_the_United_States')
//     .then(parks => {
//         if (parks) {
//             console.log('parks:', parks);
//             console.log(parks.length)
//         }
//     });



const puppeteer = require('puppeteer');


const filmReviews = async function (title) {
    try {
        const browser = await puppeteer.launch({
            headless: true,
        });
        const page = await browser.newPage();
        await page.goto("https://www.filmaffinity.com/es/main.html");
    
        //Aceptamos el popup de las cookies:
        await page.click('button[class=" css-v43ltw"]');
    
        //Selector del input del buscador: "top-search-input-2"
        //Seleccionamos el input del buscador y buscamos una película (por ejemplo Titanic)
        await page.waitForSelector('input[id="top-search-input-2"]');
        await page.type('input[id="top-search-input-2"]', title);
        //Presionamos enter
        await page.keyboard.press('Enter');
        //   await page.keyboard.press('Enter'); // Enter Key
    
        //Hasta que no esté este selector, no se puede seguir:
        console.log('Accediendo al enlace...')
        await page.waitForSelector('div[class="mc-title"]');
        
        
        //Selector de peli del titanic: class=movie-card-acf select hover
        //Seleccionamos la peli del Titanic y le clickeamos para ir a su página:
        console.log('Entrando en la película...')
        await page.click('div[class="mc-title"] a');
        
        //Seleccionamos la sección de las opiniones:
        //   await page.waitForSelector('ul[id="pro_reviews"]');
        
        //   async function getReviews() {
        // await page.waitForSelector('div[class="pro_reviews"]');
        console.log('Mostrando las reviews de la película...')
        // const proReview = await page.$('.pro-review')
        // const algo = console.log(await proReview.evaluate(element => element.innerText))
        // console.log(algo)
        let reviews = await page.$$eval('div[class="pro-review"]', revs => {
            return revs.slice(0,3).map(rev => rev.innerText)
        })
        console.log(reviews);
        console.log('Reviews mostradas')
        
        
        //Cerramos el browser para terminar:
        await browser.close();  
        return reviews
    } catch (err) {
        return{"Error":err}
    }

}


module.exports = filmReviews;


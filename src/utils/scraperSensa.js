const puppeteer = require('puppeteer');

const sensaReviews = async function (title) {
    try {
        const browser = await puppeteer.launch({
            headless: true,
        });
        const page = await browser.newPage();

        await page.goto("https://www.sensacine.com/");

        // Aceptamos el popup de las cookies:
        // await page.click('button[id="didomi-notice-agree-button"]');

        // Pinchamos en el botón de buscar para que aparezca el input:
        await page.click('div[id="header-main-mobile-btn-search"]');

        // Selector del input del buscador: "header-search-input"
        // Seleccionamos el input del buscador y buscamos una película (por ejemplo Titanic)
        await page.waitForSelector('input[id="header-search-input"]');
        await page.type('input[id="header-search-input"]', title);

        // Presionamos enter
        await page.keyboard.press('Enter');

        // Hasta que no esté este selector, no se puede seguir:
        console.log('Accediendo al enlace...')
        await page.waitForSelector('a[class="xXx meta-title-link"]');

        // // Seleccionamos la peli del Titanic y le clickeamos para ir a su página:
        console.log('Entrando en la película...')
        await page.click('a[class="xXx meta-title-link"]');

        console.log('Selector de la sección de reviews')
        await page.waitForSelector('a[class="xXx rating-title"]');

        // Seleccionamos la sección de las reviews de usuarios y le clickeamos para ir a su página:
        console.log('Entrando en la sección de reviews')
        await page.evaluate(() => {
            document.querySelector('a[class="xXx rating-title"]').click();
          });
          
        // await page.click('a[href=""]');
        console.log('Has entrado en la seccion de las reviews de users');

        // Esperar a que se carguen las reviews
        await page.waitForSelector('.content-txt.review-card-content');

        // Obtener las primeras tres reviews
        let reviews = await page.$$eval('.content-txt.review-card-content', revs => {
            return revs.slice(0, 3).map(rev => rev.innerText)
        });

        console.log(reviews)
        console.log('Reviews mostradas')

        // Cerramos el navegador para terminar:
        await browser.close();
    } catch (err) {
        // Lanzar el error para que se muestre el rastreo completo en la consola
        throw err;
    }
}

sensaReviews("barbie");

module.exports = sensaReviews;



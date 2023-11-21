const puppeteer = require('puppeteer');
//OPCIÓN 1 DE SCRAPEO:

// const puppeteer = require('puppeteer');

// async function scrapeFilmaffinity(tituloPelicula) {
//   const browser = await puppeteer.launch();
//   const page = await browser.newPage();

//   // Navegar a la página de búsqueda de Filmaffinity
//   await page.goto(`https://www.filmaffinity.com/es/advsearch.php?stext=${encodeURIComponent(tituloPelicula)}`);

//   // Esperar a que se carguen los resultados
//   await page.waitForSelector('.se-it', { visible: true });

//   // Obtener los enlaces a las páginas de las películas
//   const enlacesPeliculas = await page.$$eval('.mc-title a', enlaces => enlaces.map(enlace => enlace.href));

//   // Iterar sobre los enlaces y obtener las reviews
//   for (const enlacePelicula of enlacesPeliculas) {
//     await page.goto(enlacePelicula);

//     // Esperar a que se cargue la página de la película
//     await page.waitForSelector('.movie-rat-avg', { visible: true });

//     // Obtener el título de la película y la calificación media
//     const titulo = await page.$eval('.movie-info h1', titulo => titulo.textContent.trim());
//     const calificacionMedia = await page.$eval('.movie-rat-avg', calificacion => calificacion.textContent.trim());

//     console.log(`Película: ${titulo}`);
//     console.log(`Calificación Media: ${calificacionMedia}`);

//     // Obtener las reviews
//     const reviews = await page.$$eval('.reviews-container .content-review', reviews => reviews.map(review => review.textContent.trim()));
//     console.log('Reviews:');
//     console.log(reviews.join('\n'));
//     console.log('---');
//   }

//   await browser.close();
// }

// // Uso del script
// scrapeFilmaffinity('Nombre de tu película');









//OPCIÓN 2 DE SCRAPEO(BASADA EN DEMO DE CLASE):
// const puppeteer = require("puppeteer");

// // Creamos una función para extraer la información de cada producto
// //Importamos el modelo de BBDD
// const extractReviewData = async (url,browser) => {

//     try{
//         // Creamos un objeto vacío donde almacenaremos la información de cada producto
//         const reviewData = {}
//         // Abrimos una nueva pestaña
//         const page = await browser.newPage()
//         // Accedemos al link de cada producto que nos llega por parámetros
//         await page.goto(url)

//         // Utilizamos el método newPage.$eval(selector, function) y almacenamos en productData:

//         /********** A RELLENAR todos los page.$eval(selector, function)  *********/
//         //nombre usuario que hace la crítica
//         reviewData['user'] = await page.$eval(".reseñas", user => user.innerText)
//         //puntuación película que pone el usuario
//         reviewData['punctuation'] = await page.$eval(".reseñas", punctuation => punctuation.innerText)
//         //comentario de la review quue hace el usuario
//         reviewData['infoReview'] = await page.$eval(".reseñas", reviewDescription => reviewDescription.innerText.slice(0,200) + '...')


//         //Llamada a la BBDD para guardar registro nuevo
//         //Lanzar Query "INSERT INTO de SQL" O "save() de mongoose"
//         //model.createProduct(productData)
//         return reviewData // Devuelve los datos de un producto
//     }
//     catch(err){
//         // Devolvemos el error 
//        return {error:err}
//     }

// }


// const scrap = async (url) => {
//     try {
//         // Creamos un array vacío scrapedData donde almacenaremos la información obtenida del scraping
//         const scrapedData = []
//         // inicializamos una instancia del navegador (browser) con puppeteer.launch() y añadimos en el objeto de configuración la opción headless
//         console.log("Opening the browser......");
//         const browser = await puppeteer.launch({
//             headless:false
//         })

//         // Abrimos una nueva pestaña en el navegador creando una instancia con el método newPage() a la que llamaremos page
//         const page = await browser.newPage();
//         // Indicamos la url que debe cargarse en la pestaña con page.goto(url)
//         await page.goto(url);
//         console.log(`Navigating to ${url}...`);

//         // Extraemos todos los links a los que luego navegaremos para obtener el detalle de cada producto

//         // Utilizamos el método $$eval(selector, callback) para capturar una colección de nodos y aplicar la lógica que necesitemos
//         // En este caso , en el CB filtramos el array de items, guardando en un nuevo array

//         /********** A RELLENAR page.$eval(selector, function)  *********/
//         const tmpurls = await page.$$eval("#vistaDetallePelis article div", res => res.map(a => a.href));
//         //Quitamos los duplicados
//         const urls = await tmpurls.filter((link,index) =>{return tmpurls.indexOf(link) === index})

//         console.log("url capuradas",urls)
//         // Me quedo con los 20 primeros productos, porque sino es muy largo
//         const urls2 = urls.slice(0, 5);

//         // Filtramos los productos
//         // Extraemos el dato de cada producto
//         // await extractProductData(urls2[productLink],browser)

//         console.log(`${urls2.length} links encontrados`);

//         // Iteramos el array de urls con un bucle for/in y ejecutamos la promesa extractProductData por cada link en el array. Luego pusheamos el resultado a scraped data
//         for(productLink in urls2){
//             const product = await extractProductData(urls2[productLink],browser)
//             scrapedData.push(product)
//         }

//         console.log(scrapedData, "Lo que devuelve mi función scraper", scrapedData.length) 

//         // cerramos el browser con el método browser.close
//         await browser.close()
//         // Devolvemos el array con los productos
//         return scrapedData;

//     } catch (err) {
//         console.log("Error:", err);
//     }
// }

// exports.scrap = scrap;

/********** DESCOMENTAR PARA PROBAR *********/
// scrap("https://www.filmaffinity.com/es/main.html").then(data =>console.log(data))



//OPCIÓN 3 DE SCRAPEO(DEMO DE DOCU):
// import puppeteer from "puppeteer";

// const getQuotes = async () => {
//   // Start a Puppeteer session with:
//   // - a visible browser (`headless: false` - easier to debug because you'll see the browser in action)
//   // - no default viewport (`defaultViewport: null` - website page will in full width and height)
//   const browser = await puppeteer.launch({
//     headless: false,
//     defaultViewport: null,
//   });

//   // Open a new page
//   const page = await browser.newPage();

//   // On this new page:
//   // - open the "http://quotes.toscrape.com/" website
//   // - wait until the dom content is loaded (HTML is ready)
//   await page.goto("https://www.filmaffinity.com/es/main.html", {
//     waitUntil: "domcontentloaded",
//   });
// };

// // Start the scraping
// getQuotes();



async function openSensaWebPage() {
    try {
        const browser = await puppeteer.launch({
            headless: false,
            slowMo: 40,
        });
        const page = await browser.newPage();

        // Establecer un tiempo de espera de navegación corto para evitar esperar alertas
        page.setDefaultNavigationTimeout(0);

        await page.goto("https://www.sensacine.com/");

        // Aceptamos el popup de las cookies:
        await page.click('button[id="didomi-notice-agree-button"]');

        // Pinchamos en el botón de buscar para que aparezca el input:
        await page.click('div[id="header-main-mobile-btn-search"]');

        // Selector del input del buscador: "header-search-input"
        // Seleccionamos el input del buscador y buscamos una película (por ejemplo Titanic)
        await page.waitForSelector('input[id="header-search-input"]');
        await page.type('input[id="header-search-input"]', 'Titanic');

        // Presionamos enter
        await page.keyboard.press('Enter');

        // Hasta que no esté este selector, no se puede seguir:
        console.log('Accediendo al enlace...')
        await page.waitForSelector('a[href="/peliculas/pelicula-5818/"]');

        // Seleccionamos la peli del Titanic y le clickeamos para ir a su página:
        console.log('Entrando en la película...')
        await page.click('a[href="/peliculas/pelicula-5818/"]');

        console.log('Selector de la sección de reviews')
        await page.waitForSelector('a[href="/peliculas/pelicula-5818/criticas-espectadores/"]', { visible: true, timeout: 5000 });

        // Seleccionamos la sección de las reviews de usuarios y le clickeamos para ir a su página:
        console.log('Entrando en la sección de reviews')
        await page.evaluate(() => {
            document.querySelector('a[href="/peliculas/pelicula-5818/criticas-espectadores/"]').click();
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

        // Restablecer el tiempo de espera de navegación a su valor predeterminado
        page.setDefaultNavigationTimeout(30000);

        // Cerramos el navegador para terminar:
        await browser.close();
    } catch (err) {
        // Lanzar el error para que se muestre el rastreo completo en la consola
        throw err;
    }
}

openSensaWebPage();



// async function openSensaWebPage() {
//     try {
//         const browser = await puppeteer.launch({
//             headless: false,
//             slowMo: 40,
//         });
//         const page = await browser.newPage();

//         page.setDefaultNavigationTimeout(0);

//         await page.goto("https://www.sensacine.com/");


    
//         //Aceptamos el popup de las cookies:
//         await page.click('button[id="didomi-notice-agree-button"]');

//         //Pinchamos en el botón de buscar para que aparezca el input:
//         await page.click('div[id="header-main-mobile-btn-search"]');
    
//         //Selector del input del buscador: "header-search-input"
//         //Seleccionamos el input del buscador y buscamos una película (por ejemplo Titanic)
//         await page.waitForSelector('input[id="header-search-input"]');
//         await page.type('input[id="header-search-input"]', 'Titanic');

//         //Presionamos enter
//         await page.keyboard.press('Enter');
        
//         //Hasta que no esté este selector, no se puede seguir:
//         console.log('Accediendo al enlace...')
//         await page.waitForSelector('a[href="/peliculas/pelicula-5818/"]');
        
//         //Seleccionamos la peli del Titanic y le clickeamos para ir a su página:
//         console.log('Entrando en la película...')
//         await page.click('a[href="/peliculas/pelicula-5818/"]');
        
        
//         console.log('Selector de la sección de reviews')
//         await page.waitForSelector('a[href="/peliculas/pelicula-5818/criticas-espectadores/"]');
        
//         //Seleccionamos la sección de las reviews de usuarios y le clickeamos para ir a su página:
//         console.log('Entrando en la sección de reviews')
//         await page.click('a[href="/peliculas/pelicula-5818/criticas-espectadores/"]');
//         console.log('Has entrado en la seccion de las reviews de users');
        
//         // //Seleccionamos la sección de las opiniones:
//         // //   await page.waitForSelector('ul[id="pro_reviews"]');
        
//         // //   async function getReviews() {
//         // // await page.waitForSelector('div[class="pro_reviews"]');
//         // console.log('Mostrando las reviews de la película...')
//         // // const proReview = await page.$('.pro-review')
//         // // const algo = console.log(await proReview.evaluate(element => element.innerText))
//         // // console.log(algo)
//         let reviews = await page.$$eval('.content-txt.review-card-content', revs => {
//              return revs.slice(0,3).map(rev => rev.innerText)
//         })
//         console.log(reviews)
//         console.log('Reviews mostradas')
        
//         page.setDefaultNavigationTimeout(30000);

//         //Cerramos el browser para terminar:
//         await browser.close();
//     } catch (err) {
//         return{"Error":err}
//     }
// }

// openSensaWebPage();


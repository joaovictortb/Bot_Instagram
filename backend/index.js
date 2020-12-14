const puppeteer = require("puppeteer");
const fs = require("fs");

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  const page = await browser.newPage();
  await page.goto("https://instagram.com/metropoles");

  const imgList = await page.evaluate(() => {
    //executar no browser.
    //Pegar imagens do do post instagram.
    const nodeList = document.querySelectorAll("article img");

    //Transformar o NodeList em Array.
    const imgArray = [...nodeList];

    //Transformar os nodes (elemento html) em objetos JS.
    const imgList = imgArray.map(({ src }) => ({
      src,
    }));

    //Mostrar
    return imgList;
  });

  //excrever ops dados em um aqrquivo local
  fs.writeFile("instagram.json", JSON.stringify(imgList, null, 2), (err) => {
    if (err) throw new Error("something went wrong");
  });

  await browser.close();
})();

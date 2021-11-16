const { clickElement, putText, getText } = require("./lib/commands.js");
const { generateName } = require("./lib/util.js");

let page;

beforeEach(async () => {
  page = await browser.newPage();
  await page.setDefaultNavigationTimeout(0);
});

afterEach(() => {
  page.close();
});

describe("Netology.ru tests", () => {
  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("http://qamid.tmweb.ru/client/index.php");
  });

  test.skip("Successful booking 1 ticket", async () => {
    await clickElement(page, ".page-nav > a:nth-child(3)"); //choose day
    await clickElement(page, "a.movie-seances__time"); //choose time
    await clickElement(page, ".buying-scheme__row > span:nth-child(3)"); //choose chair
    await clickElement(page, "button.acceptin-button"); //click booking
    await clickElement(page, "button.acceptin-button"); //click for qr!
    const actual = await getText(page, "p.ticket__hint");
    expect(actual).toContain(
      "Покажите QR-код нашему контроллеру для подтверждения бронирования."
    );
  });

  test.skip("Successful booking 2 tickets", async () => {
    await clickElement(page, ".page-nav > a:nth-child(3)");
    await clickElement(page, "a.movie-seances__time");
    await clickElement(page, ".buying-scheme__row > span:nth-child(7)");
    await clickElement(page, ".buying-scheme__row > span:nth-child(8)");
    await clickElement(page, "button.acceptin-button");
    await clickElement(page, "button.acceptin-button");
    const actual = await getText(page, "p.ticket__hint");
    expect(actual).toContain(
      "Покажите QR-код нашему контроллеру для подтверждения бронирования."
    );
  });

  test("Should not booking ticket", async () => {
    await clickElement(page, ".page-nav > a:nth-child(3)");
    await clickElement(page, "a.movie-seances__time");
    await clickElement(page, ".buying-scheme__row > span:nth-child(2)");
    await clickElement(page, "button.acceptin-button");
    await clickElement(page, "button.acceptin-button");
    const actual = await getText(page, "p.ticket__hint");
    expect(actual).toContain(
      "Покажите QR-код нашему контроллеру для подтверждения бронирования."
    );
    await page.goto("http://qamid.tmweb.ru/client/index.php");
    await clickElement(page, ".page-nav > a:nth-child(3)");
    await clickElement(page, "a.movie-seances__time");
    await clickElement(page, ".buying-scheme__row > span:nth-child(2)");
    expect(
      String(
        await page.$eval("button", (button) => {
          return button.disabled;
        })
      )
    ).toContain("true");
  });
});
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

  test("Successful booking 1 ticket", async () => {
    await clickElement(page, ".page-nav > a:nth-child(1)");
    await clickElement(page, "a.movie-seances__time");
    await clickElement(page, ".buying-scheme__row > span:nth-child(19)");
    await clickElement(page, "button.acceptin-button");
    await clickElement(page, "button.acceptin-button");
    const actual = await getText(page, "p.ticket__hint");
    expect(actual).toContain(
      "Покажите QR-код нашему контроллеру для подтверждения бронирования."
    );
  });

  test("Successful booking 2 tickets", async () => {
    await clickElement(page, ".page-nav > a:nth-child(3)");
    await clickElement(page, "a.movie-seances__time");
    await clickElement(page, ".buying-scheme__row > span:nth-child(4)");
    await clickElement(page, ".buying-scheme__row > span:nth-child(9)");
    await clickElement(page, "button.acceptin-button");
    await clickElement(page, "button.acceptin-button");
    const actual = await getText(page, "p.ticket__hint");
    expect(actual).toContain(
      "Покажите QR-код нашему контроллеру для подтверждения бронирования."
    );
  });

  test("Should not booking ticket", async () => {
    await clickElement(page, ".page-nav > a:nth-child(1)");
    await clickElement(page, "a.movie-seances__time");
    await clickElement(page, ".buying-scheme__row > span:nth-child(3)");
    await clickElement(page, "button.acceptin-button");
    await clickElement(page, "button.acceptin-button");
    const actual = await getText(page, "p.ticket__hint");
    expect(actual).toContain(
      "Покажите QR-код нашему контроллеру для подтверждения бронирования."
    );
    await page.goto("http://qamid.tmweb.ru/client/index.php");
    await clickElement(page, ".page-nav > a:nth-child(1)");
    await clickElement(page, "a.movie-seances__time");
    await clickElement(page, ".buying-scheme__row > span:nth-child(3)");
    expect(
      String(
        await page.$eval("button", (button) => {
          return button.disabled;
        })
      )
    ).toContain("true");
  });
});

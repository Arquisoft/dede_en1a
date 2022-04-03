import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/add-to-cart.feature');

let page: puppeteer.Page;
let browser: puppeteer.Browser;

defineFeature(feature, test => {

  const testProduct = {
    _id: "622fc1418aedec1b7f536775",
    name: "Screwdriver",
    price: 2,
    description: "Multi-purpose screwdriver.",
  }
  
  beforeAll(async () => {
    browser = process.env.GITHUB_ACTIONS
      ? await puppeteer.launch()
      : await puppeteer.launch({ headless: true });
    page = await browser.newPage();

    await page
      .goto("http://localhost:3000", {
        waitUntil: "networkidle0",
      })
      .catch(() => {});
  });



  test('Adding an item to cart', ({given,when,then}) => {

    given('An empty cart', () => {
    });

    when('I add an item to the cart', async () => {
      await expect(page).toMatch('DEDE')

      await expect(page).toClick(testProduct._id + '_cart')
    });

    then('The item appears in the cart', async () => {
      await expect(page).toClick('shoppingCart')

      await expect(page).toMatch('Total')
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});


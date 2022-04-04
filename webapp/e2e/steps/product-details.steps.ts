import { defineFeature, loadFeature } from 'jest-cucumber';
import puppeteer from "puppeteer";

const feature = loadFeature('./features/product-details.feature');

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

  test('No product details are displayed', ({given,when,then}) => {

    given('No product details', () => {
    });

    when('I click on the product details button of a product', async () => {
      await expect(page).toMatch('DEDE')
      await expect(page).toClick(testProduct._id + '_details')
    });

    then('I am taken to a new page where product details are displayed', async () => {
      await expect(page).toMatch('Price:')
    });
  })

  afterAll(async ()=>{
    browser.close()
  })

});


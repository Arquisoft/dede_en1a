Feature: Displaying product details

Scenario: No product details are displayed
  Given No product details
  When I click on the product details button of a product
  Then I am taken to a new page where product details are displayed
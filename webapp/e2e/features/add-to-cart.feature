Feature: Adding item to cart

Scenario: Adding an item to cart
  Given An empty cart
  When I add an item to the cart
  Then The item appears in the cart
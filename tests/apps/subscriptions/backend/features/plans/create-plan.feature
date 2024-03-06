Feature: Create a new plan
  As a administrator, I want to create a new plan
  In orden to have a subscriptions
  I want to create a new plan

  Scenario: A valid non existing plan
    Given I send a PUT request to "/plans" with body:
      """
      {
        "id": "6b2c04d2-859c-4c9f-ae0b-93c76b0054ec",
        "name": "Basic",
        "price": 1000,
        "duration": 30,
        "description": "Basic plan"
      }
      """
    Then the response status code should be 201
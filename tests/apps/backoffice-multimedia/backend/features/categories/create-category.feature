Feature: Create a new category
  As a user, I want to create a new category
  In order to have a multimedia platform
  I want to create a new category

  Scenario: A valid non existing category
    Given I send a PUT request to "/categories" with body:
      """
      {
        "id": "d4124abc-8de3-4581-9976-d83e9ee98a54",
        "name": "Horror"
      }
      """
    Then the response status code should be 201

  Scenario: A invalid non existing category, name exceeded
    Given I send a PUT request to "/categories" with body:
      """
      {
        "id": "d4124abc-8de3-4581-9976-d83e9ee98a54",
        "name": "lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum"
      }
      """
    Then the response status code should be 400

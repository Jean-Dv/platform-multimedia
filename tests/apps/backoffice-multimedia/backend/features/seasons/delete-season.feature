Feature: Delete a season
  As a administrator, I want to delete a season
  In order to remove a season from the system
  I want to be able to delete a season from the system

  Scenario: A valid existing season
    Given there is the season:
      """
      {
        "id": "08927e7d-b29a-439d-b00e-38a0b227fe6f",
        "title": "S1",
        "releaseYear": 2010,
        "serie": "ae6fde9f-e84b-4088-898c-5b2d2e583a75"
      }
      """
    And I send a DELETE request to "/seasons/08927e7d-b29a-439d-b00e-38a0b227fe6f"
    Then the response status code should be 200


  Scenario: A non-existing season
    Given I send a DELETE request to "/seasons/08927e7d-b29a-439d-b00e-38a0b227fe6f"
    Then the response status code should be 404

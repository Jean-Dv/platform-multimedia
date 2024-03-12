Feature: Delete a serie
  As a administrator, I want to delete a serie
  In order to remove a serie from the system
  I want to be able to delete a serie

  Scenario: A valid existing serie
    Given there is the serie:
      """
      {
        "id": "08927e7d-b29a-439d-b00e-38a0b227fe6f",
        "title": "The Walking Dead",
        "releaseYear": 2010,
        "synopsis": "The Walking Dead is an American post-apocalyptic horror television series based on the comic book series of the same name by Robert Kirkman, Tony Moore, and Charlie Adlard.",
        "categories": [
          "d4124abc-8de3-4581-9976-d83e9ee98a54"
        ]
      }
      """
    And I send a DELETE request to "/series/08927e7d-b29a-439d-b00e-38a0b227fe6f"
    Then the response status code should be 200

  Scenario: A non-existing serie
    Given I send a DELETE request to "/series/08927e7d-b29a-439d-b00e-38a0b227fe6f"
    Then the response status code should be 404
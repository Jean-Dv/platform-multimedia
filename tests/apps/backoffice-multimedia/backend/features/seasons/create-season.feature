Feature: Create a new season
  As a administrator, I want to create a new season
  In order to have a backoffice multimedia platform
  I want to create a new season

  Scenario: A valid non existing season
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
    And I send a PUT request to "/seasons" with body:
      """
      {
        "id": "08927e7d-b29a-439d-b00e-38a0b227fe6f",
        "title": "S1",
        "releaseYear": 2010,
        "serie": {
          "id": "08927e7d-b29a-439d-b00e-38a0b227fe6f"
        }
      }
      """
    Then the response status code should be 201

  Scenario: A invalid non existing season, title exceeded
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
    And I send a PUT request to "/seasons" with body:
      """
      {
        "id": "08927e7d-b29a-439d-b00e-38a0b227fe6f",
        "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "releaseYear": 2010,
        "serie": {
          "id": "08927e7d-b29a-439d-b00e-38a0b227fe6f"
        }
      }
      """
    Then the response status code should be 400

  Scenario: A invalid non existing season, release year is negative
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
    And I send a PUT request to "/seasons" with body:
      """
      {
        "id": "08927e7d-b29a-439d-b00e-38a0b227fe6f",
        "title": "S1",
        "releaseYear": -1,
        "serie": {
          "id": "08927e7d-b29a-439d-b00e-38a0b227fe6f"
        }
      }
      """
    Then the response status code should be 400

  Scenario: A invalid non existing season, serie is not found
    And I send a PUT request to "/seasons" with body:
      """
      {
        "id": "08927e7d-b29a-439d-b00e-38a0b227fe6f",
        "title": "S1",
        "releaseYear": 2010,
        "serie": {
          "id": "08927e7d-b29a-439d-b00e-38a0b227fe6f"
        }
      }
      """
    Then the response status code should be 404
Feature: Create a new serie
  As a administrator, I want to create a new serie
  In order to have a multimedia platform
  I want to create a new serie

  Scenario: A valid non existing serie
    Given there is the category:
      """
      {
        "id": "d4124abc-8de3-4581-9976-d83e9ee98a54",
        "name": "Horror"
      }
      """
    And I send a PUT request to "/series" with body:
      """
      {
        "id": "08927e7d-b29a-439d-b00e-38a0b227fe6f",
        "title": "The Walking Dead",
        "releaseYear": 2010,
        "synopsis": "The Walking Dead is an American post-apocalyptic horror television series based on the comic book series of the same name by Robert Kirkman, Tony Moore, and Charlie Adlard.",
        "categories": [
          {
            "id": "d4124abc-8de3-4581-9976-d83e9ee98a54"
          }
        ]
      }
      """
    Then the response status code should be 201

  Scenario: A invalid non existing serie, title exceeded
    Given there is the category:
      """
      {
        "id": "d4124abc-8de3-4581-9976-d83e9ee98a54",
        "name": "Horror"
      }
      """
    And I send a PUT request to "/series" with body:
      """
      {
        "id": "08927e7d-b29a-439d-b00e-38a0b227fe6f",
        "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "releaseYear": 2010,
        "synopsis": "The Walking Dead is an American post-apocalyptic horror television series based on the comic book series of the same name by Robert Kirkman, Tony Moore, and Charlie Adlard.",
        "categories": [
          {
            "id": "d4124abc-8de3-4581-9976-d83e9ee98a54"
          }
        ]
      }
      """
    Then the response status code should be 400

  Scenario: A invalid non existing serie, release year is negative
    Given there is the category:
      """
      {
        "id": "d4124abc-8de3-4581-9976-d83e9ee98a54",
        "name": "Horror"
      }
      """
    And I send a PUT request to "/series" with body:
      """
      {
        "id": "08927e7d-b29a-439d-b00e-38a0b227fe6f",
        "title": "The Walking Dead",
        "releaseYear": -1,
        "synopsis": "The Walking Dead is an American post-apocalyptic horror television series based on the comic book series of the same name by Robert Kirkman, Tony Moore, and Charlie Adlard.",
        "categories": [
          {
            "id": "d4124abc-8de3-4581-9976-d83e9ee98a54"
          }
        ]
      }
      """
    Then the response status code should be 400

  Scenario: A invalid non existing serie, category does not found

    And I send a PUT request to "/series" with body:
      """
      {
        "id": "08927e7d-b29a-439d-b00e-38a0b227fe6f",
        "title": "The Walking Dead",
        "releaseYear": 2010,
        "synopsis": "The Walking Dead is an American post-apocalyptic horror television series based on the comic book series of the same name by Robert Kirkman, Tony Moore, and Charlie Adlard.",
        "categories": [
          {
            "id": "d4124abc-8de3-4581-9976-d83e9ee98a54"
          }
        ]
      }
      """
    Then the response status code should be 404
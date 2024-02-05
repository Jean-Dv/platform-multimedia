Feature: Create a new movie
  As a administrator, I want to create a new movie
  In orden to have a multimedia platform
  I want to create a new movie

  Scenario: A valid non existing movie
    Given there is the category:
      """
      {
        "id": "d4124abc-8de3-4581-9976-d83e9ee98a54",
        "name": "Horror"
      }
      """
    And I send a PUT request to "/movies" with body:
      """
      {
        "id": "ae6fde9f-e84b-4088-898c-5b2d2e583a75",
        "title": "Hello",
        "releaseYear": 2016,
        "synopsis": "Hello 2.0",
        "categories": [
          {
            "id": "d4124abc-8de3-4581-9976-d83e9ee98a54"
          }
        ],
        "videoId": "79da03fc-185b-414a-8744-595d351e29dc"
      }
      """
    Then the response status code should be 201

  Scenario: A invalid non existing movie, title exceeded
    Given there is the category:
      """
      {
        "id": "d4124abc-8de3-4581-9976-d83e9ee98a54",
        "name": "Horror"
      }
      """
    And I send a PUT request to "/movies" with body:
      """
      {
        "id": "ae6fde9f-e84b-4088-898c-5b2d2e583a75",
        "title": "lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "releaseYear": 2016,
        "synopsis": "Hello 2.0",
        "categories": [
          {
            "id": "d4124abc-8de3-4581-9976-d83e9ee98a54"
          }
        ],
        "videoId": "79da03fc-185b-414a-8744-595d351e29dc"
      }
      """
    Then the response status code should be 400

  Scenario: A invalid non existing movie, releaseYear is negative
    Given there is the category:
      """
      {
        "id": "d4124abc-8de3-4581-9976-d83e9ee98a54",
        "name": "Horror"
      }
      """
    And I send a PUT request to "/movies" with body:
      """
      {
        "id": "ae6fde9f-e84b-4088-898c-5b2d2e583a75",
        "title": "Hello",
        "releaseYear": -1,
        "synopsis": "Hello 2.0",
        "categories": [
          {
            "id": "d4124abc-8de3-4581-9976-d83e9ee98a54"
          }
        ],
        "videoId": "79da03fc-185b-414a-8744-595d351e29dc"
      }
      """
    Then the response status code should be 400

  Scenario: A invalid non existing movie, category does not found
    And I send a PUT request to "/movies" with body:
      """
      {
        "id": "ae6fde9f-e84b-4088-898c-5b2d2e583a75",
        "title": "Hello",
        "releaseYear": 2016,
        "synopsis": "Hello 2.0",
        "categories": [
          {
            "id": "d4124abc-8de3-4581-9976-d83e9ee98a54"
          }
        ],
        "videoId": "79da03fc-185b-414a-8744-595d351e29dc"
      }
      """
    Then the response status code should be 404
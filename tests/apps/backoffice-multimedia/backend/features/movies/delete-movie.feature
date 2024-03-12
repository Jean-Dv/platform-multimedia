Feature: Delete a movie
  As a administrator, I want to delete a movie
  In order to remove a movie from the system
  I want to be able to delete a movie from the system

  Scenario: A valid existing movie
    Given there is the movie:
      """
      {
        "id": "ae6fde9f-e84b-4088-898c-5b2d2e583a75",
        "title": "Argylle",
        "releaseYear": 2024,
        "synopsis": "A super-spy is born",
        "categories": [
          "d4124abc-8de3-4581-9976-d83e9ee98a54"
        ],
        "videoId": "79da03fc-185b-414a-8744-595d351e29dc"
      }
      """
    And I send a DELETE request to "/movies/ae6fde9f-e84b-4088-898c-5b2d2e583a75"
    Then the response status code should be 200


  Scenario: A non-existing movie
    Given I send a DELETE request to "/movies/ae6fde9f-e84b-4088-898c-5b2d2e583a75"
    Then the response status code should be 404

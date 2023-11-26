Feature: Create a new movie
  In order to have a multimedia in the platform
  I want to create a new movie

  Scenario: A valid non existing movie
    Given I send a PUT request to "/multimedia/movies/544f3547-f5dd-453a-82df-b176e09ec0f4" with body:
    """
    {
      "id": "544f3547-f5dd-453a-82df-b176e09ec0f4",
      "title": "The Matrix",
      "releaseDate": "1999-03-31",
      "duration": 136
    }
    """
    Then the response status code should be 201
    And the response content should be:
    """
    {
      "ok": true
    }
    """

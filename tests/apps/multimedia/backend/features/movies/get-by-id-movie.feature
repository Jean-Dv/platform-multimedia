Feature: Get by id movie
  As a user registered with permission
  I want to get a chapter by id with url

  Scenario: Get by id movie
    Given there is the movie:
    """
    {
      "id": "2f728ac4-8849-4e82-a184-0dab8e101a28",
      "title": "The Matrix",
      "releaseDate": "1999-05-21",
      "url": "https://www.youtube.com/watch?v=m8e-FF8MsqU",
      "duration": 8160
    }
    """
    When I send a GET request to "/multimedia/movies/2f728ac4-8849-4e82-a184-0dab8e101a28" with user registered
    Then the response status code should be 200
    And the response content should be:
    """
    {
      "ok": true,
      "data": {
        "movie": {
          "id": "2f728ac4-8849-4e82-a184-0dab8e101a28",
          "title": "The Matrix",
          "releaseDate": "1999-05-21",
          "url": "https://www.youtube.com/watch?v=m8e-FF8MsqU",
          "duration": 8160
        }
      }
    }
    """

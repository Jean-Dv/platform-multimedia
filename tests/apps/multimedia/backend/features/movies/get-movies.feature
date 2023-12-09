Feature: Get movies
  As a visitor without permissions
  I want to get a list of movies

  Scenario: All existing courses
    Given there is the category:
    """
    {
      "id": "2f728ac4-8849-4e82-a184-0dab8e101a27",
      "name": "Action"
    }
    """
    Given there is the movie:
    """
    {
      "id": "2f728ac4-8849-4e82-a184-0dab8e101a28",
      "category": "Action",
      "title": "The Matrix",
      "releaseDate": "1999-05-21",
      "url": "https://www.youtube.com/watch?v=m8e-FF8MsqU",
      "duration": 8160
    }
    """
    And there is the movie:
    """
    {
      "id": "2f728ac4-8849-4e82-a184-0dab8e101a29",
      "category": "Action",
      "title": "The Matrix Reloaded",
      "releaseDate": "2003-05-16",
      "url": "https://www.youtube.com/watch?v=m8e-FF8MsqU",
      "duration": 8280
    }
    """
    When I send a GET request to "/multimedia/movies"
    Then the response status code should be 200
    And the response content should be:
    """
    {
      "ok": true,
      "data": [
      {
        "id": "2f728ac4-8849-4e82-a184-0dab8e101a29",
        "category": "Action",
        "title": "The Matrix Reloaded",
        "releaseDate": "2003-05-16",
        "duration": 8280
      },
      {
        "id": "2f728ac4-8849-4e82-a184-0dab8e101a28",
        "category": "Action",
        "title": "The Matrix",
        "releaseDate": "1999-05-21",
        "duration": 8160
      }
      ]
    }
    """

  Scenario: Filter by title
    Given there is the category:
    """
    {
      "id": "2f728ac4-8849-4e82-a184-0dab8e101a27",
      "name": "Action"
    }
    """
    Given there is the movie:
    """
    {
      "id": "2f728ac4-8849-4e82-a184-0dab8e101a28",
      "title": "The Matrix",
      "category": "Action",
      "releaseDate": "1999-05-21",
      "url": "https://www.youtube.com/watch?v=m8e-FF8MsqU",
      "duration": 8160
    }
    """
    And there is the movie:
    """
    {
      "id": "2f728ac4-8849-4e82-a184-0dab8e101a29",
      "category": "Action",
      "title": "The Matrix Reloaded",
      "releaseDate": "2003-05-16",
      "url": "https://www.youtube.com/watch?v=m8e-FF8MsqU",
      "duration": 8280
    }
    """
    When I send a GET request to "/multimedia/movies?filters[]={'field': 'title', 'operator': '=', 'value': 'The Matrix Reloaded'}"
    Then the response status code should be 200
    And the response content should be:
    """
    {
      "ok": true,
      "data": [
      {
        "id": "2f728ac4-8849-4e82-a184-0dab8e101a29",
        "category": "Action",
        "title": "The Matrix Reloaded",
        "releaseDate": "2003-05-16",
        "duration": 8280
      }
      ]
    }
    """

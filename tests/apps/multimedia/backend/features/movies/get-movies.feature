Feature: Get movies
  As a visitor without permissions
  I want to get a list of movies

  Scenario: All existing movies
    Given the following event is received:
    """
    {
      "data": {
        "id": "66c22f60-5539-4db9-b3d7-dac183f2ff32",
        "type": "backoffice.multimedia.movie.created",
        "occurredOn": "2020-05-16T00:00:00.000Z",
        "aggregateId": "ae6fde9f-e84b-4088-898c-5b2d2e583a75",
        "attributes": {
          "title": "Hello",
          "releaseYear": 2016,
          "synopsis": "Hello",
          "categories": ["d4124abc-8de3-4581-9976-d83e9ee98a54"],
          "videoId": "79da03fc-185b-414a-8744-595d351e29dc"
        },
        "meta": {
          "host": "localhost"
        }
      }
    }
    """
    When I send a GET request to "/movies"
    Then the response status code should be 200
    And the response content should be:
    """
    {
      "ok": true,
      "data": [
        {
          "id": "ae6fde9f-e84b-4088-898c-5b2d2e583a75",
          "title": "Hello",
          "releaseYear": 2016,
          "synopsis": "Hello",
          "categories": ["d4124abc-8de3-4581-9976-d83e9ee98a54"],
          "videoId": "79da03fc-185b-414a-8744-595d351e29dc"
        }
      ]
    }
    """

  Scenario: Filter by title
    Given the following event is received:
    """
    {
      "data": {
        "id": "2f728ac4-8849-4e82-a184-0dab8e101a29",
        "type": "backoffice.multimedia.movie.created",
        "occurredOn": "2020-05-16T00:00:00.000Z",
        "aggregateId": "2f728ac4-8849-4e82-a184-0dab8e101a29",
        "attributes": {
          "title": "The Matrix Reloaded",
          "releaseYear": 2003,
          "synopsis": "The Matrix Reloaded",
          "categories": ["d4124abc-8de3-4581-9976-d83e9ee98a54"],
          "videoId": "79da03fc-185b-414a-8744-595d351e29dc"
        },
        "meta": {
          "host": "localhost"
        }
      }
    }
    """
    When I send a GET request to "/movies?filters[]={'field': 'title', 'operator': '=', 'value': 'The Matrix Reloaded'}"
    Then the response status code should be 200
    And the response content should be:
    """
    {
      "ok": true,
      "data": [
      {
        "id": "2f728ac4-8849-4e82-a184-0dab8e101a29",
        "title": "The Matrix Reloaded",
        "releaseYear": 2003,
        "synopsis": "The Matrix Reloaded",
        "categories": ["d4124abc-8de3-4581-9976-d83e9ee98a54"],
        "videoId": "79da03fc-185b-414a-8744-595d351e29dc"
      }
      ]
    }
    """

Feature: Get Series
  As a visitor without permissions
  I want to get a list of movies

  Scenario: All existing series
    Given the following event is received:
    """
    {
      "data": {
        "id": "0661929f-10f0-4db5-8ce9-a1b819c92fe5",
        "type": "backoffice.multimedia.serie.created",
        "occurredOn": "2019-08-08T08:37:32+00:00",
        "aggregateId": "08927e7d-b29a-439d-b00e-38a0b227fe6f",
        "attributes": {
          "title": "The Walking Dead",
          "releaseYear": 2010,
          "synopsis": "The Walking Dead is an American post-apocalyptic horror television series based on the comic book series of the same name by Robert Kirkman, Tony Moore, and Charlie Adlard.",
          "categories": ["d4124abc-8de3-4581-9976-d83e9ee98a54"]
        },
        "meta": {
          "host": "localhost"
        }
      }
    }
    """
    When I send a GET request to "/series"
    Then the response status code should be 200
    And the response content should be:
    """
    {
      "ok": true,
      "data": [
        {
          "id": "08927e7d-b29a-439d-b00e-38a0b227fe6f",
          "title": "The Walking Dead",
          "releaseYear": 2010,
          "synopsis": "The Walking Dead is an American post-apocalyptic horror television series based on the comic book series of the same name by Robert Kirkman, Tony Moore, and Charlie Adlard.",
          "categories": ["d4124abc-8de3-4581-9976-d83e9ee98a54"]
        }
      ]
    }
    """

  Scenario: Filter by title
    Given the following event is received:
    """
    {
      "data": {
        "id": "0661929f-10f0-4db5-8ce9-a1b819c92fe5",
        "type": "backoffice.multimedia.serie.created",
        "occurredOn": "2019-08-08T08:37:32+00:00",
        "aggregateId": "08927e7d-b29a-439d-b00e-38a0b227fe6f",
        "attributes": {
          "title": "The Walking Dead",
          "releaseYear": 2010,
          "synopsis": "The Walking Dead is an American post-apocalyptic horror television series based on the comic book series of the same name by Robert Kirkman, Tony Moore, and Charlie Adlard.",
          "categories": ["d4124abc-8de3-4581-9976-d83e9ee98a54"]
        },
        "meta": {
          "host": "localhost"
        }
      }
    }
    """
    When I send a GET request to "/series?filters[]={'field': 'title', 'operator': '=', 'value': 'The Walking Dead'}"
    Then the response status code should be 200
    And the response content should be:
    """
    {
      "ok": true,
      "data": [
        {
          "id": "08927e7d-b29a-439d-b00e-38a0b227fe6f",
          "title": "The Walking Dead",
          "releaseYear": 2010,
          "synopsis": "The Walking Dead is an American post-apocalyptic horror television series based on the comic book series of the same name by Robert Kirkman, Tony Moore, and Charlie Adlard.",
          "categories": ["d4124abc-8de3-4581-9976-d83e9ee98a54"]
        }
      ]
    }
    """

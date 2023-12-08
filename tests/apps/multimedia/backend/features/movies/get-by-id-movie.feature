Feature: Get by id movie
  As a user registered with permission
  I want to get a chapter by id with url

  Scenario: Get by id movie
    Given the following event is received:
    """
    {
      "data": {
        "id": "50a2b4ed-c060-4684-b439-de14bcea1419",
        "type": "role.created",
        "occurred_on": "2019-08-08T08:37:32+00:00",
        "aggregateId": "050d3d09-0ffc-40a9-bb66-cd9cabae60b6",
        "attributes": {
          "name": "admin"
        },
        "meta": {
          "host": "localhost",
        }
      }
    }
    """
    And the following event is received:
    """
    {
      "data": {
        "id": "50a2b4ed-c060-4684-b439-de14bcea1419",
        "type": "role.created",
        "occurred_on": "2019-08-08T08:37:32+00:00",
        "aggregateId": "050d3d09-0ffc-40a9-bb66-cd9cabae60b7",
        "attributes": {
          "name": "registered"
        },
        "meta": {
          "host": "localhost",
        }
      }
    }
    """
    And the following event is received:
    """
    {
      "data": {
        "id": "50a2b4ed-c060-4684-b439-de14bcea1419",
        "type": "user.created",
        "occurred_on": "2019-08-08T08:37:32+00:00",
        "aggregateId": "050d3d09-0ffc-40a9-bb66-cd9cabae60b8",
      }
    }
    """
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
    Given I have a valid token
    When I send a GET request to "/multimedia/movies/2f728ac4-8849-4e82-a184-0dab8e101a28"
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

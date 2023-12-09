Feature: Get by id movie
  As a user registered with permission
  I want to get a chapter by id with url

  Scenario: Get by id movie
    Given there is the role:
    """
    {
      "id": "050d3d09-0ffc-40a9-bb66-cd9cabae60b6",
      "name": "admin"
    }
    """
    And there is the role:
    """
    {
      "id": "050d3d09-0ffc-40a9-bb66-cd9cabae60b7",
      "name": "registered"
    }
    """
    And there is the user:
    """
    {
      "id": "050d3d09-0ffc-40a9-bb66-cd9cabae60b8"
    }
    """
    Given there is the movie:
    """
    {
      "id": "2f728ac4-8849-4e82-a184-0dab8e101a28",
      "category": "action",
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
          "category": "action",
          "title": "The Matrix",
          "releaseDate": "1999-05-21",
          "url": "https://www.youtube.com/watch?v=m8e-FF8MsqU",
          "duration": 8160
        }
      }
    }
    """
  Scenario: Delete category of a movie
    Given there is the role:
    """
    {
      "id": "050d3d09-0ffc-40a9-bb66-cd9cabae60b6",
      "name": "admin"
    }
    """
    And there is the role:
    """
    {
      "id": "050d3d09-0ffc-40a9-bb66-cd9cabae60b7",
      "name": "registered"
    }
    """
    And there is the user:
    """
    {
      "id": "050d3d09-0ffc-40a9-bb66-cd9cabae60b8"
    }
    """
    Given there is the category:
    """
    {
      "id": "2f728ac4-8849-4e82-a184-0dab8e101a29",
      "name": "action"
    }
    """
    And there is the movie:
    """
    {
      "id": "2f728ac4-8849-4e82-a184-0dab8e101a28",
      "category": "action",
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
          "category": "action",
          "title": "The Matrix",
          "releaseDate": "1999-05-21",
          "url": "https://www.youtube.com/watch?v=m8e-FF8MsqU",
          "duration": 8160
        }
      }
    }
    """
    Given the following event is received:
    """
    {
      "data": {
        "eventId": "9a790ebf-cf35-487c-9644-7b2af2ae3585",
        "type": "category.deleted",
        "occurredOn": "2019-08-08T08:37:32+00:00",
        "aggregateId": "2f728ac4-8849-4e82-a184-0dab8e101a29",
        "attributes": {
          "name": "action"
        }
      }
    }
    """
    When I send a GET request to "/multimedia/movies/2f728ac4-8849-4e82-a184-0dab8e101a28"
    Then the response status code should be 200
    And the response content should be:
    """
    {
      "ok": true,
      "data": {
        "movie": {
          "id": "2f728ac4-8849-4e82-a184-0dab8e101a28",
          "category": "other",
          "title": "The Matrix",
          "releaseDate": "1999-05-21",
          "url": "https://www.youtube.com/watch?v=m8e-FF8MsqU",
          "duration": 8160
        }
      }
    }
    """

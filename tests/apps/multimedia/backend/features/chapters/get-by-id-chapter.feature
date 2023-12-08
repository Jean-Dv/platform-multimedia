Feature: Get by id chapter
  As a user registered with permission
  I want to get a chapter by id with url

  Scenario: Get by id chapter
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
    Given there is the chapter:
    """
    {
      "id": "72545b03-f5f2-4fc1-81c8-5ed174ac7c4e",
      "seasonId": "bb7f05ae-4469-474f-a5cd-5ac3fe14d657",
      "title": "Bart the Genius",
      "releaseDate": "1990-01-14",
      "url": "https://www.youtube.com/watch?v=2SZ0ywxewZg",
      "duration": 1200
    }
    """
    Given I have a valid token
    When I send a GET request to "/multimedia/chapters/72545b03-f5f2-4fc1-81c8-5ed174ac7c4e"
    Then the response status code should be 200
    And the response content should be:
    """
    {
      "ok": true,
      "data": {
        "chapter": {
          "id": "72545b03-f5f2-4fc1-81c8-5ed174ac7c4e",
          "seasonId": "bb7f05ae-4469-474f-a5cd-5ac3fe14d657",
          "title": "Bart the Genius",
          "releaseDate": "1990-01-14",
          "url": "https://www.youtube.com/watch?v=2SZ0ywxewZg",
          "duration": 1200
        }
      }
    }
    """

Feature: Create a new movie
  As a administrator of platform
  In order to have a multimedia in the platform
  I want to create a new movie

  Scenario: A valid non existing movie
    Given the following event is received:
    """
    {
      "data": {
        "id": "50a2b4ed-c060-4684-b439-de14bcea1419",
        "type": "role.created",
        "occurredOn": "2019-08-08T08:37:32+00:00",
        "aggregateId": "050d3d09-0ffc-40a9-bb66-cd9cabae60b6",
        "attributes": {
          "name": "admin"
        },
        "meta": {
          "host": "localhost"
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
        "occurredOn": "2019-08-08T08:37:32+00:00",
        "aggregateId": "050d3d09-0ffc-40a9-bb66-cd9cabae60b7",
        "attributes": {
          "name": "registered"
        },
        "meta": {
          "host": "localhost"
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
        "occurredOn": "2019-08-08T08:37:32+00:00",
        "aggregateId": "050d3d09-0ffc-40a9-bb66-cd9cabae60b8",
        "attributes": {
          "roleName": "admin",
          "firstName": "John",
          "lastName": "Doe",
          "email": "jonhdoe1@gmail.com"
        }
      }
    }
    """
    Given I have a valid token
    Given I send a PUT request to "/multimedia/movies/544f3547-f5dd-453a-82df-b176e09ec0f4" with body:
    """
    {
      "id": "544f3547-f5dd-453a-82df-b176e09ec0f4",
      "title": "The Matrix",
      "releaseDate": "1999-03-31",
      "url": "http://www.imdb.com/title/tt0133093",
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

  Scenario: A invalid non existing movie
    Given the following event is received:
    """
    {
      "data": {
        "id": "50a2b4ed-c060-4684-b439-de14bcea1419",
        "type": "role.created",
        "occurredOn": "2019-08-08T08:37:32+00:00",
        "aggregateId": "050d3d09-0ffc-40a9-bb66-cd9cabae60b6",
        "attributes": {
          "name": "admin"
        },
        "meta": {
          "host": "localhost"
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
        "occurredOn": "2019-08-08T08:37:32+00:00",
        "aggregateId": "050d3d09-0ffc-40a9-bb66-cd9cabae60b7",
        "attributes": {
          "name": "registered"
        },
        "meta": {
          "host": "localhost"
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
        "occurredOn": "2019-08-08T08:37:32+00:00",
        "aggregateId": "050d3d09-0ffc-40a9-bb66-cd9cabae60b8",
        "attributes": {
          "roleName": "admin",
          "firstName": "John",
          "lastName": "Doe",
          "email": "jonhdoe1@gmail.com"
        }
      }
    }
    """
    Given I have a valid token
    Given I send a PUT request to "/multimedia/movies/544f3547-f5dd-453a-82df-b176e09ec0f4" with body:
    """
    {
      "id": "544f3547-f5dd-453a-82df-b176e09ec0f4",
      "title": "The Matrix",
      "releaseDate": "1999-03-31",
      "url": "http://www.imdb.com/title/tt0133093/",
      "duration": -136
    }
    """
    Then the response status code should be 400

  Scenario: A invalid non existing movie with bad url
    Given the following event is received:
    """
    {
      "data": {
        "id": "50a2b4ed-c060-4684-b439-de14bcea1419",
        "type": "role.created",
        "occurredOn": "2019-08-08T08:37:32+00:00",
        "aggregateId": "050d3d09-0ffc-40a9-bb66-cd9cabae60b6",
        "attributes": {
          "name": "admin"
        },
        "meta": {
          "host": "localhost"
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
        "occurredOn": "2019-08-08T08:37:32+00:00",
        "aggregateId": "050d3d09-0ffc-40a9-bb66-cd9cabae60b7",
        "attributes": {
          "name": "registered"
        },
        "meta": {
          "host": "localhost"
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
        "occurredOn": "2019-08-08T08:37:32+00:00",
        "aggregateId": "050d3d09-0ffc-40a9-bb66-cd9cabae60b8",
        "attributes": {
          "roleName": "admin",
          "firstName": "John",
          "lastName": "Doe",
          "email": "jonhdoe1@gmail.com"
        }
      }
    }
    """
    Given I have a valid token
    Given I send a PUT request to "/multimedia/movies/544f3547-f5dd-453a-82df-b176e09ec0f4" with body:
    """
    {
      "id": "544f3547-f5dd-453a-82df-b176e09ec0f4",
      "title": "The Matrix",
      "releaseDate": "1999-03-31",
      "url": "invalid url",
      "duration": 136
    }
    """
    Then the response status code should be 400

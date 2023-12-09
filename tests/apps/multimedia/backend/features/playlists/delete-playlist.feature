Feature: Delete a playlist
  In order to have a multimedia in the platform
  As a user registered in the platform
  I want to delete a playlist

  Scenario: A valid user deletes a playlist
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
    Given I have a valid token
    And there is the playlist:
    """
    {
      "id": "1ca4ea9d-eea2-4bb0-a66d-541623d270f4",
      "userId": "bc4e85b3-ec12-453e-9982-3e9938d7da5b",
      "name": "My playlist",
      "movies": [
        "20dffe72-b0b4-451f-b43e-3fecc30631f5",
        "4e1c3b0e-3b9e-4a1e-9b6f-6d1b9b5c5f4c"
      ],
      "series": [
        "4e1c3b0e-3b9e-4a1e-9b6f-6d1b9b5c5f4d",
        "d6cf9cbc-0ffd-4b02-ae5e-de2585b0cdfe"
      ]
    }
    """
    When I send a DELETE request to "/multimedia/playlist/1ca4ea9d-eea2-4bb0-a66d-541623d270f4"
    Then the response status code should be 200
    And the response content should be:
    """
    {
      "ok": true
    }
    """

  Scenario: A invalid because playlist does not exist
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
          "roleName": "registered",
          "firstName": "John",
          "lastName": "Doe",
          "email": "jonhdoe1@gmail.com"
        }
      }
    }
    """
    Given I have a valid token
    When I send a DELETE request to "/multimedia/playlist/1ca4ea9d-eea2-4bb0-a66d-541623d270f4"
    Then the response status code should be 404

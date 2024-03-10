Feature: Login of user
  In order to have a users in the platform
  I want to login a user

  Scenario: A valid existing user
    Given I send a PUT request to "/auth/register" with body:
      """
      {
        "id": "b29539c4-171f-42b3-be93-facb95c4f66a",
        "firstName": "John",
        "lastName": "Doe",
        "email": "jonhdoe@gmail.com",
        "password": "#3*7VXn33e9&!8*",
        "repeatPassword": "#3*7VXn33e9&!8*"
      }
      """
    And the following event is received:
      """
      {
        "data": {
          "id": "a9a7e12a-da2b-4f4f-98fb-e0813137aa62",
          "type": "subscriptions.transaction.created",
          "occurredOn": "now()",
          "aggregateId": "640712e4-1915-4a37-ab29-b830f7eb8a87",
          "attributes": {
            "planId": "8d0c39da-d5df-4a73-b853-722a594ca548",
            "planDuration": 30,
            "userId": "b29539c4-171f-42b3-be93-facb95c4f66a"
          },
          "meta": {
            "host": "localhost"
          }
        }
      }
      """
    Then the response status code should be 201
    And the response content should not be empty

    Given I send a POST request to "/auth/login" with body:
    """
    {
      "email": "jonhdoe@gmail.com",
      "password": "#3*7VXn33e9&!8*"
    }
    """
    Then the response status code should be 200
    And the response contains a refresh token

  Scenario: A invalid non existing user
    Given I send a POST request to "/auth/login" with body:
    """
    {
      "email": "jonhdoe1@gmail.com",
      "password": "#3*7VXn33e9&!8*"
    }
    """
    Then the response status code should be 400
    And the response content should be:
    """
    {
      "ok": false,
      "error": "The email <jonhdoe1@gmail.com> is not valid"
    }
    """

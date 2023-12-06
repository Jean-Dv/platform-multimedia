Feature: Obtain access token
  In order to have a users in the platform
  I want to obtain an access token

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

    Given I send a GET request to "/token/access"
    Then the response status code should be 200
    And the response contains an access token
    And the response contains a refresh token

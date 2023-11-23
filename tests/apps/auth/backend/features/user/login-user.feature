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
    And the response content should be:
    """
    {
      "ok": true
    }
    """

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

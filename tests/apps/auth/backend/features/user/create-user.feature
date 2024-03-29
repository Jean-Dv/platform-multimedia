Feature: Create a new user
  In order to have a users in the platform
  I want to create a new user

  Scenario: A valid non existing user
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

  Scenario: An invalid non existing user
    Given I send a PUT request to "/auth/register" with body:
    """
    {
      "id": "b29539c4-171f-42b3-be93-facb95c4f66a",
      "firstName": "John",
      "lastName": "Doe",
      "email": "invalidemail",
      "password": "12345678",
      "repeatPassword": "12345678"
    }
    """
    Then the response status code should be 422

    Given I send a PUT request to "/auth/register" with body:
    """
    {
      "id": "b29539c4-171f-42b3-be93-facb95c4f66a",
      "firstName": "John",
      "lastName": "Doe",
      "email": "jonhdoe@gmail.com",
      "password": "12345678",
      "repeatPassword": "123456"
    }
    """
    Then the response status code should be 422
  
  Scenario: An invalid existing user
    Given there is the user:
    """
    {
      "id": "b29539c4-171f-42b3-be93-facb95c4f66b",
      "role": "registered",
      "firstName": "John",
      "lastName": "Doe",
      "email": "jonhdoe1@gmail.com",
      "password": "#3*7VXn33e9&!8*",
      "startPlan": "2021-01-01",
      "endPlan": "2021-12-31"
    }
    """
    And I send a PUT request to "/auth/register" with body:
    """
    {
      "id": "b29539c4-171f-42b3-be93-facb95c4f66a",
      "firstName": "John",
      "lastName": "Doe",
      "email": "jonhdoe1@gmail.com",
      "password": "#3*7VXn33e9&!8*",
      "repeatPassword": "#3*7VXn33e9&!8*"
    }
    """
    Then the response status code should be 400

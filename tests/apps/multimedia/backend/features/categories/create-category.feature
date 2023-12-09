Feature: Create a new Category
  As a administrator of platform
  In order to have a multimedia platform
  I want to create a new category

  Scenario: A valid non existing category
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
    Given I send a PUT request to "/multimedia/categories/6031bba8-ee09-492e-8d3b-740f63b200ae" with body:
    """
    {
      "id": "6031bba8-ee09-492e-8d3b-740f63b200ae",
      "name": "Horror"
    }
    """
    Then the response status code should be 201

  Scenario: A invalid with name category exceeded
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
    Given I send a PUT request to "/multimedia/categories/6031bba8-ee09-492e-8d3b-740f63b200ae" with body:
    """
    {
      "id": "6031bba8-ee09-492e-8d3b-740f63b200ae",
      "name": "Horror is very long name for category, please you can replace"
      }
    """
    Then the response status code should be 422

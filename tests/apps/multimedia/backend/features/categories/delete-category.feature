Feature: Delete a category
  In order to have a multimedia in platform
  As a administrator in the platform
  I want to delete a category

  Scenario: A valid user deletes a category
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
    And there is the category:
    """
    {
      "id": "050d3d09-0ffc-40a9-bb66-cd9cabae60b9",
      "name": "Horror"
    }
    """
    Given I have a valid token
    When I send a DELETE request to "/multimedia/categories/050d3d09-0ffc-40a9-bb66-cd9cabae60b9"
    Then the response status code should be 200

  Scenario: A invalid because category does not exist
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
    When I send a DELETE request to "/multimedia/categories/050d3d09-0ffc-40a9-bb66-cd9cabae60b9"
    Then the response status code should be 404

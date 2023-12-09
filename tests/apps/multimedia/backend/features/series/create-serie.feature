Feature: Create a new serie
  As a administrator of platform
  I want to create a new serie

  Scenario: A valid non existing movie
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
      "name": "action"
    }
    """
    Given I have a valid token
    And I send a PUT request to "/multimedia/series/80d1eec1-aa71-4151-bad9-63e704b01f50" with body:
    """
    {
      "id": "80d1eec1-aa71-4151-bad9-63e704b01f50",
      "category": "action",
      "title": "The Walking Dead",
      "releaseDate": "2010-10-31"
    }
    """
    Then the response status code should be 201

  Scenario: A invalid movie non existing category
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
    And I send a PUT request to "/multimedia/series/80d1eec1-aa71-4151-bad9-63e704b01f50" with body:
    """
    {
      "id": "80d1eec1-aa71-4151-bad9-63e704b01f50",
      "category": "action",
      "title": "The Walking Dead",
      "releaseDate": "2010-10-31"
    }
    """
    Then the response status code should be 404
    And the response content should be:
    """
    {
      "ok": false,
      "error": "Category action not found"
    }
    """


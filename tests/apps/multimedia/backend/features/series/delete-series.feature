Feature: Delete a serie
  In order to have a multimedia in the platform
  As a admin in the platform
  I want to delete a serie

  Scenario: A valid admin deletes a serie
    Given there is the role:
    """
    {
      "id": "050d3d09-0ffc-40a9-bb66-cd9cabae60b6",
      "name": "admin"
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
    And there is the serie:
    """
    {
      "id": "80d1eec1-aa71-4151-bad9-63e704b01f50",
      "category": "action",
      "title": "The Walking Dead",
      "releaseDate": "2010-10-31"
    }
    """
    Given I have a valid token
    When I send a DELETE request to "/multimedia/series/80d1eec1-aa71-4151-bad9-63e704b01f50"
    Then the response status code should be 200

  Scenario: A invalid because serie does not exist
    Given there is the role:
    """
    {
      "id": "050d3d09-0ffc-40a9-bb66-cd9cabae60b6",
      "name": "admin"
    }
    """
    And there is the user:
    """
    {
      "id": "050d3d09-0ffc-40a9-bb66-cd9cabae60b8"
    }
    """
    Given I have a valid token
    When I send a DELETE request to "/multimedia/series/80d1eec1-aa71-4151-bad9-63e704b01f50"
    Then the response status code should be 404

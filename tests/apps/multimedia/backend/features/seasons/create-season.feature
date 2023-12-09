Feature: Create a new season
  As a administrator of platform
  I want to create a new season

  Scenario: A valid non existing season
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
    And I send a PUT request to "/multimedia/seasons/ae3e6724-79e3-410a-8478-ecfd4f517e80" with body:
    """
    {
      "id": "ae3e6724-79e3-410a-8478-ecfd4f517e80",
      "serieId": "80d1eec1-aa71-4151-bad9-63e704b01f50",
      "title": "Season 1",
      "releaseDate": "2010-10-31"
    }
    """
    Then the response status code should be 201

  Scenario: A invalid season non existing serie
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
    And I send a PUT request to "/multimedia/seasons/ae3e6724-79e3-410a-8478-ecfd4f517e80" with body:
    """
    {
      "id": "ae3e6724-79e3-410a-8478-ecfd4f517e80",
      "serieId": "80d1eec1-aa71-4151-bad9-63e704b01f50",
      "title": "Season 1",
      "releaseDate": "2010-10-31"
    }
    """
    Then the response status code should be 404
    And the response content should be:
    """
    {
      "ok": false,
      "error": "Serie with id <80d1eec1-aa71-4151-bad9-63e704b01f50> not found"
    }
    """

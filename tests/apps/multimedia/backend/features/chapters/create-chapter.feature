Feature: Create a new chapter
  As a administrator of platform
  I want to create a new chapter

  Scenario: A valid non existing chapter
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
    And there is the season:
    """
    {
      "id": "bb7f05ae-4469-474f-a5cd-5ac3fe14d657",
      "serieId": "2841a509-4895-48ca-ae61-411b518d4783",
      "title": "Season 1",
      "releaseDate": "1989-12-17"
    }
    """
    Given I have a valid token
    And I send a PUT request to "/multimedia/chapters/72545b03-f5f2-4fc1-81c8-5ed174ac7c4d" with body:
    """
    {
      "id": "72545b03-f5f2-4fc1-81c8-5ed174ac7c4d",
      "seasonId": "bb7f05ae-4469-474f-a5cd-5ac3fe14d657",
      "title": "Simpsons Roasting on an Open Fire",
      "releaseDate": "1989-12-17",
      "url": "https://www.youtube.com/watch?v=2SZ0ywxewZg",
      "duration": 1200
    }
    """
    Then the response status code should be 201

  Scenario: A invalid chapter non existing season
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
    And I send a PUT request to "/multimedia/chapters/72545b03-f5f2-4fc1-81c8-5ed174ac7c4d" with body:
    """
    {
      "id": "72545b03-f5f2-4fc1-81c8-5ed174ac7c4d",
      "seasonId": "bb7f05ae-4469-474f-a5cd-5ac3fe14d657",
      "title": "Simpsons Roasting on an Open Fire",
      "releaseDate": "1989-12-17",
      "url": "https://www.youtube.com/watch?v=2SZ0ywxewZg",
      "duration": 1200
    }
    """
    Then the response status code should be 404
    And the response content should be:
    """
    {
      "ok": false,
      "error": "Season with id <bb7f05ae-4469-474f-a5cd-5ac3fe14d657> not found"
    }
    """

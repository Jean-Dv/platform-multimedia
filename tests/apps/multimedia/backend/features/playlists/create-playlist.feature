Feature: Create a new playlist
  In order to have a multimedia in the platform
  As a user registered in the platform
  I want to create a new playlist

  Scenario: A valid non existing playlist
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
    When I send a PUT request to "/multimedia/playlists/c646297b-ef92-440f-bf8c-c726b0a6809a" with body:
    """
    {
      "id": "c646297b-ef92-440f-bf8c-c726b0a6809a",
      "name": "My favorite playlist",
      "userId": "ff7c4ba6-5fd4-4683-a7a0-e3232d159c97",
      "series": [
        "d8e5f0c4-1b1f-4e5b-8f0e-3c3a4b5b7f1b",
        "d8e5f0c4-1b1f-4e5b-8f0e-3c3a4b5b7f1c"
      ],
      "movies": [
        "1ca4ea9d-eea2-4bb0-a66d-541623d270f4",
        "1ca4ea9d-eea2-4bb0-a66d-541623d270f5"
      ]
    }
    """
    Then the response status code should be 201
    And the response content should be:
    """
    {
      "ok": true
    }
    """


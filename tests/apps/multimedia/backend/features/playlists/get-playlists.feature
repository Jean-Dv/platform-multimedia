Feature: Get a playlist

  Scenario: A valid user get a playlist
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
    And there is the playlist:
    """
    {
      "id": "1ca4ea9d-eea2-4bb0-a66d-541623d270f4",
      "userId": "bc4e85b3-ec12-453e-9982-3e9938d7da5b",
      "name": "My playlist",
      "movies": [
        "20dffe72-b0b4-451f-b43e-3fecc30631f5",
        "4e1c3b0e-3b9e-4a1e-9b6f-6d1b9b5c5f4c"
      ],
      "series": [
        "4e1c3b0e-3b9e-4a1e-9b6f-6d1b9b5c5f4d",
        "d6cf9cbc-0ffd-4b02-ae5e-de2585b0cdfe"
      ]
    }
    """
    Given I have a valid token
    When I send a GET request to "/multimedia/playlists/bc4e85b3-ec12-453e-9982-3e9938d7da5b"
    Then the response status code should be 200
    And the response content should be:
    """
    {
      "ok": true,
      "data": [
        {
          "id": "1ca4ea9d-eea2-4bb0-a66d-541623d270f4",
          "userId": "bc4e85b3-ec12-453e-9982-3e9938d7da5b",
          "name": "My playlist",
          "moviesIds": [
            "20dffe72-b0b4-451f-b43e-3fecc30631f5",
            "4e1c3b0e-3b9e-4a1e-9b6f-6d1b9b5c5f4c"
          ],
          "seriesIds": [
            "4e1c3b0e-3b9e-4a1e-9b6f-6d1b9b5c5f4d",
            "d6cf9cbc-0ffd-4b02-ae5e-de2585b0cdfe"
          ]
        }
      ]
    }
    """

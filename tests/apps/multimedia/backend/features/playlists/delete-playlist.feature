Feature: Delete a playlist
  In order to have a multimedia in the platform
  As a user registered in the platform
  I want to delete a playlist

  Scenario: A valid user deletes a playlist
    Given I have a valid token
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
    When I send a DELETE request to "/multimedia/playlist/1ca4ea9d-eea2-4bb0-a66d-541623d270f4"
    Then the response status code should be 200
    And the response content should be:
    """
    {
      "ok": true
    }
    """

  Scenario: A invalid because playlist does not exist
    Given I have a valid token
    When I send a DELETE request to "/multimedia/playlist/1ca4ea9d-eea2-4bb0-a66d-541623d270f4"
    Then the response status code should be 404

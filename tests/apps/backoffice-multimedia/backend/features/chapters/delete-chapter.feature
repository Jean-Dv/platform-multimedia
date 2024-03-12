Feature: Delete a chapter
  As a administrator, I want to delete a chapter
  In order to remove a chapter from the system
  I want to be able to delete a chapter

  Scenario: A valid existing chapter
    Given there is the chapter:
      """
      {
        "id": "df6001e2-4bd0-4946-8dce-c2d76c377442",
        "title": "C1",
        "releaseYear": 2010,
        "season": "08927e7d-b29a-439d-b00e-38a0b227fe6f",
        "video": "e7ddd6ef-26df-4109-a867-e27eb84a70c8"
      }
      """
    And I send a DELETE request to "/chapters/df6001e2-4bd0-4946-8dce-c2d76c377442"
    Then the response status code should be 200

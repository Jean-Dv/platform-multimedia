Feature: Get by id chapter
  As a user registered with permission
  I want to get a chapter by id with url

  Scenario: Get by id chapter
    Given there is the chapter:
    """
    {
      "id": "72545b03-f5f2-4fc1-81c8-5ed174ac7c4e",
      "seasonId": "bb7f05ae-4469-474f-a5cd-5ac3fe14d657",
      "title": "Bart the Genius",
      "releaseDate": "1990-01-14",
      "url": "https://www.youtube.com/watch?v=2SZ0ywxewZg",
      "duration": 1200
    }
    """
    When I send a GET request to "/multimedia/chapters/72545b03-f5f2-4fc1-81c8-5ed174ac7c4e" with user registered
    Then the response status code should be 200
    And the response content should be:
    """
    {
      "ok": true,
      "data": {
        "chapter": {
          "id": "72545b03-f5f2-4fc1-81c8-5ed174ac7c4e",
          "seasonId": "bb7f05ae-4469-474f-a5cd-5ac3fe14d657",
          "title": "Bart the Genius",
          "releaseDate": "1990-01-14",
          "url": "https://www.youtube.com/watch?v=2SZ0ywxewZg",
          "duration": 1200
        }
      }
    }
    """

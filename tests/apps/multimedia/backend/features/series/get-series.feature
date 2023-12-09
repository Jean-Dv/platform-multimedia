Feature: Get Series
  As a visitor without permissions
  I want to get a list of movies

  Scenario: All existing series
    Given there is the category:
    """
    {
      "id": "2841a509-4895-48ca-ae61-411b518d4781",
      "name": "comedy"
    }
    """
    And there is the category:
    """
    {
      "id": "2841a509-4895-48ca-ae61-411b518d4782",
      "name": "action"
    }
    """
    Given there is the serie:
    """
    {
      "id": "2841a509-4895-48ca-ae61-411b518d4783",
      "category": "action",
      "title": "The Walking Dead",
      "releaseDate": "2010-10-31"
    }
    """
    And there is the serie:
    """
    {
      "id": "2841a509-4895-48ca-ae61-411b518d4784",
      "category": "comedy",
      "title": "The Simpsons",
      "releaseDate": "1989-12-17"
    }
    """
    When I send a GET request to "/multimedia/series"
    Then the response status code should be 200
    And the response content should be:
    """
    {
      "ok": true,
      "data": [
        {
          "id": "2841a509-4895-48ca-ae61-411b518d4784",
          "category": "comedy",
          "title": "The Simpsons",
          "releaseDate": "1989-12-17"
        },
        {
          "id": "2841a509-4895-48ca-ae61-411b518d4783",
          "category": "action",
          "title": "The Walking Dead",
          "releaseDate": "2010-10-31"
        }
      ]
    }
    """

  Scenario: Filter by title
    Given there is the category:
    """
    {
      "id": "2841a509-4895-48ca-ae61-411b518d4781",
      "name": "comedy"
    }
    """
    And there is the category:
    """
    {
      "id": "2841a509-4895-48ca-ae61-411b518d4782",
      "name": "action"
    }
    """
    Given there is the serie:
    """
    {
      "id": "2841a509-4895-48ca-ae61-411b518d4783",
      "category": "action",
      "title": "The Walking Dead",
      "releaseDate": "2010-10-31"
    }
    """
    And there is the serie:
    """
    {
      "id": "2841a509-4895-48ca-ae61-411b518d4784",
      "category": "comedy",
      "title": "The Simpsons",
      "releaseDate": "1989-12-17"
    }
    """
    When I send a GET request to "/multimedia/series?filters[]={'field': 'title', 'operator': '=', 'value': 'The Simpsons'}"
    Then the response status code should be 200
    And the response content should be:
    """
    {
      "ok": true,
      "data": [
        {
          "id": "2841a509-4895-48ca-ae61-411b518d4784",
          "category": "comedy",
          "title": "The Simpsons",
          "releaseDate": "1989-12-17"
        }
      ]
    }
    """

  Scenario: FilterBySpecificId
    Given there is the category:
    """
    {
      "id": "2841a509-4895-48ca-ae61-411b518d4781",
      "name": "comedy"
    }
    """
    Given there is the serie:
    """
    {
      "id": "2841a509-4895-48ca-ae61-411b518d4783",
      "category": "comedy",
      "title": "The Simpsons",
      "releaseDate": "1989-12-17"
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
    And there is the chapter:
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
    And there is the chapter:
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
    When I send a GET request to "/multimedia/series?filters[]={'field': 'id', 'operator': '=', 'value': '2841a509-4895-48ca-ae61-411b518d4783'}"
    Then the response status code should be 200
    And the response content should be:
    """
    {
      "ok": true,
      "data": {
        "id": "2841a509-4895-48ca-ae61-411b518d4783",
        "category": "comedy",
        "title": "The Simpsons",
        "seasons": [
          {
            "id": "bb7f05ae-4469-474f-a5cd-5ac3fe14d657",
            "title": "Season 1",
            "chapters": [
              {
                "id": "72545b03-f5f2-4fc1-81c8-5ed174ac7c4d",
                "title": "Simpsons Roasting on an Open Fire",
                "releaseDate": "1989-12-17",
                "duration": 1200
              },
              {
                "id": "72545b03-f5f2-4fc1-81c8-5ed174ac7c4e",
                "title": "Bart the Genius",
                "releaseDate": "1990-01-14",
                "duration": 1200
              }
            ],
            "releaseDate": "1989-12-17"
          }
        ],
        "releaseDate": "1989-12-17"
      }
    }
    """

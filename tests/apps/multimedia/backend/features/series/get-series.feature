Feature: Get Series
  As a visitor without permissions
  I want to get a list of movies

  Scenario: All existing series
    Given there is the serie:
    """
    {
      "id": "2841a509-4895-48ca-ae61-411b518d4783",
      "title": "The Walking Dead",
      "releaseDate": "2010-10-31"
    }
    """
    And there is the serie:
    """
    {
      "id": "2841a509-4895-48ca-ae61-411b518d4784",
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
          "title": "The Simpsons",
          "releaseDate": "1989-12-17"
        },
        {
          "id": "2841a509-4895-48ca-ae61-411b518d4783",
          "title": "The Walking Dead",
          "releaseDate": "2010-10-31"
        }
      ]
    }
    """

  Scenario: Filter by title
    Given there is the serie:
    """
    {
      "id": "2841a509-4895-48ca-ae61-411b518d4783",
      "title": "The Walking Dead",
      "releaseDate": "2010-10-31"
    }
    """
    And there is the serie:
    """
    {
      "id": "2841a509-4895-48ca-ae61-411b518d4784",
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
          "title": "The Simpsons",
          "releaseDate": "1989-12-17"
        }
      ]
    }
    """

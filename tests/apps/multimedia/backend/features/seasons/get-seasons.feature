Feature: Get Seasons
  As a visitor without permissions
  I want to get a list of seasons

  Scenario: All existing seasons
    Given the following event is received:
    """
    {
      "data": {
        "id": "d88c9a15-9441-45e7-a032-367bc269e6b8",
        "type": "backoffice.multimedia.season.created",
        "occurredOn": "2020-01-01T00:00:00Z",
        "aggregateId": "a198dede-e57a-4747-9b4e-9ee38d8d0432",
        "attributes": {
          "title": "S1",
          "releaseYear": 2010,
          "serie": "08927e7d-b29a-439d-b00e-38a0b227fe6f"
        },
        "meta": {
          "host": "localhost"
        }
      }
    }
    """
    When I send a GET request to "/seasons"
    Then the response status code should be 200
    And the response content should be:
    """
    {
      "ok": true,
      "data": [
        {
          "id": "a198dede-e57a-4747-9b4e-9ee38d8d0432",
          "title": "S1",
          "releaseYear": 2010,
          "serieId": "08927e7d-b29a-439d-b00e-38a0b227fe6f"
        }
      ]
    }
    """
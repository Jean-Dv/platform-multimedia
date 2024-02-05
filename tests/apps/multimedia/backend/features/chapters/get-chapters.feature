Feature: Get Chapters
  As a visitor without permissions
  I want to get a list of chapters

  Scenario: Get chapters
    Given the following event is received:
    """
    {
      "data": {
        "id": "6f10405f-2002-45d2-9df3-c3f73c7829e1",
        "type": "backoffice.multimedia.chapter.created",
        "occurredOn": "2021-07-01T00:00:00Z",
        "aggregateId": "94d96f11-51f5-4256-97cb-083faa0ad3c5",
        "attributes": {
          "title": "C1",
          "releaseYear": 2010,
          "season": "08927e7d-b29a-439d-b00e-38a0b227fe6f",
          "video": "e7ddd6ef-26df-4109-a867-e27eb84a70c8"
        },
        "meta": {
          "host": "localhost"
        }
      }
    }
    """
    When I send a GET request to "/chapters"
    Then the response status code should be 200
    And the response content should be:
    """
    {
      "ok": true,
      "data": [
        {
          "id": "94d96f11-51f5-4256-97cb-083faa0ad3c5",
          "title": "C1",
          "releaseYear": 2010,
          "season": "08927e7d-b29a-439d-b00e-38a0b227fe6f",
          "video": "e7ddd6ef-26df-4109-a867-e27eb84a70c8"
        }
      ]
    }
    """
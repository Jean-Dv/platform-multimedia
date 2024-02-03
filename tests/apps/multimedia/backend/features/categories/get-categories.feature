Feature: Get Categories
  As a user without permissions
  I want to get a list of categories

  Scenario: All existing categories
    Given the following event is received:
    """
    {
      "data": {
        "id": "1ad88f42-556f-4c2c-8052-6dd3c5b1f672",
        "type": "backoffice.category.created",
        "occurredOn": "2020-01-01T00:00:00Z",
        "aggregateId": "d4124abc-8de3-4581-9976-d83e9ee98a54",
        "attributes": {
          "name": "Horror"
        },
        "meta": {
          "host": "localhost"
        }
      }
    }
    """
    Given I send a GET request to "/categories"
    Then the response status code should be 200
    And the response content should be:
    """
    {
      "ok": true,
      "data": [
        {
          "id": "d4124abc-8de3-4581-9976-d83e9ee98a54",
          "name": "Horror"
        }
      ]
    }
    """
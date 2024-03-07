Feature: Get Plans
  As a user without permissions
  I want to get a list of plans

  Scenario: All existing plans
    Given the following event is received:
      """
      {
        "data": {
          "id": "1ad88f42-556f-4c2c-8052-6dd3c5b1f672",
          "type": "backoffice.subscriptions.plan.created",
          "occurredOn": "2020-01-01T00:00:00Z",
          "aggregateId": "d4124abc-8de3-4581-9976-d83e9ee98a54",
          "attributes": {
            "name": "Basic",
            "price": 1000,
            "duration": 30,
            "description": "Basic plan"
          },
          "meta": {
            "host": "localhost"
          }
        }
      }
      """
    Given I send a GET request to "/plans"
    Then the response status code should be 200
    And the response content should be:
      """
      {
        "ok": true,
        "data": [
          {
            "id": "d4124abc-8de3-4581-9976-d83e9ee98a54",
            "name": "Basic",
            "price": 1000,
            "duration": 30,
            "description": "Basic plan"
          },
          {
            "id": "6b2c04d2-859c-4c9f-ae0b-93c76b0054ec",
            "name": "Basic",
            "price": 1000,
            "duration": 30,
            "description": "Basic plan"
          }
        ]
      }
      """
Feature: Delete a season when serie is deleted
  In order to have a multimedia in the platform
  The event bus should delete the season when serie is deleted

  Scenario: Delete a season when serie is deleted
    Given there is the category:
    """
    {
      "id": "050d3d09-0ffc-40a9-bb66-cd9cabae60b9",
      "name": "action"
    }
    """
    And there is the serie:
    """
    {
      "id": "80d1eec1-aa71-4151-bad9-63e704b01f50",
      "category": "action",
      "title": "The Walking Dead",
      "releaseDate": "2010-10-31"
    }
    """
    And the following event is received:
    """
    {
      "data": {
        "id": "a82a803c-7fc9-4281-88a6-89fb4e332ef0",
        "type": "serie.deleted",
        "occurredOn": "2018-09-01T00:00:00.000Z",
        "aggregateId": "80d1eec1-aa71-4151-bad9-63e704b01f50",
        "attributes": {
          "category": "action",
          "title": "The Walking Dead",
          "releaseDate": "2010-10-31"
        },
        "meta": {
          "host": "localhost"
        }
      }
    }
    """

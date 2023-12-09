Feature: Delete a category
  In order to have a multimedia in platform
  As a administrator in the platform
  I want to delete a category

  Scenario: A valid user deletes a category
    Given the following event is received:
    """
    {
      "data": {
        "id": "50a2b4ed-c060-4684-b439-de14bcea1419",
        "type": "role.created",
        "occurredOn": "2019-08-08T08:37:32+00:00",
        "aggregateId": "050d3d09-0ffc-40a9-bb66-cd9cabae60b6",
        "attributes": {
          "name": "admin"
        },
        "meta": {
          "host": "localhost"
        }
      }
    }
    """
    And the following event is received:
    """
    {
      "data": {
        "id": "50a2b4ed-c060-4684-b439-de14bcea1419",
        "type": "role.created",
        "occurredOn": "2019-08-08T08:37:32+00:00",
        "aggregateId": "050d3d09-0ffc-40a9-bb66-cd9cabae60b7",
        "attributes": {
          "name": "registered"
        },
        "meta": {
          "host": "localhost"
        }
      }
    }
    """
    And the following event is received:
    """
    {
      "data": {
        "id": "50a2b4ed-c060-4684-b439-de14bcea1419",
        "type": "user.created",
        "occurredOn": "2019-08-08T08:37:32+00:00",
        "aggregateId": "050d3d09-0ffc-40a9-bb66-cd9cabae60b8",
        "attributes": {
          "roleName": "registered",
          "firstName": "John",
          "lastName": "Doe",
          "email": "jonhdoe1@gmail.com"
        }
      }
    }
    """
    And there is the category:
    """
    {
      "id": "050d3d09-0ffc-40a9-bb66-cd9cabae60b9",
      "name": "Horror"
    }
    """
    Given I have a valid token
    When I send a DELETE request to "/multimedia/categories/050d3d09-0ffc-40a9-bb66-cd9cabae60b9"
    Then the response status code should be 200

  Scenario: A invalid because category does not exist
    Given the following event is received:
    """
    {
      "data": {
        "id": "50a2b4ed-c060-4684-b439-de14bcea1419",
        "type": "role.created",
        "occurredOn": "2019-08-08T08:37:32+00:00",
        "aggregateId": "050d3d09-0ffc-40a9-bb66-cd9cabae60b6",
        "attributes": {
          "name": "admin"
        },
        "meta": {
          "host": "localhost"
        }
      }
    }
    """
    And the following event is received:
    """
    {
      "data": {
        "id": "50a2b4ed-c060-4684-b439-de14bcea1419",
        "type": "role.created",
        "occurredOn": "2019-08-08T08:37:32+00:00",
        "aggregateId": "050d3d09-0ffc-40a9-bb66-cd9cabae60b7",
        "attributes": {
          "name": "registered"
        },
        "meta": {
          "host": "localhost"
        }
      }
    }
    """
    And the following event is received:
    """
    {
      "data": {
        "id": "50a2b4ed-c060-4684-b439-de14bcea1419",
        "type": "user.created",
        "occurredOn": "2019-08-08T08:37:32+00:00",
        "aggregateId": "050d3d09-0ffc-40a9-bb66-cd9cabae60b8",
        "attributes": {
          "roleName": "registered",
          "firstName": "John",
          "lastName": "Doe",
          "email": "jonhdoe1@gmail.com"
        }
      }
    }
    """
    Given I have a valid token
    When I send a DELETE request to "/multimedia/categories/050d3d09-0ffc-40a9-bb66-cd9cabae60b9"
    Then the response status code should be 404

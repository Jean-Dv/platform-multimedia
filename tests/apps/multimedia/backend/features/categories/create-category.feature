Feature: Create a new Category
  As a administrator of platform
  In order to have a multimedia platform
  I want to create a new category

  Scenario: A valid non existing category
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
          "roleName": "admin",
          "firstName": "John",
          "lastName": "Doe",
          "email": "jonhdoe1@gmail.com"
        }
      }
    }
    """
    Given I have a valid token
    Given I send a PUT request to "/multimedia/categories/6031bba8-ee09-492e-8d3b-740f63b200ae" with body:
    """
    {
      "id": "6031bba8-ee09-492e-8d3b-740f63b200ae",
      "name": "Horror"
    }
    """
    Then the response status code should be 201

  Scenario: A invalid with name category exceeded
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
          "roleName": "admin",
          "firstName": "John",
          "lastName": "Doe",
          "email": "jonhdoe1@gmail.com"
        }
      }
    }
    """
    Given I have a valid token
    Given I send a PUT request to "/multimedia/categories/6031bba8-ee09-492e-8d3b-740f63b200ae" with body:
    """
    {
      "id": "6031bba8-ee09-492e-8d3b-740f63b200ae",
      "name": "Horror is very long name for category, please you can replace"
      }
    """
    Then the response status code should be 422

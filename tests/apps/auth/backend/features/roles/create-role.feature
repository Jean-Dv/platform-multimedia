Feature: Create a new role
  In order to haves roles in the platform
  I want to create a new role

  Scenario: A valid non existing role
    Given I send a PUT request to "/auth/roles/b29539c4-171f-42b3-be93-facb95c4f66a" with body:
    """
    {
      "id": "b29539c4-171f-42b3-be93-facb95c4f66a",
      "name": "admin"
    }
    """
    Then the response status code should be 201

  Scenario: A invalid non existing role
    Given I send a PUT request to "/auth/roles/b29539c4-171f-42b3-be93-facb95c4f66a" with body:
    """
    {
      "id": "b29539c4-171f-42b3-be93-facb95c4f66a",
      "name": "test"
    }
    """
    Then the response status code should be 422

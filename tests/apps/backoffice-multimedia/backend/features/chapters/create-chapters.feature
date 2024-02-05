Feature: Create a new chapter
  As a administrator, I want to create a new chapter
  In order to have a backoffice multimedia platform
  I want to create a new chapter

  Scenario: A valid non existing serie
    Given there is the season:
      """
      {
        "id": "08927e7d-b29a-439d-b00e-38a0b227fe6f",
        "title": "S1",
        "releaseYear": 2010,
        "serie": "08927e7d-b29a-439d-b00e-38a0b227fe6f"
      }
      """
    And I send a PUT request to "/chapters" with body:
      """
      {
        "id": "94d96f11-51f5-4256-97cb-083faa0ad3c5",
        "title": "C1",
        "releaseYear": 2010,
        "season": {
          "id": "08927e7d-b29a-439d-b00e-38a0b227fe6f"
        },
        "video": {
          "id": "e7ddd6ef-26df-4109-a867-e27eb84a70c8"
        }
      }
      """
    Then the response status code should be 201

  Scenario: A invalid non existing serie, title exceeded
    Given there is the season:
      """
      {
        "id": "08927e7d-b29a-439d-b00e-38a0b227fe6f",
        "title": "S1",
        "releaseYear": 2010,
        "serie": "08927e7d-b29a-439d-b00e-38a0b227fe6f"
      }
      """
    And I send a PUT request to "/chapters" with body:
      """
      {
        "id": "94d96f11-51f5-4256-97cb-083faa0ad3c5",
        "title": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.",
        "releaseYear": 2010,
        "season": {
          "id": "08927e7d-b29a-439d-b00e-38a0b227fe6f"
        },
        "video": {
          "id": "e7ddd6ef-26df-4109-a867-e27eb84a70c8"
        }
      }
      """
    Then the response status code should be 400

  Scenario: A invalid non existing serie, release year is negative
    Given there is the season:
      """
      {
        "id": "08927e7d-b29a-439d-b00e-38a0b227fe6f",
        "title": "S1",
        "releaseYear": 2010,
        "serie": "08927e7d-b29a-439d-b00e-38a0b227fe6f"
      }
      """
    And I send a PUT request to "/chapters" with body:
      """
      {
        "id": "94d96f11-51f5-4256-97cb-083faa0ad3c5",
        "title": "C1",
        "releaseYear": -1,
        "season": {
          "id": "08927e7d-b29a-439d-b00e-38a0b227fe6f"
        },
        "video": {
          "id": "e7ddd6ef-26df-4109-a867-e27eb84a70c8"
        }
      }
      """
    Then the response status code should be 400

  Scenario: A invalid non existing serie, season not found
    And I send a PUT request to "/chapters" with body:
      """
      {
        "id": "94d96f11-51f5-4256-97cb-083faa0ad3c5",
        "title": "C1",
        "releaseYear": 2010,
        "season": {
          "id": "08927e7d-b29a-439d-b00e-38a0b227fe6f"
        },
        "video": {
          "id": "e7ddd6ef-26df-4109-a867-e27eb84a70c8"
        }
      }
      """
    Then the response status code should be 404
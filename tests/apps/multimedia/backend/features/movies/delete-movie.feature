Feature: Delete a movie
  In order to have a multimedia in the platform
  As a admin in the platform
  I want to delete a movie

  Scenario: A valid admin deletes a movie
    Given there is the role:
    """
    {
      "id": "050d3d09-0ffc-40a9-bb66-cd9cabae60b6",
      "name": "admin"
    }
    """
    And there is the user:
    """
    {
      "id": "050d3d09-0ffc-40a9-bb66-cd9cabae60b8"
    }
    """
    And there is the category:
    """
    {
      "id": "2f728ac4-8849-4e82-a184-0dab8e101a27",
      "name": "Action"
    }
    """
    And there is the movie:
    """
    {
      "id": "2f728ac4-8849-4e82-a184-0dab8e101a28",
      "category": "Action",
      "title": "The Matrix",
      "releaseDate": "1999-05-21",
      "url": "https://www.youtube.com/watch?v=m8e-FF8MsqU",
      "duration": 8160
    }
    """
    Given I have a valid token
    When I send a DELETE request to "/multimedia/movies/2f728ac4-8849-4e82-a184-0dab8e101a28"
    Then the response status code should be 200

  Scenario: A invalid because movie does not exist
    Given there is the role:
    """
    {
      "id": "050d3d09-0ffc-40a9-bb66-cd9cabae60b6",
      "name": "admin"
    }
    """
    And there is the user:
    """
    {
      "id": "050d3d09-0ffc-40a9-bb66-cd9cabae60b8"
    }
    """
    Given I have a valid token
    When I send a DELETE request to "/multimedia/movies/2f728ac4-8849-4e82-a184-0dab8e101a28"
    Then the response status code should be 404

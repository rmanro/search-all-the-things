Search All The Things
===

Use webpack and react to create an app that allows a user to search an API.

## Choose an API

Possible API choices:
* http://www.omdbapi.com/
* https://developers.google.com/books/
* https://pokeapi.co/api/v2/
* https://swapi.co/

API Requirements:
* Has to support CORS (search from AJAX call)
* Supports searching and paging
* Would be best for tomorrow's lab if it support a detail view of the items returned from search

## App Requirements

1. Prompt the user on initial load to enter criteria
    - aka not searched is different than nothing found
1. Allow the user to search on one or more criteria
    - **Bonus!** for criteria condition that comes from the API!
1. Call the API and display a loading indicator
1. Present the search results and clear the loading indicator
1. Display the Search Terms used and total count of results as well as "page of pages"
    - Account for "page size". Does not have to be user settable.
1. Show Paging Controls
    - Previous and Next
    - Disable when not possible
    - **Bonus!** Render specific page numbers around current range
    
## Development Requirements

1. Standard project setup (config, package.json, etc.)
1. Include `.travis.yml` and script:
    ```json
    "lint": "eslint .",
    "pretest": "npm run lint",
    "test": "echo \"Testing coming tomorrow!\" && exit 0"
    ```
1. Organize 
    - components into separate files
    - css by component
1. Components
    - Lift state
    - Data down, events up
1. Keep code clean

## Rubric

* Follow component architecture guidelines **4pts**
* Functionality and Usability to Requirements **3pts**
* Clean code and project organization **3pts**

# Presentation Platform

## Overview

This project provides a RESTful API for managing presentations and their slides. The API allows you to create, fetch, update, and delete presentations and slides, with support for handling slide ordering and updating specific slide fields. The application uses MongoDB for data storage and Mongoose for object modeling.

## Features

- **Create a New Presentation**: Add a new presentation with a title, authors, publish date, and initial slides.
- **Fetch a Presentation by Title**: Retrieve a presentation using its unique title.
- **Add a Slide to a Presentation**: Insert a new slide into an existing presentation.
- **Alter a Slide**: Update specific fields of a slide and manage slide order.
- **Alter the Authors List**: Update the list of authors for a presentation.
- **Delete a Slide**: Remove a slide from a presentation based on its order.
- **Delete a Presentation**: Completely remove a presentation and its slides.
- **Get All Presentations**: Retrieve a list of all presentations.

## Endpoints

### Create a New Presentation

- **Endpoint**: "POST /api/presentations"
- **Request Body**:
  ```json
  {
    "title": "Presentation Title",
    "authors": ["Author1", "Author2"],
    "publishDate": "YYYY-MM-DD",
    "slides": [
      {
        "title": "Slide Title",
        "order": 1,
        "content": "Slide content"
      }
    ]
  }

  
- **Response**: Returns the presentation object if found; otherwise, a 404 error.

### Fetch a Presentation by Title

- **Endpoint**: "GET /api/presentations/:title"


- **Response**: Returns the presentation object if found; otherwise, a 404 error.


### Add a Slide to a Presentation

- **Endpoint**: "POST /api/presentations/:title/slides"

- **Request Body**
  ```json
  {
  "title": "Slide Title",
  "order": 1,
  "content": "Slide content"
  }


- **Response**:Returns the updated presentation with the new slide.


### Alter a Slide

- **Endpoint**: "PUT /api/presentations/:title/slides/:order"

- **Request Body**
  ```json
  {
  "title": "Updated Slide Title",
  "content": "Updated slide content",
  "order": 1
  }


- **Response**: Returns the updated presentation with the altered slide.


  ### Alter the Authors List

- **Endpoint**: "PUT /api/presentations/:title/authors"

- **Request Body**
  ```json
  {
  "authors": ["New Author1", "New Author2"]
  }


- **Response**: Returns the updated presentation with the new authors list.


### Delete a Slide

- **Endpoint**: "DELETE /api/presentations/:title/slides/:order"


- **Response**: Returns the updated presentation without the deleted slide.


### Delete a Presentation

- **Endpoint**: "DELETE /api/presentations/:title"


- **Response**: Returns the deleted presentation object.


### Get All Presentations 

 - **Endpoint**: "GET /api/presentations"

 - **Response**: Returns an array of all presentation objects.  


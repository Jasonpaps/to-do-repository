# Todo API

## Overview

The Todo API is a Node.js application built with Express and MongoDB. It provides a platform for managing todos and generating smart schedules based on todo attributes and dependencies. The application supports WebSocket for real-time updates and uses Swagger for API documentation.

## Smart-schedule logic

Smart-scheduling considers all todo tasks that are currently incomplete. The order of the tasks is depending

- **Deadline**: Tasks that have earlier deadlines, are prioritised
- **Importance**: Each task has a grade of importance. More important tasks are prioritised.
- **Estimated Time**: Finally, tasks that take less time are prioritised.

The metrics are considered in the following order: **Deadline** > **Importance** > **Estimated Time**. Additionally, if a task has dependencies but is first in the order, then its dependencies are prioritized first.

## Features

- **CRUD Operations for Todos**: Create, read, update, and delete todo items.
- **Smart Scheduling**: Generate a schedule for incomplete todos considering deadlines, importance, and estimated time.
- **Real-Time Updates**: Broadcast changes to todos using WebSocket.
- **API Documentation**: Interactive API documentation with Swagger.

## Installation

### Prerequisites

- Node.js
- MongoDB
- npm

### Steps

1. **Clone the Repository**

   ```bash
   git clone https://github.com/Jasonpaps/to-do-repository.git
   cd to-do-repository
   ```

2. **Install Dependencies**

   ```base
   npm install
   ```

3. **Run the Application**
   ```base
   npm start
   ```

## API Endpoints

### Todos

- **GET /todos**  
  Retrieve all todos.

- **POST /todos**  
  Create a new todo.

- **GET /todos/:id**  
  Retrieve a todo by ID.

- **PATCH /todos/:id**  
  Update a todo by ID.

- **DELETE /todos/:id**  
  Delete a todo by ID.

### Utils

- **GET /utils/smart-schedule**  
  Generate a smart schedule for incomplete todos.

### Users

- **POST /users/register**  
  Create a new user.

- **POST /users/login**  
  Retrieve a JWT token with user credentials.

### Swagger

- **GET /api**  
  Access Swagger documentation for detailed analysis of all API endpoints.


## API Documentation

The API endpoints can be explored in detail using Swagger. You can access the interactive API documentation at `/api`. Swagger provides a comprehensive interface for testing the endpoints and viewing their request and response formats.

## Test
To run the tests for this application, use the following command:

```bash
npm test
```
The tests are set up with Jest, and the test suite includes unit tests for the API endpoints of todos, users and utils.

## Notes
- **.env File**: The `.env` file is included in the repository for convenience, allowing users to run the project immediately after downloading. In a production environment, this file would typically be included in the `.gitignore` to prevent it from being tracked by version control. Environment variables should be securely managed and stored in the hosting environment instead.
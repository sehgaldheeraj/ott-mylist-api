# My List API

## Introduction
My List API is a backend service built with Node.js, Express, TypeScript, and MongoDB, designed to manage a list of items. The API supports CRUD operations and includes integration with Redis for caching to optimize performance.

## Setup Instructions

### Prerequisites
- Node.js (v20.9.0 or later)
- npm (v10.1.0 or later)
- MongoDB
- Redis
- Heroku CLI (for deployment on Heroku)

### Clone the Repository
```bash
git clone https://github.com/sehgaldheeraj/ott-mylist-api.git
cd my-list-api
```
### Install Dependencies
```bash
npm install
```
### Configure Environment Variables
Create a `.env` file in the root directory of the project and add the following environment variables:

```makefile
MONGODB_URI=<your-mongodb-uri>
REDIS_HOST=<your-redis-host>
REDIS_PORT=<your-redis-port>
REDIS_PASSWORD=<your-redis-password> # if applicable
PORT=3000
```
### Compile TypeScript
```bash
npm run build
```
## Running the Application

### In Development Mode
To run the application in development mode with hot reloading:
```bash
npm run dev
```
The server will start on http://localhost:3000.

### In Production Mode
To run the application in production mode:
```bash
npm start
```
This will start the compiled JavaScript files from the `dist` directory.

## Running Tests
To run the tests, use the following command:
```bash
npm test
```
This will run the integration tests using Jest.

## Deployment
### Deploying to Heroku

1. **Login to Heroku:**
heroku login

2. **Create a new Heroku app:**
heroku create your-app-name

3. **Set environment variables on Heroku:**
heroku config:set MONGODB_URI=<your-mongodb-uri>
heroku config:set REDIS_HOST=<your-redis-host>
heroku config:set REDIS_PORT=<your-redis-port>
heroku config:set REDIS_PASSWORD=<your-redis-password> # if applicable

4. **Deploy to Heroku:**
git push heroku main

5. **Open your deployed app:**
heroku open

## Seed Data
Seed sample data into the database using the following query on terminal.
In case the typescript has been complied
```bash
node dist/seedData.ts
```
otherwise
```bash
ts-node dist/seedData.ts
```

## APIs Guide
Now manage all the CRUD operations with these three simple APIs

### Create a Task
- **Method:** `POST`
- **Endpoint:** `/api/mylist`
- **Description:** Adds a new movie/tv show.
- **Request Body:**
  ```json
  {
      "userId": "userId123",
      "contentId": "contentId457",
      "contentType": "TVShow"
  }
- *Response:* Returns a success message and a new entry into the list.

### Get All Content
- **Method:** `GET`
- **Endpoint:** `/api/mylist/:userId?page={page}$limit={limit}`
- **Description:** Gets paginated content present in DB.
- *Response:*  Returns an array of paginated content.


### Delete a Task
- **Method:** `DELETE`
- **Endpoint:** `/api/mylist/:userId/:contentId`
- **Description:** Deletes a task based on userId and contentId.
- *Response:* Returns a success message on a successful deletion.
  


## Design Choices

### Performance Optimization
1. **Caching with Redis:** To minimize the load on the MongoDB database and reduce response times, the API caches frequently accessed data in Redis. This is especially useful for read-heavy endpoints.
2. **Efficient Indexing:** MongoDB collections are indexed on commonly queried fields to speed up read operations.
3. **Paginated Queries** Queries are paginated so that alot of entries don't become a heavy load upon fetches.

### Scalability
1. **Modular Code Structure:** The code is organized into modules with clear separation of concerns, making it easy to scale and maintain.
2. **Stateless API:** The API is stateless, which means it can be easily scaled horizontally by adding more instances.

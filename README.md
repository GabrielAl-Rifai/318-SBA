# Texas Rock Climbs API

This API allows users to manage rock climbing information in Texas, including adding, updating, and deleting climbs, as well as rating their difficulty.

![alt text](<App Images/TX Rock Climbs.png>)

## Installation

1. Clone this repository:
   git clone https://github.com/GabrielAl-Rifai/318-SBA.git

2. Navigate to the project directory:
   cd your-repository

3. Install dependencies:
   npm install

4. Start the server:
   node server.js

## Usage

Endpoints
GET /api/climbs: Retrieve information about climbs.
POST /api/climbs: Add a new climb.
GET /api/users: Retrieve information about users.
POST /api/users: Add a new user.
GET /api/rating: Retrieve ratings of climbs.
POST /api/rating: Add or update a rating for a climb.

## Example

curl -X GET http://localhost:3000/api/climbs

## Response

{
"climbs": [
{
"id": 1,
"name": "Climb Name",
"location": "Location Name",
"difficulty": "5.10",
"description": "Description of the climb"
},
{
"id": 2,
"name": "Another Climb",
"location": "Another Location",
"difficulty": "5.8",
"description": "Description of another climb"
}
]
}

## Middleware and Error Handling

Body Parser: Middleware for parsing incoming request bodies.
Error Handling: Error handling middleware is implemented in the server.js file.

```bash

```

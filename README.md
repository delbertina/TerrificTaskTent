# Terrific Task Tent

Here's my submission for the coding challenge. I made sure to adhear to the 2 hour time limit so please excuse the many corners cut for the sake of time. 

## How to Run

Given more time, I would have setup a docker file to ensure the project runs on any machine that can run docker.

These instructions assume that the user's computer has a recent version of npm installed on their machine as well as an active internet connection.

First, copy the `.example.env` file and rename to `.env` and fill in with the correct username, password, and database name. Ensure the PostgreSQL is running before continuing.

Next, navigate inside each the front and back folders and install the dependencies.

`npm i`

Then navigate to the root of the project & run each of the following commands in their own terminal.

`npm run start:front`
`npm run start:back`

The frontend will be running on port 8001 and the backend will be running on port 8000. Navigate to localhost:8001 in a web browser to view the project.
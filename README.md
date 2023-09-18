# Reverb

Reverb is a social platform for sharing your thoughts on music, connecting with other melophiles, and discovering music through critics you love. The application is currently in development, but can be run locally.

## Set Up

1. Download and unzip the repository.
2. Log into Spotify and navigate to the [Spotify Developer Dashboard](https://developer.spotify.com/dashboard). Then, click 'Create app' and fill in the necessary information. Set the redirect URI as (http://localhost:3000).
3. Make sure that you have [Node.js](https://nodejs.org/en/download/current) installed. Then, in both the `api/` and the `client/` directories, run the following command to install the necessary dependencies:
    ```$ npm install```
4. Make sure that you have [PostgreSQL](https://www.postgresql.org/download/) installed. In the directory in which PostgreSQL has been installed, run the following commands to start the database server in the background and create a PostgreSQL database for the project:
    ```
    $ pg_ctl -D datadir initdb
    $ pg_ctl start -D datadir -l logfile
    $ createuser -U postgres -P username
    $ createdb -U postgres -O username reverb
    ```
5. Modify the necessary information in `api/.env.template` and rename the file from `.env.template` to `.env`.
6. In both the `api/` and the client directories, run the following command to start the Express back-end at (http://localhost:3001) and the Next.js front-end at (http://localhost:3000) in development mode:
    ```$ npm run dev```
7. Navigate to (http://localhost:3000) to see the application in action.

## Current and Future Features

Reverb currently provides basic information on users, artists, and albums. It allows users to see and submit reviews on albums, and to see reviews by users they follow on their dashboards.

In future iterations, there will be functionality for searching up and obtaining more in-depth information on users, such as their listening history. Significant UI improvement is also in the works.

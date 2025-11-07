# Symfero

This project is a communication web platform, currently under development. The structure of this repo is based on client-server model, clearly separated front from back. The backend is an API ExpressJS server (referred to as server from now on) which handles connection to the database. The frontend is a bare React app (referred to as client from now on). built into a static site using vite.

The server is hardcoded to allow requests only from a single origin, the client app. The reason for using a server insted of directly accessing the database from the client is because vite doesn't support secrets (env vars as secrets), and also for a clearer separation of the processes.

## Build and host locally
To deploy the app locally, you need to start both the client and the server, after configuring the .env for both

### Server
Create a file ```./server/.env``` and set the following variables
```.env
SERVER_HOSTNAME=localhost
SERVER_PORT=3000
CLIENT_HOSTNAME=localhost
CLIENT_PORT=5173
SUPABASE_URL=<YOUR_SUPABASE_URL>
SUPABASE_ANON_KEY=<YOUR_SUPABASE_ANON_KEY>
```
Server and client hosts and ports can be set to any value, but keep in mind that they need to be consistent, or the client wont be able to access the server.
The supabase url and key are required to access the database, I'll provide the table layouts later. Also, you can configure the project to use some other database or method of storage.

To run the server:
```bash
cd server
npm run start
```

### Client
You can use the client as a dev server, or build it with vite and preview locally.
The client also needs a ```./client/.env``` file with the url of the server
```
VITE_SERVER_API='http://localhost:3000'
```
Notice that you have to specify the port if other than ```:80``` or the cors wont work.
Then run:
```bash
cd client
npm run dev
```
or:
```bash
cd client
npm run build
npm run preview
```
Also, when running preview, you need to hardcode the port used in the dev server, because vite assigns a different port when running vite preview. Put the correct port in the package.json
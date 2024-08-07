# Pokemon App

## Description
This app allows users to create Pokémon users, create Pokémon, and interact with the Pokémon by specifying their position, speed, abilities, and direction.

## Technologies Used
- **Frontend:** React, JavaScript, CSS, react-toast
- **Backend:** Node.js, Express

## Features
- Create Pokémon users
- Create Pokémon for each user
- Play with Pokémon by setting their initial position, speed, abilities, and direction

## Prerequisites
- Node.js

## Installation
There are two folders in the same repository: `client` and `server`.

1. Clone the repository:
    ```sh
    git clone https://github.com/msubham193/pokemon-assignment.git
    ```

2. Install the necessary packages:

    - For the client:
        ```sh
        cd client
        npm install
        ```

    - For the server:
        ```sh
        cd server
        npm install
        ```

## Running the Application

1. Start the client:
    ```sh
    cd client
    npm run dev
    ```

2. Start the server:
    ```sh
    cd server
    npm run dev
    ```

## Live Deployment
- **Frontend on Vercel:** [https://pokemon-assignment-front-end.vercel.app/](https://pokemon-assignment-front-end.vercel.app/)
- **Backend on Render:** [https://pokemon-assignment-3qim.onrender.com/](https://pokemon-assignment-3qim.onrender.com/)

---

## Client

### Code Structure

- **`src/components`**: Contains React components.
- **`src/App.js`**: Main entry point for the React app.
- **`src/index.js`**: Entry point for rendering the React app.
- **`src/styles`**: Contains CSS files for styling.

### Main Components

- **AddPokemon**: Component for adding or updating Pokémon.
- **PokemonPopup**: Component for selecting a Pokémon to edit.

### Explanation

1. **AddPokemon Component**:
    - Uses React hooks (`useState`, `useEffect`) for managing state and lifecycle.
    - Fetches Pokémon data from the backend for updating.
    - Fetches available Pokémon names and abilities.
    - Handles form submission to create or update Pokémon.

2. **PokemonPopup Component**:
    - Displays a list of Pokémon for the user to select and edit.
    - Triggers the selection and closing actions through props.

---

## Server

### Code Structure

- **`src/app.js`**: Main entry point for the Express server.
- **`src/routes`**: Contains route definitions.
- **`src/services`**: Conatins Pokemon Api services like fetching the names and abilities and file reading and writing operation.
- **`src/data`**: Conatins Json data of pokemon user and their respective pokemons.


### Main Routes

- **`/api/pokemon`**: Base route for Pokémon-related actions.
- **`/api/pokemon/users/:userId`**: Route for creating Pokémon for a user.
- **`/api/pokemon/users/:userId/:pokemonId`**: Route for updating or fetching specific Pokémon details.

### Explanation

1. **app.js**:
    - Sets up the Express server.
    - Defines routes for the API.

2. **Routes**:
    - The routes handle creating, updating, and fetching Pokémon and their abilities.

---


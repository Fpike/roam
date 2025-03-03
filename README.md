# Scroll down for instructions on how to set up on local machine

# Roam 

This MERN stack web app lets users build travel profiles, document trips with country-based blogs, and showcase their travel styles and visited destinations. It features secure user authentication with JWT, a dynamic blog editor, and an interactive favorites system for quick access to preferred locations. Using React hooks, structured MongoDB data models, and custom CSS with Bootstrap, the app delivers a responsive, visually engaging experience without external UI libraries.

Homepage Interface

<img src="./homepage.png" width="75%" />

Signup Page for New Users

<img src="./signup.png" width="75%" />

Profile Setup: Select Travel Personalities and Countries Visited

<img src="./profilebuild.png" width="75%" />

Profile Setup: Personal Introduction with a Short Blurb

<img src="./profilebuild2.png" width="75%" />

User Dashboard: Displaying Profile Information Sourced from Database

<img src="./dashboard.png" width="75%" />

Create a New Blog: Users Can Build Country-Specific Blog Pages

<img src="./newblog.png" width="75%" />


# Setup
Step 1: Clone the repo

Step 2: Install mongodb:
```
brew tap mongodb/brew
brew update
brew install mongodb-community@8.0
```

Step 3: Run mongodb:
`brew services start mongodb-community@8.0`
^ you can swap `start` for `stop` to stop mongodb

Step 4: 
- go to the server directory with `cd server`
- then run `npm install`

Step 5:
- While still in the server directory, create `.env` with `touch .env`
- This file needs the following contents:
```
MONGODB_URL="mongodb://0.0.0.0/roam"
PORT = 9000
NODE_ENV="development"
JWT_SECRET="secret"
``` 
^so we can write code that only runs if process.env.NODE_ENV is 'development', etc. and JWT_SECRET relates to tokens

Step 5:
- navigate to the client directory (if you're in server, run `cd ../client`)
- then run `npm install`

Step 6:
- While still in the client directory, create `.env`
- Then add the following contents to `.env`:
```
VITE_BACKEND_URL="http://localhost:9000"
```

# Running the program:
- In one terminal window, navigate to `/server`
- Then run `npm run dev`

- Then, in another terminal window, navigate to `/client`
- Then run `npm run dev`

# Testing the program:
**Backend**:
- Under `/server`, create a file `.env.test`
- Then add the following contents to this file:
```
MONGODB_URL="mongodb://0.0.0.0/roam"
```
(this should ensure your tests use a separate test database)

- In your terminal, navigate to `/server`
- Then run `npm test` to run backend tests.
- For a coverage report, run `npm test -- --coverage`

**Frontend**:
In your terminal, navi-gate to `/client`
Then run `npm test` to run frontend tests.

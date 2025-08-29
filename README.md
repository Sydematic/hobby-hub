# Hobby Hub Project

# Hobby-Hub: First-Time User Walkthrough

Welcome to **Hobby-Hub**, your interactive hub for food, fitness, and travel! Here’s what a new user experiences when exploring the site:

---

## 1. Get Started Button On Home Page
As soon as you arrive, you’re greeted with a clean, welcoming interface.
<p align="center">
  <img src="/Screenshots/homepage.png" alt="Home Screenshot 1" width="45%"/>
  <img src="/Screenshots/getstarted.png" alt="Home Screenshot 2" width="45%"/>
  <img src="/Screenshots/startyourjourney.png" alt="Contact Screenshot" width="45%"/>
  <img src="/Screenshots/signup.png" alt="Signup Screenshot" width="45%"/>
  <img src="/Screenshots/login.png" alt="Login Screenshot" width="45%"/>
</p>

- **Access:** In order to review more food, travel, and workouts, you must sign up or log in if already registered. You must sign up with a real life email. Create a backup email address if you don't feel comfortable using your real one. To see the process of the signup I recommend this process mentioned prior. If not, use this: `sp184218@gmail.com` and an easy PW to gain access: `sydematic123!`.  
  As this is still a working process, if you decide to use your own credentials the confirmation link you receive will not work, but the system saved your information. So if you go back to the website and log in with the correct password then you are successfully in!  
- **Guest vs. User:** Once a successful login, you will be redirected either to the main page or the page you last looked at when trying to access the food, travel, and workout logs.  
- **Purpose:** Gives users a chance to have their own personal organized log system for their hobbies.

---

## 2. Home Page
- **Navigation:** Clear links to Food, Workouts, and Travel pages.  
- **Animations:** Smooth transitions and interactive UI elements guide your attention.  
- **Purpose:** Gives a quick overview of what you can explore and where to start.

<p align="center">
  <img src="/Screenshots/homepage.png" alt="Home" width="45%"/>
  <img src="/Screenshots/homepage2.png" alt="Home 2" width="45%"/>
  <img src="/Screenshots/homepage3.png" alt="Home 3" width="45%"/>
</p>

---

## 3. Food Page
Discover meals and get inspired in the kitchen.

- **Explore Meals:** Browse a dynamic list of meals fetched from the MealDB API.  
- **Meal Details:** Click any meal card to open a modal with full instructions, ingredients, and images.  
- **Interactive Search:** Quickly find meals by name, category, or cuisine type.  
- **Purpose:** Makes meal discovery fun and effortless.

<p align="center">
  <img src="/Screenshots/mainfoodpage.png" alt="Food Main" width="45%"/>
  <img src="/Screenshots/addrecipe.png" alt="Add Recipe" width="45%"/>
</p>

---

## 3a. Recipes Page
Your personal recipe manager.

- **View Recipes:** See all recipes you’ve created or saved, listed with the most recent first.  
- **Add Recipes:** Enter title, description, category, area, instructions, and image for new recipes.  
- **Delete Recipes:** Remove recipes you no longer want.  
- **Purpose:** Keep all your favorite recipes organized in one place.

<p align="center">
  <img src="/Screenshots/myrecipepage.png" alt="Recipes" width="45%"/>
  <img src="/Screenshots/addcustomrecipe.png" alt="Add Custom Recipe" width="45%"/>
  <img src="/Screenshots/saveapirecipenotification.png" alt="Save API Recipe Notification" width="45%"/>
  <img src="/Screenshots/customrecipenotification.png" alt="Custom Recipe Notification" width="45%"/>
  <img src="/Screenshots/mysavedrecipes1.png" alt="My Saved Recipes 1" width="45%"/>
  <img src="/Screenshots/mysavedrecipes2.png" alt="My Saved Recipes 2" width="45%"/>
  <img src="/Screenshots/removesavedrecipe.png" alt="Remove Saved Recipe" width="45%"/>
</p>

---

## 4. Travel Page
Discover exciting destinations, tips, and the best travel deals around the world. 

- **Click See More:** Each card is still in a working process but gives nice pictures and friendly travel advice tips.

<p align="center">
  <img src="/Screenshots/maintravelpage.png" alt="Travel Main" width="45%"/>
  <img src="/Screenshots/travelpage2.png" alt="Travel Page 2" width="45%"/>
</p>

---

## 5. Workout Page and Log Page
Explore fitness exercises tailored to different needs.

- **Browse Exercises:** Each card shows exercise name, target muscle, body part, equipment, and a GIF demonstration.  
- **Filter Options:** Sort by body part or equipment to find exactly what you need.  
- **Purpose:** Provides visual guidance for exercises and helps plan your workouts efficiently.

<p align="center">
  <img src="/Screenshots/mainworkoutpage.png" alt="Workout Main" width="45%"/>
  <img src="/Screenshots/logworkout.png" alt="Log Workout" width="45%"/>
  <img src="/Screenshots/workoutpage.png" alt="Workout Page" width="45%"/>
  <img src="/Screenshots/workoutpage2.png" alt="Workout Page 2" width="45%"/>
</p>

---


## 5. External API Integration
Hobby-Hub isn’t just static—it connects to live data for dynamic content.

- **MealDB API:** Real-time meal information for the Food page.  
- **ExerciseDB API:** Exercise demonstrations and details for the Workouts page.  
- **Purpose:** Ensures content is up-to-date and interactive, giving users a lively experience.

---

## Overall User Experience

- **Interactive & Responsive:** Works seamlessly on both desktop and mobile.  
- **Frontend:** Smooth animations, modals, and filtering make the site feel modern and engaging.  
- **Backend:** All recipe management functions are powered by Node.js, Express, Prisma, and Neon/Supabase authentication for secure, personalized experiences.  
- **Goal:** Hobby-Hub is your all-in-one hub for exploring meals, managing recipes, and discovering exercises in an intuitive, interactive environment.


**Full-stack web application for Hobby Hub**  
Created for the IF '25 Friendly Competition.

---


## Features
- User authentication
- Browse and save recipes from external APIs
- Add and manage custom recipes
- Search functionality for meals
- Track workouts with exercise database
- Travel destination suggestions
- Responsive design for desktop and mobile
- Modals for recipe management

---

## Technologies
- **Frontend:** React, Tailwind CSS, Vite, React Router, React Query, Framer Motion, Javascript
- **Backend:** Node.js, Express, MongoDB, Mongoose, JWT, Axios
- **Authentication:** Supabase & Neon
- **Deployment:** Netlify/Render (frontend), Render/Railway (backend)
- **Others:** dotenv, bcrypt, lucide-react, react-toastify

---

## Installation

### Backend
```bash
cd backend
npm install
### Frontend
cd frontend
npm install
npm run dev

## Usage

Start the backend server locally.

Start the frontend development server locally.

Open http://localhost:5173 in your browser to interact with the app.

Sign up or log in to access features like saving recipes and tracking workouts.

⚠️ Note: This project is currently running locally only; it is not deployed on Netlify, Render, or any other hosting platform.

** -Syd, Mari, Rafiq **




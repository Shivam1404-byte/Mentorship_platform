# Mentorship Platform Backend

## Overview

This project is a simplified backend system for a mentorship platform where **parents**, **students**, and **mentors** interact.

The system allows:

* Parents to create student profiles
* Mentors to create lessons
* Parents to book sessions for students

The project demonstrates API design, authentication, relational data modeling, and booking logic.

---

## Features

* Authentication (Parent / Mentor)
* Parent can create Students
* Mentor can create Lessons
* Parent can book sessions
* Role based access control
* Centralized error handling

---

## Tech Stack

* Node.js
* Express
* TypeScript
* Prisma ORM
* PostgreSQL
* JWT Authentication

---


## System Design

Entities and relationships:

Parent → creates → Students  
Mentor → creates → Lessons  
Lesson → contains → Sessions  
Parent → books lesson for → Student

User (Parent/Mentor)
        │
        ├── Student (belongs to Parent)
        │
        └── Lesson (created by Mentor)
                │
                └── Session
                        │
                        └── Booking (Student ↔ Lesson) (only parents can book sessions)


## Setup Instructions

### 1. Clone the repository

```
git clone https://github.com/Shivam1404-byte/Mentorship_platform.git
```

### 2. Install dependencies

```
npm install
```

### 3. Setup environment variables

Create a `.env` file using the `.env.example`.

```
DATABASE_URL=postgresql://...
JWT_SECRET=your_secret
PORT=5000
```

### 4. Run database migration

```
npx prisma migrate dev
```

### 5. Start the server

```
npm run dev
```

Server will start at:

```
http://localhost:5000
```

---

## API Documentation

API documentation can be found here:

```
api_docs.md
```
## Setting the API Key

This project uses the **Google Gemini API** to generate text summaries.

1. Create an API key from Google AI Studio.

2. Create a `.env` file in the root directory.

3. Add the following variable:

```
GEMINI_API_KEY=your_api_key_here
```

4. Restart the server after adding the key.


## Testing the Summary Endpoint

Start the server:

```
npm run dev
```

Send a request using curl:

```
curl -X POST http://localhost:5000/llm/summarise \
-H "Content-Type: application/json" \
-d '{
"text": "Artificial Intelligence is transforming industries by automating tasks, improving decision making, and enabling new products and services."
}'
```

Example Response:

```
{
  "summary": "Artificial intelligence is transforming industries through automation, improved decision-making, and new product innovation.",
  "model": "gemini-2.5-flash"
}
```

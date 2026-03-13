# API Documentation

## Authentication

### Register

POST `/auth/register`

Body:

```
{
  "email": "parent@email.com",
  "password": "123456",
  "role": "PARENT"
}
```

---

### Login

POST `/auth/login`

```
{
  "email": "parent@email.com",
  "password": "123456"
}
```

---

## Students

### Create Student (Parent Only)

POST `/student/create`

```
{
  "name": "John",
  "age": 12
}
```

---

## Lessons

### Create Lesson (Mentor Only)

POST `/lesson/create`

```
{
  "title": "Introduction to Algebra",
  "description": "Basic algebra concepts"
}
```

---

## Booking

### Book Session

POST `/booking`

```
{
  "studentId": "uuid",
  "lessonId": "uuid"
}
```

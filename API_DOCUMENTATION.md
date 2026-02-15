# 📡 Skill2020 Academy - Complete API Documentation

All endpoints for the Skill2020 backend REST API.

## Base URL

**Development**: `http://localhost:5000/api`
**Production**: `https://your-backend-url.onrender.com/api`

## Authentication

All protected endpoints require a JWT token in the Authorization header:

```
Authorization: Bearer token_here
```

## Response Format

All responses are in JSON format:

**Success (2xx)**:
```json
{
  "message": "Success message",
  "data": { ... }
}
```

**Error (4xx, 5xx)**:
```json
{
  "error": "Error message"
}
```

---

## 🔐 Authentication Endpoints

### POST /auth/signup
Register a new student account.

**Request**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123",
  "class_level": "5"
}
```

**Response** (201):
```json
{
  "message": "Signup successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student",
    "class_level": "5"
  }
}
```

**Error Cases**:
- 400: Missing fields
- 400: Email already exists

---

### POST /auth/login
Login as a student.

**Request**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Response** (200):
```json
{
  "message": "Login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "name": "John Doe",
    "email": "john@example.com",
    "role": "student",
    "class_level": "5"
  }
}
```

**Error Cases**:
- 400: Invalid credentials

---

### POST /auth/admin-login
Login as an admin with passkey.

**Request**:
```json
{
  "email": "admin@example.com",
  "password": "adminpass",
  "passkey": "skill2020"
}
```

**Response** (200):
```json
{
  "message": "Admin login successful",
  "token": "eyJhbGc...",
  "user": {
    "id": "uuid",
    "name": "Admin",
    "email": "admin@example.com",
    "role": "admin"
  }
}
```

**Error Cases**:
- 400: Invalid credentials
- 403: Invalid passkey

---

### GET /auth/profile
Get current user profile (Auth Required).

**Request Headers**:
```
Authorization: Bearer token_here
```

**Response** (200):
```json
{
  "id": "uuid",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "student",
  "class_level": "5"
}
```

---

## 📚 Subjects Endpoints

### GET /subjects
Get all subjects (optionally filtered by category).

**Query Parameters**:
- `category` (optional): "class5", "class6", ..., "gate_cse", etc.

**Example**:
```
GET /subjects
GET /subjects?category=class5
```

**Response** (200):
```json
{
  "subjects": [
    {
      "id": "uuid",
      "name": "Mathematics",
      "category": "class5",
      "description": "...",
      "created_at": "2024-01-15T10:00:00Z"
    }
  ]
}
```

---

### GET /subjects/:id
Get a specific subject.

**Response** (200):
```json
{
  "subject": {
    "id": "uuid",
    "name": "Mathematics",
    "category": "class5",
    "description": "..."
  }
}
```

---

### POST /subjects
Create a new subject (Admin Only).

**Request**:
```json
{
  "name": "Mathematics",
  "category": "class5",
  "description": "Basic math concepts"
}
```

**Response** (201):
```json
{
  "message": "Subject created successfully",
  "subject": { ... }
}
```

---

### PUT /subjects/:id
Update a subject (Admin Only).

**Request**:
```json
{
  "name": "Advanced Mathematics",
  "category": "class6"
}
```

**Response** (200):
```json
{
  "message": "Subject updated successfully",
  "subject": { ... }
}
```

---

### DELETE /subjects/:id
Delete a subject (Admin Only).

**Response** (200):
```json
{
  "message": "Subject deleted successfully"
}
```

---

## 📖 Chapters Endpoints

### GET /chapters
Get chapters (optionally filtered by subject).

**Query Parameters**:
- `subject_id` (optional): Filter by subject

**Response** (200):
```json
{
  "chapters": [
    {
      "id": "uuid",
      "subject_id": "uuid",
      "title": "Number Systems",
      "description": "..."
    }
  ]
}
```

---

### POST /chapters
Create a new chapter (Admin Only).

**Request**:
```json
{
  "subject_id": "uuid",
  "title": "Number Systems"
}
```

**Response** (201):
```json
{
  "message": "Chapter created successfully",
  "chapter": { ... }
}
```

---

### PUT /chapters/:id
Update a chapter (Admin Only).

**Request**:
```json
{
  "title": "Updated Chapter Title"
}
```

**Response** (200):
```json
{
  "message": "Chapter updated successfully",
  "chapter": { ... }
}
```

---

### DELETE /chapters/:id
Delete a chapter (Admin Only).

**Response** (200):
```json
{
  "message": "Chapter deleted successfully"
}
```

---

## 📝 Notes Endpoints

### GET /notes
Get notes (optionally filtered by chapter/type).

**Query Parameters**:
- `chapter_id` (optional): Filter by chapter
- `type` (optional): "full_note" or "short_note"

**Response** (200):
```json
{
  "notes": [
    {
      "id": "uuid",
      "chapter_id": "uuid",
      "title": "Chapter 1 Notes",
      "type": "full_note",
      "file_url": "https://..pdf",
      "created_at": "2024-01-15T10:00:00Z"
    }
  ]
}
```

---

### POST /notes
Upload a new note (Admin Only).

**Request**:
```json
{
  "chapter_id": "uuid",
  "title": "Chapter 1 Notes",
  "type": "full_note",
  "file_url": "https://cdn.example.com/notes.pdf"
}
```

**Response** (201):
```json
{
  "message": "Note uploaded successfully",
  "note": { ... }
}
```

---

### PUT /notes/:id
Update a note (Admin Only).

**Request**:
```json
{
  "title": "Updated Title",
  "file_url": "https://..."
}
```

**Response** (200):
```json
{
  "message": "Note updated successfully",
  "note": { ... }
}
```

---

### DELETE /notes/:id
Delete a note (Admin Only).

**Response** (200):
```json
{
  "message": "Note deleted successfully"
}
```

---

## ❓ Questions (MCQ) Endpoints

### GET /questions
Get questions (filtered by chapter/type).

**Query Parameters**:
- `chapter_id` (optional)
- `type` (optional): "dpp" or "exam"

**Response** (200):
```json
{
  "questions": [
    {
      "id": "uuid",
      "chapter_id": "uuid",
      "question_text": "What is 5 + 3?",
      "option_a": "7",
      "option_b": "8",
      "option_c": "9",
      "option_d": "10",
      "correct_answer": "B",
      "type": "dpp"
    }
  ]
}
```

Note: `correct_answer` is NOT returned to students for DPP/Exams.

---

### POST /questions
Create a new question (Admin Only).

**Request**:
```json
{
  "chapter_id": "uuid",
  "question_text": "What is 5 + 3?",
  "option_a": "7",
  "option_b": "8",
  "option_c": "9",
  "option_d": "10",
  "correct_answer": "B",
  "type": "dpp",
  "explanation": "5 + 3 = 8"
}
```

**Response** (201):
```json
{
  "message": "Question created successfully",
  "question": { ... }
}
```

---

### PUT /questions/:id
Update a question (Admin Only).

**Request**:
```json
{
  "question_text": "Updated question?",
  "correct_answer": "B"
}
```

**Response** (200):
```json
{
  "message": "Question updated successfully",
  "question": { ... }
}
```

---

### DELETE /questions/:id
Delete a question (Admin Only).

**Response** (200):
```json
{
  "message": "Question deleted successfully"
}
```

---

## 📚 Exams Endpoints

### GET /exams
Get all exams (optionally by subject).

**Query Parameters**:
- `subject_id` (optional)

**Response** (200):
```json
{
  "exams": [
    {
      "id": "uuid",
      "subject_id": "uuid",
      "title": "Math Final Exam",
      "duration_minutes": 60,
      "question_ids": ["uuid1", "uuid2"],
      "total_marks": 100,
      "passing_marks": 40
    }
  ]
}
```

---

### GET /exams/:id
Get exam details with all questions.

**Response** (200):
```json
{
  "exam": {
    "id": "uuid",
    "subject_id": "uuid",
    "title": "Math Final Exam",
    "duration_minutes": 60,
    "questions": [
      {
        "id": "uuid",
        "question_text": "What is 5 + 3?",
        "option_a": "7",
        "option_b": "8",
        "option_c": "9",
        "option_d": "10"
        // Note: correct_answer is NOT included
      }
    ]
  }
}
```

---

### POST /exams
Create a new exam (Admin Only).

**Request**:
```json
{
  "subject_id": "uuid",
  "title": "Math Final Exam",
  "duration_minutes": 60,
  "question_ids": ["uuid1", "uuid2", "uuid3"],
  "total_marks": 100,
  "passing_marks": 40
}
```

**Response** (201):
```json
{
  "message": "Exam created successfully",
  "exam": { ... }
}
```

---

### PUT /exams/:id
Update an exam (Admin Only).

**Request**:
```json
{
  "title": "Updated Title",
  "duration_minutes": 90,
  "question_ids": ["uuid1", "uuid2"]
}
```

**Response** (200):
```json
{
  "message": "Exam updated successfully",
  "exam": { ... }
}
```

---

### DELETE /exams/:id
Delete an exam (Admin Only).

**Response** (200):
```json
{
  "message": "Exam deleted successfully"
}
```

---

## 📊 Results Endpoints

### POST /results
Submit exam results (Auth Required).

**Request**:
```json
{
  "user_id": "uuid",
  "exam_id": "uuid",
  "answers": {
    "question_id_1": "B",
    "question_id_2": "A",
    "question_id_3": "D"
  },
  "score": 75,
  "total_marks": 100
}
```

**Response** (201):
```json
{
  "message": "Exam result saved successfully",
  "result": {
    "id": "uuid",
    "user_id": "uuid",
    "exam_id": "uuid",
    "score": 75,
    "total_marks": 100,
    "percentage": 75,
    "submitted_at": "2024-01-15T10:30:00Z"
  }
}
```

---

### GET /results
Get results (filtered by user/exam).

**Query Parameters**:
- `user_id` (optional)
- `exam_id` (optional)

**Response** (200):
```json
{
  "results": [
    {
      "id": "uuid",
      "user_id": "uuid",
      "exam_id": "uuid",
      "score": 75,
      "total_marks": 100,
      "percentage": 75,
      "submitted_at": "2024-01-15T10:30:00Z"
    }
  ]
}
```

---

### GET /results/stats/:user_id
Get user performance statistics (Auth Required).

**Response** (200):
```json
{
  "user_id": "uuid",
  "totalExams": 5,
  "totalScore": 340,
  "averageScore": 68,
  "bestScore": 85,
  "results": [...]
}
```

---

### GET /results/:id
Get a specific result (Auth Required).

**Response** (200):
```json
{
  "result": {
    "id": "uuid",
    "user_id": "uuid",
    "exam_id": "uuid",
    "answers": { ... },
    "score": 75,
    "total_marks": 100,
    "percentage": 75,
    "submitted_at": "2024-01-15T10:30:00Z"
  }
}
```

---

## 🔧 Utility Endpoints

### GET /health
Check if backend is running.

**Response** (200):
```json
{
  "status": "Backend is running",
  "timestamp": "2024-01-15T10:30:00Z"
}
```

---

## 🛠️ Error Codes

| Code | Meaning |
|------|---------|
| 200 | OK - Request successful |
| 201 | Created - Resource created |
| 400 | Bad Request - Invalid input |
| 401 | Unauthorized - No/invalid token |
| 403 | Forbidden - No permission |
| 404 | Not Found - Resource not found |
| 500 | Server Error - Backend error |

---

## 📌 Notes

- All timestamps are in ISO 8601 format
- UUIDs are used for primary keys
- Tokens expire in 7 days
- Admin operations require valid JWT token with admin role
- Student data is role-limited (can only see own results)

---

**Last Updated**: January 2024

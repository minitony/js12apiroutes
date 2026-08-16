# Next.js API Routes Learning App - Specification

## Project Overview
Learning Next.js API Routes using App Router pattern. This app demonstrates server-side processing that's not possible in client-side React alone.

## API Endpoints Requirements

### 1. `/api/hello`
- **Method**: GET and POST
- **Response (GET)**: `"Hello API"` (plain text)
- **Response (POST)**: `"Hello API"` (plain text)
- **Purpose**: Basic API route introduction

### 2. `/api/time`
- **Method**: GET and POST
- **Response**: Current server time in ISO format `{"time": "2024-01-15T10:30:00.000Z"}` or similar
- **Purpose**: Demonstrate server-side time access

### 3. `/api/todos`
- **Method**: GET and POST
- **GET Response**: JSON array of Todo objects `[{"id": 1, "text": "Task 1", "completed": false}, ...]`
- **POST Response**: Creates new todo, returns created todo object
- **Purpose**: Demonstrate JSON handling and CRUD basics

## Frontend Requirements
- Page component that fetches all three APIs
- Display results from each endpoint
- Use `fetch("/api/todos")` specifically as required
- Show loading states and error handling

## Phase Implementation Plan

### Phase 1: Basic API Routes
- Create `/app/api/hello/route.ts` with GET and POST
- Create `/app/api/time/route.ts` with GET and POST
- Test endpoints via browser/Postman

### Phase 2: Todo API
- Create `/app/api/todos/route.ts` with GET and POST
- Initialize sample todo data
- Test CRUD operations

### Phase 3: Frontend Integration
- Update `/app/page.tsx` to fetch all APIs
- Display results in UI
- Implement `fetch("/api/todos")` as required
- Add styling and responsiveness

## Technical Notes
- Using Next.js 16.3.0 with App Router
- TypeScript for all files
- JSON response handling
- Proper CORS if needed (Next.js App Router handles this automatically)
- async/await pattern for all route handlers
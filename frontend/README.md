# Frontend - Todo App UI

This is the frontend React application for the Todo List application.

## Features

- ✅ Add, view, and delete todos
- ✅ Mark todos as completed
- ✅ Beautiful responsive UI
- ✅ Communicates with backend API
- ✅ Built with React + Vite

## Development

```bash
npm install
npm run dev
```

## Build

```bash
npm run build
```

## Testing

```bash
npm test
```

## Environment Variables

Create a `.env` file:
```
VITE_API_URL=http://localhost:5000
```

## Docker

Build the Docker image:
```bash
docker build -t fe-todo .
```

Run the container:
```bash
docker run -p 80:80 fe-todo
```

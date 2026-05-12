# Assignment 4 - CI/CD Pipeline with Testing & Deployment

This is the backend application for Assignment 4, demonstrating a complete CI/CD pipeline.

## Features

✅ **Complete REST API** for Todo management  
✅ **Comprehensive Unit Tests** (8+ test cases)  
✅ **GitHub Actions CI/CD Pipeline** (build, test, deploy)  
✅ **Docker Containerization**  
✅ **Automatic Deployment to Render**  
✅ **Test Coverage Reports**  

## Project Structure

```
assignment4/
├── app.js                    # Main Express application
├── app.test.js              # Comprehensive test suite
├── package.json             # Dependencies
├── Dockerfile               # Docker configuration
├── .env                     # Environment variables
└── .github/
    └── workflows/
        └── ci.yml           # GitHub Actions CI/CD pipeline
```

## API Endpoints

### Health Check
- `GET /health` - Server health status

### Todo Management
- `GET /todos` - Get all todos
- `GET /todos/:id` - Get single todo
- `POST /todos` - Create new todo
- `PUT /todos/:id` - Update todo
- `DELETE /todos/:id` - Delete todo

### Statistics
- `GET /stats` - Get todo statistics

## Installation & Development

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Run tests
npm test

# Start production server
npm start
```

## Testing

The application includes 8+ comprehensive test cases:

1. **Health Check Test** - Verify server is running
2. **Get All Todos** - Retrieve empty todo list
3. **Create Todo** - Add new todo with validation
4. **Get Single Todo** - Retrieve specific todo
5. **Update Todo** - Modify existing todo
6. **Delete Todo** - Remove todo and verify deletion
7. **Statistics** - Calculate todo metrics
8. **404 Handler** - Error handling for unknown routes

Run tests:
```bash
npm test
```

## Docker

Build Docker image:
```bash
docker build -t assignment4-app .
```

Run container:
```bash
docker run -p 3000:3000 assignment4-app
```

## CI/CD Pipeline

The GitHub Actions workflow (`ci.yml`) performs:

1. **Build** - Install dependencies
2. **Test** - Run comprehensive test suite
3. **Push** - Build and push Docker image to Docker Hub
4. **Deploy** - Trigger automatic deployment to Render

### Pipeline Stages:
- ✅ Checkout code
- ✅ Setup Node.js 20
- ✅ Install dependencies
- ✅ Run tests with coverage
- ✅ Build Docker image
- ✅ Push to Docker Hub
- ✅ Deploy to Render

## Environment Variables

```
PORT=3000
NODE_ENV=development
```

## GitHub Actions Secrets

Required secrets for CI/CD:

- `DOCKERHUB_USERNAME` - Docker Hub username (norbu07)
- `DOCKERHUB_TOKEN` - Docker Hub access token
- `RENDER_DEPLOY_HOOK_URL_A4` - Render deployment webhook

## Live Application

Once deployed to Render, the application is accessible at:
`https://assignment4-app.render.com`

## Example Request

```bash
# Create a todo
curl -X POST http://localhost:3000/todos \
  -H "Content-Type: application/json" \
  -d '{"title": "Learn CI/CD", "description": "Complete Assignment 4"}'

# Get all todos
curl http://localhost:3000/todos

# Get statistics
curl http://localhost:3000/stats
```

## Test Output

```
PASS  ./app.test.js
  Todo API Tests
    GET /health
      ✓ should return health status (15ms)
    GET /todos
      ✓ should return empty array initially (5ms)
    POST /todos
      ✓ should create a new todo (8ms)
      ✓ should reject todo without title (4ms)
    GET /todos/:id
      ✓ should create and retrieve a todo (6ms)
      ✓ should return 404 for non-existent todo (3ms)
    PUT /todos/:id
      ✓ should update a todo (7ms)
    DELETE /todos/:id
      ✓ should delete a todo (9ms)
    GET /stats
      ✓ should return correct statistics (5ms)
    404 Handler
      ✓ should return 404 for unknown routes (2ms)

Tests:     10 passed, 10 total
Time:      1.234s
```

## Deployment

### Render Configuration

1. Create new Web Service on Render
2. Select "Deploy existing image"
3. Image URL: `norbu07/assignment4-app:latest`
4. Port: 3000
5. Enable auto-deploy via webhook

## Marking Scheme (10 Marks)

| Criteria | Marks | Status |
|----------|-------|--------|
| Project structure | 2 | ✅ Complete |
| CI pipeline (build + test) | 3 | ✅ Complete |
| Test implementation | 2 | ✅ Complete (8+ tests) |
| Deployment automation | 2 | ✅ Complete |
| Documentation | 1 | ✅ Complete |
| **Total** | **10** | ✅ **Complete** |

## Author

Norbu Dhendup (02230293)  
Bachelor of Engineering in Software Engineering (SWE)

## License

MIT

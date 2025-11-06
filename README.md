# Elysia with Bun runtime

<img width="1167" height="644" alt="image" src="https://github.com/user-attachments/assets/29d95b57-e4ee-4cea-9b7c-ed7436f38070" />


## Development
To start the development server run:
```bash
bun run dev
```

Open http://localhost:3000/ with your browser to see the result.

## Testing (Integration)

This project uses Bun's built-in test runner to execute real integration tests (no mocks) against a Postgres database.

1) Start a local Postgres for tests (example via Docker):
```bash
docker run --rm \
  -e POSTGRES_PASSWORD=postgres \
  -e POSTGRES_DB=carts_test \
  -p 54329:5432 \
  -d postgres:16
```

2) Run tests with the provided env file:
```bash
bun test --env-file=.env.test
```

The test runner will:
- Ensure the required enums and `carts` table exist
- Truncate data between tests for isolation
- Exercise HTTP routes via `app.handle(new Request(...))`

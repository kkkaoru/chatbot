# Unit Test Rules

This document defines the standards and conventions for writing unit tests in this project.

## Test Framework

- **Framework**: Vitest
- **Coverage Tool**: V8
- **Assertion Library**: Vitest's built-in expect

## File Naming Conventions

- Test files must be colocated with the source files they test
- Test files must use the `.test.ts` extension
- Example: `config.ts` → `config.test.ts`

## Test Structure

### 1. Flat Test Structure (STRONGLY PREFERRED)

**Always use a flat structure with `test` function. Avoid `describe` blocks whenever possible.**

```typescript
import { test, expect } from 'vitest'

test('function should return expected value', () => {
  // Test implementation
})

test('function handles edge case correctly', () => {
  // Test implementation
})
```

### 2. Why Avoid describe

- **Simplicity**: Flat tests are easier to read and understand
- **Less nesting**: Reduces cognitive load
- **Consistency**: Using only `test` maintains uniformity across the codebase
- **Better test names**: Forces descriptive, self-contained test names

### 3. When describe Might Be Acceptable (RARE)

Only use `describe` blocks when absolutely necessary for:
- Grouping tests that share complex setup/teardown logic
- Testing multiple methods of a large class

Even then, consider if the tests can be refactored to avoid `describe`.

**Note**: Always use `test` function for writing tests. Other test declaration functions are restricted by Biome configuration.

## Mocking Guidelines

### Global Objects (e.g., Bun, process)

Use `Object.defineProperty` to mock global objects without TypeScript errors:

```typescript
const originalBun = globalThis.Bun

beforeEach(() => {
  Object.defineProperty(globalThis, 'Bun', {
    value: { /* mock implementation */ },
    writable: true,
    configurable: true,
  })
})

afterEach(() => {
  Object.defineProperty(globalThis, 'Bun', {
    value: originalBun,
    writable: true,
    configurable: true,
  })
})
```

**Avoid**: Using `@ts-expect-error` or `@ts-ignore` comments

### Environment Variables

```typescript
const originalEnv = { ...process.env }

beforeEach(() => {
  process.env = { ...originalEnv }
})

afterEach(() => {
  process.env = originalEnv
})

test('should handle missing env var', () => {
  process.env.SOME_VAR = undefined // Use undefined instead of delete
})
```

## Type Safety

### Proper Type Assertions

```typescript
// Good - Use typed mocks
const mockFn = vi.fn<Parameters<typeof originalFn>, ReturnType<typeof originalFn>>()

// Good - Use type assertion with unknown
const mockApp = {
  fetch: vi.fn(),
} as unknown as DiscordHono

// Avoid - Direct any type
const mockApp = {} as any
```

## Coverage Requirements

- **Target Coverage**: 80% or higher for all metrics
- **Required Metrics**:
  - Statements
  - Branches
  - Functions
  - Lines

## Test Organization Best Practices

### 1. Setup and Teardown

```typescript
// Place shared setup at module level
let mockExit: MockedFunction<typeof process.exit>
const originalExit = process.exit

beforeEach(() => {
  vi.clearAllMocks()
  // Setup mocks
})

afterEach(() => {
  // Restore original implementations
})
```

### 2. Test Naming

- Use descriptive test names that explain what is being tested
- Start with the action/function being tested
- Include the expected outcome
- Since we avoid `describe` blocks, include context in the test name itself

```typescript
// Good - self-contained test names with full context
test('validateEnvironment returns null when DISCORD_TOKEN is missing', () => {})
test('startServer calls Bun.serve with correct port configuration', () => {})
test('app.fetch handles GET requests correctly', () => {})
test('config validation fails when required environment variables are missing', () => {})

// Avoid - vague or context-dependent names
test('test config', () => {})
test('works correctly', () => {})
test('handles error', () => {}) // Missing context about what handles the error
```

### 3. Assertions

- Use specific assertions over generic ones
- Test both positive and negative cases
- Verify mock calls when appropriate

```typescript
// Good
expect(config.port).toBe(3000)
expect(mockServe).toHaveBeenCalledWith({ port: 3000, fetch: mockApp.fetch })

// Avoid
expect(config).toBeTruthy()
```

## Console Output in Tests

Suppress console output in tests to keep test output clean:

```typescript
const originalConsoleError = console.error

beforeEach(() => {
  console.error = vi.fn()
})

afterEach(() => {
  console.error = originalConsoleError
})
```

## Biome Configuration for Tests

Test files have special Biome configuration overrides:

- `noSecrets`: Disabled (test descriptions may trigger false positives)
- `noDelete`: Disabled (may need to delete mock properties)
- `noConsole`: Allowed for error, warn, info (but not log)

## Command Reference

```bash
# Run all tests
bun test:run

# Run tests with coverage
bun test:coverage

# Run specific test file
bun test:run src/config.test.ts

# Run tests in watch mode
bun test:watch
```

## Testing Checklist

- [ ] Test file is colocated with source file
- [ ] All exported functions are tested
- [ ] Both success and error cases are covered
- [ ] Mocks are properly setup and restored
- [ ] No `@ts-expect-error` or `@ts-ignore` comments
- [ ] Test names are descriptive
- [ ] Coverage meets minimum requirements (80%)
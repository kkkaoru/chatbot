# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## File Operation Rules
- **IMPORTANT**: When reading or writing files in this project, always use serena MCP tools instead of the default file system tools
- Use `mcp__serena__read_file` for reading files
- Use `mcp__serena__create_text_file` for creating new files
- Use `mcp__serena__replace_regex` or `mcp__serena__replace_symbol_body` for editing files
- This ensures proper integration with the project's language server and memory system

## Project Overview

This is a chatbot project using Hono framework with Discord integration, configured as a Bun monorepo with workspace support.

## Commands

### Development
```bash
# Install dependencies
bun install

# Run biome formatter and linter
bun biome check

# Apply biome fixes (formatting and linting)
bun biome check --write

# Commit changes with conventional commits
bun run commit
# Or use the alias
bun cz

# Install git hooks (if not already installed)
bun run lefthook:install
```

### Testing
```bash
# Run all tests
bun test:run

# Run tests with coverage
bun test:coverage

# Run tests in watch mode
bun test:watch
```

## Architecture

### Monorepo Structure
- Uses Bun workspaces with packages in `packages/*` and `workspaces/*` directories
- Currently no active packages or apps populated yet

### Key Technologies
- **Runtime**: Bun (with TypeScript)
- **Framework**: Hono (web framework) with Discord integration via discord-hono
- **Testing**: Vitest with V8 coverage
- **Code Quality**: Biome for formatting and linting
- **Commit Standards**: Conventional commits enforced via commitlint and commitizen
- **Git Hooks**: Lefthook with pre-commit and pre-push hooks for testing and linting

### Configuration Details
- **TypeScript**: Strict mode enabled, ESNext target, bundler module resolution
- **Biome**: Tab indentation, double quotes for JavaScript/TypeScript
- **Dependencies**: Exact versions locked (no ^ or ~ in package.json via bunfig.toml)

## Important Notes
- This is a private package that should not be published
- The project uses Bun's native TypeScript support (noEmit: true in tsconfig)
- Wrangler is installed, suggesting potential Cloudflare Workers deployment

## Development Guidelines

### Unit Testing
Please refer to the Unit Test Rules for detailed testing guidelines: @.rules/unit-test.md

Guidelines include:
- Test structure and naming conventions
- Mocking strategies (especially for global objects like Bun)
- Type safety requirements
- Coverage targets (minimum 80%)
- Biome configuration for test files
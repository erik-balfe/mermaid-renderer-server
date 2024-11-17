# Contributing to Mermaid Renderer Server

Thank you for your interest in contributing! This document provides guidelines for contributing to the project.

## Code of Conduct

- Be respectful of others
- Keep discussions focused and constructive
- Welcome newcomers and help them get started

## How to Contribute

1. **Find or Create an Issue**

   - Check existing issues first
   - If you're fixing a bug, create an issue describing it
   - If you're adding a feature, discuss it in an issue first

2. **Fork and Clone**

   - Fork the repository
   - Clone your fork locally
   - Set up the development environment

3. **Create a Branch**

   ```bash
   git checkout develop
   git checkout -b feature/your-feature-name
   ```

4. **Make Your Changes**

   - Follow the coding standards
   - Write tests for new features
   - Keep commits focused and logical

5. **Test Your Changes**

   ```bash
   bun test
   ```

6. **Submit a Pull Request**
   - Push your changes to your fork
   - Create a pull request to our `develop` branch
   - Describe your changes in detail
   - Reference any related issues

## Coding Standards

- Use TypeScript features appropriately
- Follow existing code style
- Add comments for complex logic
- Keep functions focused and small
- Use meaningful variable and function names

## Commit Messages

Follow conventional commits format:

```
feat: add new feature
fix: resolve specific issue
docs: update documentation
test: add or modify tests
refactor: code changes that neither fix a bug nor add a feature
```

## Testing

- Write tests for new features
- Update tests for modified features
- Ensure all tests pass before submitting PR
- Include both positive and negative test cases

## Documentation

- Update README.md if adding new features
- Include JSDoc comments for new functions
- Update API documentation if changing endpoints

## Questions?

Feel free to:

- Open an issue for questions
- Ask for clarification in pull requests
- Contact maintainers directly

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

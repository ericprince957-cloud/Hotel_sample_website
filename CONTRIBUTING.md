# Contributing to The Calabash Hotel Website

Thank you for your interest in contributing to The Calabash Hotel website! This document provides guidelines and information for contributors.

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
- [Development Workflow](#development-workflow)
- [Coding Standards](#coding-standards)
- [Pull Request Process](#pull-request-process)
- [Reporting Bugs](#reporting-bugs)
- [Feature Requests](#feature-requests)

## Code of Conduct

This project adheres to a simple code of conduct:

- Be respectful and inclusive
- Provide constructive feedback
- Focus on what is best for the community
- Show empathy towards other community members

## Getting Started

### Prerequisites

- Node.js 18+ and npm
- A Supabase account and project
- Git

### Setup

1. Fork the repository
2. Clone your fork:
   ```bash
   git clone https://github.com/your-username/calabash-hotel-website.git
   cd calabash-hotel-website
   ```
3. Install dependencies:
   ```bash
   npm install
   ```
4. Set up environment variables (see README.md for details)
5. Run the development server:
   ```bash
   npm run dev
   ```

## Development Workflow

### Branch Naming

Use descriptive branch names:

- `feature/add-room-filter` - New features
- `fix/mobile-navigation-bug` - Bug fixes
- `docs/update-readme` - Documentation updates
- `refactor/admin-dashboard` - Code refactoring

### Making Changes

1. Create a new branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes and commit them:
   ```bash
   git add .
   git commit -m "feat: add room filter functionality"
   ```

3. Follow conventional commit messages:
   - `feat:` New feature
   - `fix:` Bug fix
   - `docs:` Documentation changes
   - `style:` Code style changes (formatting, etc.)
   - `refactor:` Code refactoring
   - `test:` Adding or updating tests
   - `chore:` Maintenance tasks

4. Push to your fork:
   ```bash
   git push origin feature/your-feature-name
   ```

5. Create a Pull Request

## Coding Standards

### TypeScript

- Use TypeScript for all new code
- Define proper types and interfaces
- Avoid using `any` type
- Use type inference where possible

### React

- Use functional components with hooks
- Keep components small and focused
- Use proper prop types
- Follow React best practices

### Styling

- Use Tailwind CSS utility classes
- Follow the existing design system
- Use the defined color variables
- Maintain responsive design (mobile-first)

### Code Organization

- Keep related code together
- Use meaningful file and folder names
- Add comments for complex logic
- Keep functions small and focused

### Testing

- Test your changes thoroughly
- Check responsive design at all breakpoints
- Verify accessibility with keyboard navigation
- Test with screen readers when applicable

## Pull Request Process

### Before Submitting

1. Ensure your code follows the coding standards
2. Test your changes thoroughly
3. Update documentation if needed
4. Make sure there are no TypeScript errors
5. Run `npm run build` to ensure the build succeeds

### PR Guidelines

1. **Title**: Use a clear, descriptive title
2. **Description**: Explain what changes you made and why
3. **Screenshots**: Include screenshots for UI changes
4. **Testing**: Describe how you tested the changes
5. **Related Issues**: Link any related issues

### PR Template

```markdown
## Description
Brief description of the changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Documentation update
- [ ] Code refactoring

## Testing
Describe how you tested the changes

## Screenshots
If applicable, add screenshots

## Checklist
- [ ] Code follows the style guidelines
- [ ] Self-review completed
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added/updated
- [ ] All tests pass
```

## Reporting Bugs

### Before Reporting

1. Check if the bug already exists in issues
2. Try to reproduce the bug with the latest version
3. Gather information about your environment

### Bug Report Template

```markdown
**Describe the bug**
A clear and concise description of the bug

**To Reproduce**
Steps to reproduce the behavior:
1. Go to '...'
2. Click on '...'
3. Scroll down to '...'
4. See error

**Expected behavior**
A clear description of what you expected to happen

**Screenshots**
If applicable, add screenshots

**Environment:**
- OS: [e.g. macOS, Windows]
- Browser: [e.g. Chrome, Safari]
- Version: [e.g. 22]
- Device: [e.g. iPhone 12, Desktop]

**Additional context**
Add any other context about the problem here
```

## Feature Requests

### Before Requesting

1. Check if the feature already exists
2. Consider if it fits the project scope
3. Think about implementation details

### Feature Request Template

```markdown
**Is your feature request related to a problem?**
A clear description of the problem

**Describe the solution you'd like**
A clear description of what you want to happen

**Describe alternatives you've considered**
A description of any alternative solutions or features

**Additional context**
Add any other context, mockups, or screenshots
```

## Project Structure

```
src/
├── components/          # Reusable components
│   ├── admin/          # Admin dashboard components
│   ├── home/           # Home page sections
│   ├── layout/         # Layout components
│   ├── rooms/          # Room-related components
│   └── ui/             # UI components
├── data/               # Static data files
├── hooks/              # Custom React hooks
├── lib/                # Utility functions and API
├── pages/              # Page components
└── styles/             # Global styles
```

## Common Tasks

### Adding a New Page

1. Create component in `src/pages/`
2. Add route in `src/App.tsx`
3. Add SEO metadata using `useSEO` hook
4. Update sitemap if needed

### Adding a New Component

1. Create component in appropriate folder
2. Export component properly
3. Add TypeScript types
4. Document with comments if complex

### Updating Styles

1. Use Tailwind utility classes
2. Follow the design system
3. Test at all breakpoints
4. Ensure accessibility

## Questions?

If you have questions, please:

1. Check the documentation (README.md, SUPABASE_SETUP.md, etc.)
2. Search existing issues
3. Create a new issue with the "question" label

## License

By contributing, you agree that your contributions will be licensed under the MIT License.

---

Thank you for contributing to The Calabash Hotel website!

# Contributing to Neon Flux Template

Thank you for your interest in contributing to Neon Flux! We welcome contributions from the community.

## Getting Started

1. Fork the repository
2. Clone your fork: `git clone https://github.com/your-username/neon-flux-template.git`
3. Create a new branch: `git checkout -b feature/your-feature-name`
4. Install dependencies: `npm install`
5. Start development server: `npm run dev`

## Development Guidelines

### Code Style

- Use TypeScript for all new files
- Follow the existing code style
- Use meaningful variable and function names
- Add comments for complex logic
- Keep components small and focused

### Component Guidelines

- All client components must use `'use client'` directive
- Use TypeScript interfaces for props
- Include proper prop validation
- Document complex components

### CSS Guidelines

- Use Tailwind CSS utilities when possible
- Add custom styles to appropriate CSS files:
  - `styles/neon.css` - Neon effects
  - `styles/glitch.css` - Glitch effects
  - `styles/animations.css` - Animations
- Follow the existing naming conventions
- Use CSS variables for colors

### Commit Messages

Follow the conventional commit format:

- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation changes
- `style:` - Code style changes (formatting, etc.)
- `refactor:` - Code refactoring
- `test:` - Test additions or changes
- `chore:` - Build process or auxiliary tool changes

Example: `feat: add hologram card component`

## Testing

- Test your changes in development mode
- Ensure the production build works: `npm run build`
- Test on multiple browsers
- Test responsive behavior on mobile devices

## Submitting Changes

1. Commit your changes with clear commit messages
2. Push to your fork
3. Create a Pull Request
4. Describe your changes in the PR description
5. Link any related issues

## Reporting Issues

When reporting issues, please include:

- Description of the issue
- Steps to reproduce
- Expected behavior
- Actual behavior
- Screenshots (if applicable)
- Browser and OS information
- Error messages or console logs

## Feature Requests

We welcome feature requests! Please:

- Check if the feature has already been requested
- Provide a clear description of the feature
- Explain why it would be useful
- Include examples or mockups if possible

## Questions?

Feel free to open an issue for any questions about contributing.

Thank you for contributing to Neon Flux! 🎮✨

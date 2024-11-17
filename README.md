# Mermaid Renderer Server

A simple and efficient HTTP server that renders Mermaid diagrams to PNG images. Built with Bun runtime and optimized for Docker environments.

## Quick Start

### Using Docker (Recommended)

Add this service to your `docker-compose.yml`:

```yaml
services:
  mermaid-renderer:
    image: ghcr.io/erik-balfe/mermaid-renderer-server:latest
    ports:
      - "3022:3022"
```

### API Usage

Send a POST request to `/render` endpoint with your Mermaid diagram definition:

```bash
curl -X POST http://localhost:3022/render \
  -H "Content-Type: application/json" \
  -d '{
    "diagram": "graph TD\nA[Client] --> B[Load Balancer]\nB --> C[Server01]\nB --> D[Server02]"
  }' \
  --output diagram.png
```

### Response

The server returns the rendered diagram as a PNG image with `Content-Type: image/png`.

## Local Development

### Prerequisites

- [Bun](https://bun.sh) runtime (v1.1.34 or later)
- Node.js environment for development tools

### Setup

1. Clone the repository:

```bash
git clone https://github.com/erik-balfe/mermaid-renderer-server.git
cd mermaid-renderer-server
```

2. Install dependencies:

```bash
bun install
```

3. Run locally:

```bash
bun start
```

4. Run tests:

```bash
bun test
```

### Building Docker Image Locally

```bash
docker build -t mermaid-renderer-server .
```

## Versioning

We use [SemVer](http://semver.org/) for versioning. Docker images are tagged with both version numbers (e.g., `1.0.0`) and `latest`.

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and development process.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

````

And here's the improved CONTRIBUTING.md:

```markdown
# Contributing to Mermaid Renderer Server

We love your input! We want to make contributing to Mermaid Renderer Server as easy and transparent as possible.
## Development Process

We use a simplified branching strategy focusing solely on the `master` branch:

`master` - Production-ready code where all changes are merged.

### Creating a New Feature

1. Fork the repository
2. Make your changes directly on the `master` branch or create a feature branch if you prefer to work in isolation:
   ```bash
   git checkout -b feature/your-feature-name
   ```

3. Write or update tests as needed
4. Run tests to ensure everything works:
   ```bash
   bun test
   ```
5. Commit your changes:
   ```bash
   git commit -m "Add some feature"
   ```
6. Push to your fork:
   ```bash
   git push origin master
   ```
7. Create a Pull Request to merge your changes into the `master` branch

## Release Process

1. Tag the new version directly on the `master` branch:

   ```bash
   git tag -a v1.0.0 -m "Release version 1.0.0"
   ```

2. Push changes with tags:
   ```bash
   git push origin master --tags
   ```

This will trigger the GitHub Actions workflow to:

- Build the Docker image
- Tag it with both `latest` and the version number
- Push to GitHub Container Registry as:
  - `ghcr.io/erik-balfe/mermaid-renderer-server:latest`
  - `ghcr.io/erik-balfe/mermaid-renderer-server:1.0.0`

This will trigger the GitHub Actions workflow to:

- Build the Docker image
- Tag it with both `latest` and the version number
- Push to GitHub Container Registry as:
  - `ghcr.io/erik-balfe/mermaid-renderer-server:latest`
  - `ghcr.io/erik-balfe/mermaid-renderer-server:1.0.0`

### Version Numbers

We follow [SemVer](http://semver.org/):

- MAJOR version (1.0.0) - Incompatible API changes
- MINOR version (0.1.0) - Add functionality in a backward compatible manner
- PATCH version (0.0.1) - Backward compatible bug fixes

## Code Style

- Use TypeScript
- Follow existing code formatting
- Add comments for complex logic
- Write meaningful commit messages

## Project Structure

```
mermaid-renderer-server/
├── .github/
│   ├── workflows/      # GitHub Actions workflows
│   └── CONTRIBUTING.md # file with contribution guidelines
├── src/
│   └── server.ts      # Main server implementation
├── tests/
│   └── server.test.ts # Server tests
├── docker-compose.yml # Docker composition
├── Dockerfile        # Docker build instructions
├── LICENSE          # MIT License
├── README.md        # Project documentation
├── bun.lockb        # Bun lockfile
├── package.json     # Project dependencies
└── tsconfig.json    # TypeScript configuration
```

## Questions?

Feel free to open an issue for any questions or concerns.
````

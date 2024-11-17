# dev plan

### High-Level Overview

To implement the `mermaid-renderer-server`, we will follow a structured approach as outlined below:

1. **Server Setup**: Initialize a Bun project and set up an HTTP server to handle incoming requests.
2. **API Design**: Create an API endpoint that accepts POST requests containing Mermaid diagram definitions.
3. **Processing Input**: On receiving a request, process the input to validate and prepare it for rendering.
4. **Diagram Rendering**: Use the `mermaid-cli` to render the diagram based on the provided input.
5. **Response Handling**: Return the generated PNG image as a response to the client.
6. **Dockerization**: Prepare the application for deployment in a Docker container.

### Incremental Breakdown

#### 1. Server Setup

- **Purpose**: Establish a Bun server to handle HTTP requests.
- **Steps**:
  - Initialize the Bun project using `bun init`.
  - Create a file (e.g., `server.ts`) for the server implementation.
  - Set up a basic HTTP server that listens on a specified port.

#### 2. API Design

- **Purpose**: Define how clients will interact with the server.
- **Endpoint**: Define a POST endpoint (e.g., `/render`).
- **Request Format**: Expect a JSON payload with a property (e.g., `diagramDefinition`) that contains the Mermaid text.

#### 3. Processing Input

- **Purpose**: Validate and prepare the input for rendering.
- **Steps**:
  - Check if the `diagramDefinition` is present and is of a valid format.
  - Handle any parsing or formatting needed before passing it to the rendering step.

#### 4. Diagram Rendering

- **Purpose**: Utilize `mermaid-cli` to generate the PNG image.
- **Steps**:
  - Install `mermaid-cli` if not already done.
  - Use the command line or Node.js API from `mermaid-cli` to render the diagram, converting the Mermaid text into a PNG file.
  - Save the generated PNG to a temporary directory.

#### 5. Response Handling

- **Purpose**: Return the rendered image to the client.
- **Steps**:
  - Read the generated PNG file.
  - Send the file back as a binary response or provide a direct link if saved somewhere.

#### 6. Dockerization

- **Purpose**: Prepare the application for containerized deployment.
- **Steps**:
  - Write a `Dockerfile` to define how the application will be built and run.
  - Test the Docker setup to ensure it works seamlessly with other applications in the bridge network.

// server.ts
import { run } from "@mermaid-js/mermaid-cli";
import { serve } from "bun";
import { mkdir, readFile, unlink, writeFile } from "fs/promises"; // Include necessary file operations
import path from "path"; // Path module for easier file path handling

const PORT = 3022; // Define the port
const TEMP_DIR = path.join(process.cwd(), "temp"); // Current working directory plus temp
const INPUT_FILE_NAME = "tempDiagram.mmd";
const OUTPUT_FILE_NAME = "tempDiagram.png";

// Start the server
const server = serve({
  port: PORT,
  fetch(req) {
    console.log(`Incoming request: ${req.method} ${req.url}`); // Log incoming requests
    return handleFetch(req);
  },
});
async function handleFetch(req: Request) {
  const url = new URL(req.url); // Create a URL object to easily parse different parts of the URL
  console.log(`Checking request for POST /render`); // Debugging log
  console.log(`Requesting pathname: ${url.pathname}`); // Log the pathname being requested

  // Handle POST request to /render
  if (req.method === "POST" && url.pathname === "/render") {
    console.log("Handling /render request..."); // Log when handling the render request
    return await handleRenderRequest(req);
  }

  console.log("Returning 404 for unsupported route.");
  return new Response("Not Found", { status: 404 });
}

// Handle rendering of the Mermaid diagram
async function handleRenderRequest(req: Request) {
  try {
    console.log("Creating temporary directory if it doesn't exist..."); // Log before creating directory
    await mkdir(TEMP_DIR, { recursive: true });

    const body = await req.json(); // Parse the JSON body
    console.log("Received body:", body); // Log the received body

    const diagramDefinition = body.diagramDefinition; // Extract the diagram definition

    // Validate diagram definition
    if (!diagramDefinition || typeof diagramDefinition !== "string") {
      console.log("Invalid diagram definition:", diagramDefinition); // Log invalid diagram definition
      return new Response("Invalid diagram definition", { status: 400 });
    }

    // Define file paths
    const inputFilePath = path.join(TEMP_DIR, INPUT_FILE_NAME);
    const outputFilePath = path.join(TEMP_DIR, OUTPUT_FILE_NAME);
    console.log(`Input file path: ${inputFilePath}`); // Log input file path
    console.log(`Output file path: ${outputFilePath}`); // Log output file path

    // Write the diagram definition to the .mmd file
    console.log("Writing diagram definition to file...");
    await writeFile(inputFilePath, diagramDefinition);
    console.log("Diagram definition written successfully.");

    // Generate the diagram using mermaid-cli
    console.log("Generating diagram with mermaid-cli...");
    await run(inputFilePath, outputFilePath, {
      outputFormat: "png", // Set the output format to PNG
    });
    console.log("Diagram generated successfully.");

    // Read the generated PNG file
    console.log("Reading the generated PNG file...");
    const pngData = await readFile(outputFilePath);
    console.log("PNG file read successfully.");

    return new Response(pngData, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
      },
    });
  } catch (error) {
    console.error("Error processing diagram render:", error);
    return new Response("Failed to generate diagram", { status: 500 });
  } finally {
    // Cleanup temporary files
    console.log("Cleaning up temporary files...");
    try {
      await unlink(path.join(TEMP_DIR, INPUT_FILE_NAME)); // Remove the .mmd file
      console.log("Input file cleaned up.");
    } catch (e) {
      console.warn("Failed to clean up input file:", e);
    }
    try {
      await unlink(path.join(TEMP_DIR, OUTPUT_FILE_NAME)); // Remove the .png file
      console.log("Output file cleaned up.");
    } catch (e) {
      console.warn("Failed to clean up output file:", e);
    }
  }
}

// Start server and log the running port
console.log(`Server is running at http://localhost:${PORT}`);

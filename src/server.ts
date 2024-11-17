// server.ts
import { run } from "@mermaid-js/mermaid-cli";
import { serve } from "bun";
import { readFile, unlink, writeFile } from "fs/promises"; // Use fs module for file operations

const PORT = 3000; // Define the port

const server = serve({
  port: PORT,
  fetch(req) {
    // Handle the /render POST request
    if (req.method === "POST" && req.url === "/render") {
      return handleRenderRequest(req);
    }

    // Return 404 for any other paths
    return new Response("Not Found", { status: 404 });
  },
});

async function handleRenderRequest(req: Request) {
  try {
    const body = await req.json(); // Parse the JSON body
    const diagramDefinition = body.diagramDefinition; // Extract the diagram definition

    // Validate diagram definition
    if (!diagramDefinition || typeof diagramDefinition !== "string") {
      return new Response("Invalid diagram definition", { status: 400 });
    }

    // Create a temporary mmd file
    const inputFilePath = "./tempDiagram.mmd";
    const outputFilePath = "./tempDiagram.png";

    await writeFile(inputFilePath, diagramDefinition); // Write the diagram definition to the .mmd file

    // Generate the diagram using mermaid-cli
    await run(inputFilePath, outputFilePath, {
      // Optional configurations can be added here
      theme: "default", // Set the theme, if desired
      format: "png",    // Specify the format as PNG
    });

    // Read the generated PNG file
    const pngData = await readFile(outputFilePath);

    // Cleanup temporary files
    await unlink(inputFilePath); // Remove the .mmd file
    await unlink(outputFilePath); // Remove the .png file

    return new Response(pngData, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
      },
    });

  } catch (error) {
    console.error("Error processing diagram render:", error);
    return new Response("Failed to generate diagram", { status: 500 });
  }
}

console.log(`Server is running at http://localhost:${PORT}`);

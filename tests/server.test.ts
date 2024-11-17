import { beforeAll, describe, expect, it } from "bun:test";
import { existsSync } from "fs";
import { mkdir, readFile, rm, unlink, writeFile } from "fs/promises";
import path from "path";

const TEST_OUTPUT_DIR = path.join(process.cwd(), "tests", "output");

describe("Mermaid Renderer Server", () => {
  beforeAll(async () => {
    // Clean and recreate test output directory
    if (existsSync(TEST_OUTPUT_DIR)) {
      await rm(TEST_OUTPUT_DIR, { recursive: true });
      console.log(`Cleaned test output directory: ${TEST_OUTPUT_DIR}`);
    }
    await mkdir(TEST_OUTPUT_DIR, { recursive: true });
  });

  it("should render a simple diagram", async () => {
    const diagram = `graph TD
      A[Client] --> B[Load Balancer]
      B --> C[Server01]
      B --> D[Server02]`;

    const response = await fetch("http://localhost:3022/render", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ diagram }),
    });

    expect(response.status).toBe(200);
    expect(response.headers.get("content-type")).toBe("image/png");

    // Check if we got actual image data
    const imageData = await response.arrayBuffer();
    expect(imageData.byteLength).toBeGreaterThan(0);
  });

  it("should save rendered diagram to file", async () => {
    const outputPath = path.join(TEST_OUTPUT_DIR, "test-diagram.png");

    // Clean up existing file if it exists
    if (existsSync(outputPath)) {
      await unlink(outputPath);
    }

    const diagram = `graph TD
      A[Client] --> B[Load Balancer]
      B --> C[Server01]
      B --> D[Server02]`;

    const response = await fetch("http://localhost:3022/render", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ diagram }),
    });

    expect(response.status).toBe(200);

    // Save the response to file
    const imageData = Buffer.from(await response.arrayBuffer());
    await writeFile(outputPath, imageData);

    // Verify file exists and has content
    expect(existsSync(outputPath)).toBe(true);

    const savedFileContent = await readFile(outputPath);
    expect(savedFileContent.length).toBeGreaterThan(0);

    console.log(`Test diagram saved to: ${outputPath}`);
  });

  it("should return 400 for invalid diagram", async () => {
    const response = await fetch("http://localhost:3022/render", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ diagram: null }),
    });

    expect(response.status).toBe(400);
  });
});

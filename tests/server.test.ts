import { describe, expect, it } from "bun:test";

describe("Mermaid Renderer Server", () => {
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

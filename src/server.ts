import { run } from "@mermaid-js/mermaid-cli";
import { serve } from "bun";
import { mkdir, readFile, unlink, writeFile } from "fs/promises";
import path from "path";

const PORT = 3022;
const TEMP_DIR = path.join(process.cwd(), "temp");

// Ensure temp directory exists
await mkdir(TEMP_DIR, { recursive: true });

const server = serve({
  port: PORT,
  async fetch(req) {
    if (req.method !== "POST" || new URL(req.url).pathname !== "/render") {
      return new Response("Not Found", { status: 404 });
    }

    try {
      const { diagram } = await req.json();

      if (!diagram || typeof diagram !== "string") {
        return new Response("Invalid diagram data", { status: 400 });
      }

      const tempInput = path.join(TEMP_DIR, `${Date.now()}.mmd`);
      const tempOutput = path.join(TEMP_DIR, `${Date.now()}.png`);

      await writeFile(tempInput, diagram);

      await run(tempInput, tempOutput, {
        puppeteerConfig: {
          executablePath: process.env.PUPPETEER_EXECUTABLE_PATH || undefined,
          args: ["--no-sandbox", "--disable-setuid-sandbox"],
          headless: "new", // Use new headless mode
        },
      });

      const pngData = await readFile(tempOutput);

      // Cleanup
      await Promise.all([unlink(tempInput).catch(() => {}), unlink(tempOutput).catch(() => {})]);

      return new Response(pngData, {
        headers: { "Content-Type": "image/png" },
      });
    } catch (error) {
      console.error("Error:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
});

console.log(`Server running at http://localhost:${PORT}`);

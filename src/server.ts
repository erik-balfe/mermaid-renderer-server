import { renderMermaid } from "@mermaid-js/mermaid-cli";
import { serve } from "bun";
import puppeteer from "puppeteer-core";

const PORT = 3022;

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

      const browser = await puppeteer.launch({
        executablePath: process.env.PUPPETEER_EXECUTABLE_PATH,
        args: ["--no-sandbox", "--disable-setuid-sandbox"],
        headless: "new",
      });

      try {
        const { data } = await renderMermaid(browser, diagram, "png", {
          backgroundColor: "white",
        });

        return new Response(data, {
          headers: { "Content-Type": "image/png" },
        });
      } finally {
        await browser.close();
      }
    } catch (error) {
      console.error("Error:", error);
      return new Response("Internal Server Error", { status: 500 });
    }
  },
});

console.log(`Server running at http://localhost:${PORT}`);

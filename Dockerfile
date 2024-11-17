FROM oven/bun:1.1.34-slim

WORKDIR /app

# Install Chromium and required fonts
RUN apt-get update && apt-get install -y \
    chromium \
    fonts-ipafont-gothic fonts-wqy-zenhei fonts-thai-tlwg fonts-khmeros fonts-kacst fonts-freefont-ttf \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Create a non-root user
RUN useradd -m -d /home/appuser appuser \
    && chown -R appuser:appuser /app

# Copy application files
COPY package.json bun.lockb ./
RUN bun install

COPY . .
RUN chown -R appuser:appuser /app

RUN mkdir -p /app/temp && chown -R appuser:appuser /app/temp
# Switch to non-root user
USER appuser

ENV PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium

EXPOSE 3022

CMD ["bun", "start"]

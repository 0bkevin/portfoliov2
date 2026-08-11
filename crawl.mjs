import { chromium } from "playwright";

const START_URL = "https://moolaah.finance/";
const ALLOWED_HOST = "moolaah.finance";

const browser = await chromium.launch({ headless: true });
const page = await browser.newPage();

const pending = [START_URL];
const visited = new Set();
const discoveredPaths = new Set();

while (pending.length > 0) {
  const currentUrl = pending.shift();

  if (!currentUrl || visited.has(currentUrl)) {
    continue;
  }

  visited.add(currentUrl);

  try {
    const response = await page.goto(currentUrl, {
      waitUntil: "networkidle",
      timeout: 30_000,
    });

    if (!response || !response.ok()) {
      console.error(`Skipped ${currentUrl}: ${response?.status()}`);
      continue;
    }

    const links = await page.locator("a[href]").evaluateAll((anchors) =>
      anchors.map((anchor) => anchor.href),
    );

    for (const href of links) {
      try {
        const url = new URL(href);

        if (
          url.hostname !== ALLOWED_HOST ||
          !["http:", "https:"].includes(url.protocol)
        ) {
          continue;
        }

        url.hash = "";
        url.search = "";

        const normalizedUrl = url.toString().replace(/\/$/, "") || url.origin;
        const normalizedPath = url.pathname.replace(/\/$/, "") || "/";

        discoveredPaths.add(normalizedPath);

        if (!visited.has(normalizedUrl)) {
          pending.push(normalizedUrl);
        }
      } catch {
        // Ignore malformed URLs.
      }
    }
  } catch (error) {
    console.error(`Failed to crawl ${currentUrl}:`, error.message);
  }
}

console.log(
  [...discoveredPaths].sort((a, b) => a.localeCompare(b)).join("\n"),
);

await browser.close();
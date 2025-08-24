// verifyAllRouterPaths.js
import fs from "fs";
import path from "path";

const ROUTES_DIR = path.join(process.cwd(), "routes");

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  const lines = content.split("\n");

  lines.forEach((line, idx) => {
    const routeMatch = line.match(/router\.(get|post|put|delete|patch)\(([^,]+)/i);
    if (routeMatch) {
      let routePath = routeMatch[2].trim().replace(/['"`]/g, "");
      
      // Check for malformed patterns
      if (
        /\/:?\)/.test(routePath) ||             // weird empty param
        routePath.includes("/:") && routePath.endsWith(":") || // trailing colon
        routePath.includes("undefined")          // accidental undefined
      ) {
        console.log(`❌ Malformed route in ${filePath} line ${idx + 1}: ${routePath}`);
      }
    }
  });
}

function scanDir(dir) {
  fs.readdirSync(dir).forEach(file => {
    const fullPath = path.join(dir, file);
    if (fs.statSync(fullPath).isDirectory()) {
      scanDir(fullPath);
    } else if (file.endsWith(".js")) {
      scanFile(fullPath);
    }
  });
}

console.log("🔎 Scanning all router files for malformed paths...");
scanDir(ROUTES_DIR);
console.log("✅ Scan complete.");

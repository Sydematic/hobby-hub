import fs from "fs";
import path from "path";

// Directory containing your routers
const ROUTES_DIR = path.join(process.cwd(), "routes");

// Regex to find paths with parameters
const PARAM_REGEX = /(['"`])([^'"`]*:[^'"`]+?)\1/g;

function scanFile(filePath) {
  const content = fs.readFileSync(filePath, "utf-8");
  let match;
  let problems = [];

  // Match any route path containing ':'
  while ((match = PARAM_REGEX.exec(content)) !== null) {
    const routePath = match[2];
    // Check for missing parameter name
    const invalidParam = routePath.split("/").find((seg) => seg.startsWith(":") && seg.length === 1);
    if (invalidParam) {
      problems.push(routePath);
    }
  }

  if (problems.length > 0) {
    console.log(`⚠️ Malformed route(s) found in ${filePath}:`);
    problems.forEach((p) => console.log(`   ${p}`));
  }
}

// Recursively scan the routes directory
function scanDir(dir) {
  const files = fs.readdirSync(dir);
  files.forEach((file) => {
    const fullPath = path.join(dir, file);
    const stats = fs.statSync(fullPath);
    if (stats.isDirectory()) {
      scanDir(fullPath);
    } else if (file.endsWith(".js")) {
      scanFile(fullPath);
    }
  });
}

console.log("🔎 Scanning all router files for malformed parameters...");
scanDir(ROUTES_DIR);
console.log("✅ Scan complete.");

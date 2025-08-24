import fs from "fs";
import path from "path";

const routesDir = path.join(process.cwd(), "routes");

fs.readdir(routesDir, (err, files) => {
  if (err) return console.error("Failed to read routes folder:", err);

  files.filter(f => f.endsWith(".js")).forEach(file => {
    const filePath = path.join(routesDir, file);
    const content = fs.readFileSync(filePath, "utf8");

    const lines = content.split("\n");
    lines.forEach((line, idx) => {
      const trimmed = line.trim();
      if (trimmed.startsWith("app.use(")) {
        // Simple check: if it contains "http" somewhere in the use, it’s probably wrong
        if (trimmed.includes("http")) {
          console.log(`${file}:${idx + 1} -> ${trimmed}`);
        }
      }
    });
  });
});

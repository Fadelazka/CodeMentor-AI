import sharp from "sharp";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "..");
const svgPath = path.join(rootDir, "public", "favicon.svg");
const publicDir = path.join(rootDir, "public");

async function generateFavicons() {
  console.log("Generating favicons from:", svgPath);

  const svgBuffer = await fs.readFile(svgPath);
  const render = () => sharp(svgBuffer, { density: 600 });

  const sizes = [16, 32, 48, 96, 180, 192, 512];

  for (const size of sizes) {
    const outputPath = path.join(publicDir, `favicon-${size}x${size}.png`);
    await render().resize(size, size).png().toFile(outputPath);
    console.log(`OK ${size}x${size} -> favicon-${size}x${size}.png`);
  }

  await render().resize(180, 180).png().toFile(path.join(publicDir, "apple-icon.png"));
  console.log("OK 180x180 -> apple-icon.png");

  await render().resize(192, 192).png().toFile(path.join(publicDir, "icon-192.png"));
  console.log("OK 192x192 -> icon-192.png");

  await render().resize(512, 512).png().toFile(path.join(publicDir, "icon-512.png"));
  console.log("OK 512x512 -> icon-512.png");

  try {
    const pngToIco = (await import("png-to-ico")).default;
    const icoBuffer = await pngToIco([
      path.join(publicDir, "favicon-16x16.png"),
      path.join(publicDir, "favicon-32x32.png"),
      path.join(publicDir, "favicon-48x48.png"),
    ]);
    await fs.writeFile(path.join(publicDir, "favicon.ico"), icoBuffer);
    console.log("OK favicon.ico (multi-size)");
  } catch (e) {
    console.warn("WARN png-to-ico failed, skip .ico generation:", e.message);
  }

  console.log("\nAll favicons generated!");
}

generateFavicons().catch((e) => {
  console.error(e);
  process.exit(1);
});

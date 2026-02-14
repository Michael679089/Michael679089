// scripts/postbuild-copy-pagefind.js
// Copies the built Pagefind assets from dist/pagefind to public/pagefind after build for GitHub Pages compatibility.

import fs from "fs";
import path from "path";

const src = path.resolve("dist", "pagefind");
const dest = path.resolve("public", "pagefind");

function copyRecursiveSync(srcDir, destDir) {
	if (!fs.existsSync(srcDir)) return;
	if (!fs.existsSync(destDir)) fs.mkdirSync(destDir, { recursive: true });
	for (const item of fs.readdirSync(srcDir)) {
		const srcPath = path.join(srcDir, item);
		const destPath = path.join(destDir, item);
		if (fs.lstatSync(srcPath).isDirectory()) {
			copyRecursiveSync(srcPath, destPath);
		} else {
			fs.copyFileSync(srcPath, destPath);
		}
	}
}

copyRecursiveSync(src, dest);
console.log(`Copied Pagefind assets from ${src} to ${dest}`);

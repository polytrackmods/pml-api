import fs from "fs";
import path from "path";
import { buildSync } from "esbuild";

const DIST = path.join(process.cwd(), "dist");
const MAIN = "pml-api.mod.js";

// this script just walks through each version folder in the dist directory
// and combines all the JS files into a single minified file named pml-api.mod.js

function processFolder(folder) {
    buildSync({
        entryPoints: [path.join(folder, MAIN)],
        outfile: path.join(folder, MAIN),
        bundle: true,
        minify: true,
        format: "esm",
        target: "es2021",
        sourcemap: false,
        logLevel: "info",
        allowOverwrite: true,
    });

    fs.readdirSync(folder).forEach((file) => {
        if (file !== MAIN && file.endsWith(".js")) {
            fs.unlinkSync(path.join(folder, file));
        }
    });

    console.log(`Processed: ${path.basename(folder)}`);
}

function walk(dir) {
    fs.readdirSync(dir, { withFileTypes: true }).forEach((d) => {
        const full = path.join(dir, d.name);
        if (d.isDirectory()) {
            processFolder(full);
            walk(full);
        }
    });
}

walk(DIST);

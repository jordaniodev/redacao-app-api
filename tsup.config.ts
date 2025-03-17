import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src/**/*.ts"], // Process all TypeScript files except knexFile.ts
    outDir: "build",
    format: ["cjs", "esm"],
    dts: true,
    clean: true,
    skipNodeModulesBundle: true,
  },
  {
    entry: { "knexfile": "knexFile.ts" }, // Ensure this outputs knexfile.cjs
    outDir: "build",
    format: ["cjs"], // Force CommonJS
    dts: false, // No type declarations needed for knexfile
    clean: false,
    skipNodeModulesBundle: true,
  }
]);

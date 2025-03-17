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
    format: ["cjs"],
    dts: false,
    clean: false,
    skipNodeModulesBundle: true,
    legacyOutput: true, 
  }
]);

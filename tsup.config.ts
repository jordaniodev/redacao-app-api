import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/**/*.ts"], // Apenas arquivos TypeScript serão processados
  outDir: "build",
  format: ["cjs", "esm"], // Pode ajustar para o formato desejado
  dts: true, // Gera arquivos de definição de tipos (opcional)
  clean: true, 
  skipNodeModulesBundle: true,
});
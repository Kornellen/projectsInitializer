import { execSync } from "child_process";

export default async function checkFramework(
  framework: "React + Vite" | "Next.js",
  projectDetails: { projectPath: string; projectName: string },
  language: "JavaScript" | "TypeScript"
) {
  switch (framework) {
    case "Next.js":
      const commandNext =
        language === "JavaScript"
          ? `npx create-next-app@latest ${projectDetails.projectName} --js --tailwind --eslint --use-npm --src-dir --no-turbopack --app`
          : `npx create-next-app@latest ${projectDetails.projectName} --ts --tailwind --eslint --use-npm --src-dir --no-turbopack --app`;
      execSync(commandNext, {
        stdio: "inherit",
      });
      break;
    case "React + Vite":
      const commandVite =
        language === "JavaScript"
          ? `npm create vite@latest ${projectDetails.projectName}\\. -- --template react`
          : `npm create vite@latest ${projectDetails.projectName}\\. -- --template react-ts`;
      execSync(commandVite, {
        stdio: "inherit",
      });
      break;
  }
}

import { execSync } from "child_process";
import ErrorHandler from "../../../helpers/ErrorHandler";

export default async function checkFramework(
  framework: "React + Vite" | "Next.js",
  projectDetails: { projectPath: string; projectName: string },
  language: "JavaScript" | "TypeScript"
) {
  try {
    switch (framework) {
      case "Next.js":
        console.log(`Initialization of Next.js + ${language} project...`.blue);
        const commandNext =
          language === "JavaScript"
            ? `npx create-next-app@latest ${projectDetails.projectName} --js --tailwind --eslint --use-npm --src-dir --no-turbopack --app`
            : `npx create-next-app@latest ${projectDetails.projectName} --ts --tailwind --eslint --use-npm --src-dir --no-turbopack --app`;
        execSync(commandNext, {
          stdio: "inherit",
        });
        break;
      case "React + Vite":
        console.log(
          `Initialization of React + Vite + ${language} project...`.blue
        );
        const commandVite =
          language === "JavaScript"
            ? `npm create vite@latest ${projectDetails.projectName}\\. -- --template react`
            : `npm create vite@latest ${projectDetails.projectName}\\. -- --template react-ts`;
        execSync(commandVite, {
          stdio: "inherit",
        });
        break;
    }
  } catch (error) {
    new ErrorHandler(
      error,
      `There was an error creating ${framework} project`
    ).handleError();
  }
}

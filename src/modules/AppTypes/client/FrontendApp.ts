import { execSync } from "child_process";
import { projectDetails } from "../../../helpers";

export default async function checkFramework(
  framework: "React + Vite" | "Next.js"
) {
  const details = await projectDetails("JavaScript");

  switch (framework) {
    case "Next.js":
      execSync(
        `npx create-next-app@latest ${details.projectPath} --js --tailwind --eslint --use-npm --src-dir --no-turbopack --app`,
        {
          stdio: "inherit",
        }
      );
      break;
    case "React + Vite":
      execSync(
        `npm create vite@latest ${details.projectPath} -- --template react`,
        {
          stdio: "inherit",
        }
      );
      break;
  }
}

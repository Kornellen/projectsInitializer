import { exec } from "child_process";

export default async function selectFrontendFramework(
  framework: "React + Vite" | "Next.js",
  projectDetails: projectDetailsType,
  language: "JavaScript" | "TypeScript"
) {
  const FRAMEWORK_INIT_COMMANDS = {
    React: {
      TypeScript: `npm create vite@latest ${projectDetails.projectName}\\. --template react-ts`,
      JavaScript: `npm create vite@latest ${projectDetails.projectName}\\. --template react`,
    },
    Next: {
      TypeScript: `npx create-next-app@latest ${projectDetails.projectName} --ts --tailwind --eslint --use-npm --src-dir --no-turbopack --app`,
      JavaScript: `npx create-next-app@latest ${projectDetails.projectName} --js --tailwind --eslint --use-npm --src-dir --no-turbopack --app`,
    },
  };

  let command = "";

  try {
    switch (framework) {
      case "Next.js":
        console.log(`Initialization of Next.js + ${language} project...`.blue);
        command = FRAMEWORK_INIT_COMMANDS["Next"][language];

        break;
      case "React + Vite":
        console.log(
          `Initialization of React + Vite + ${language} project...`.blue
        );
        command = FRAMEWORK_INIT_COMMANDS["React"][language];
        break;
    }

    const { stderr } = await exec(command);
    if (stderr) console.error(stderr);
  } catch (error) {
    throw new Error(
      `There was an error creating ${framework} project\n${error}`
    );
  }
}

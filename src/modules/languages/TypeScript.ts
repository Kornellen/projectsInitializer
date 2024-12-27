import inquirer from "inquirer";
import { appType } from "../../types/types";
import { execSync } from "child_process";
import ConsoleApp from "../AppTypes/server/ConsoleApp";
import ServerApp from "../AppTypes/server/ServerApp";
import checkFramework from "../AppTypes/client/FrontendApp";
import projectSummary from "../../helpers/creatingSummary";

export default async function TypeScript(
  projectType: "Plain" | "Framework",
  projectInfos: { projectName: string; projectPath: string }
) {
  execSync(`mkdir ${projectInfos.projectPath}`);
  process.chdir(projectInfos.projectPath);

  if (projectType === "Framework") {
    const { app }: { app: appType } = await inquirer.prompt({
      type: "list",
      name: "app",
      message: "Choose App Type",
      choices: ["Frontend", "Backend"],
    });

    switch (app) {
      case "Frontend":
        const { javaScriptFramework } = await inquirer.prompt({
          type: "list",
          name: "javaScriptFramework",
          message: "Choose Framework for Frontend",
          choices: ["React + Vite", "Next.js"],
        });
        checkFramework(javaScriptFramework, projectInfos, "TypeScript");
        break;
      case "Backend":
        ServerApp("TypeScript");
        break;
    }
  } else {
    const { app }: { app: appType } = await inquirer.prompt({
      type: "list",
      name: "app",
      message: "Choose App Type",
      choices: ["Console app"],
    });

    switch (app) {
      case "Console app":
        ConsoleApp("TypeScript");
        break;
    }
  }

  projectSummary(projectInfos, projectType);
}

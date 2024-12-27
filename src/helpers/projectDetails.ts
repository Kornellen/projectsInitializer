import inquirer from "inquirer";
import { languageType } from "../types/types";
import path from "path";

export default async function projectDetails(
  language: languageType
): Promise<{ projectName: string; projectPath: string }> {
  const { projectName } = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Type project name",
      default: `my-${
        language === "C++" ? "cpp" : language.toLowerCase()
      }-project`,
    },
  ]);

  const { projectPath } = await inquirer.prompt({
    type: "input",
    name: "projectPath",
    message: "Type Project Path",
    default: `.\\${projectName}`,
  });

  let finalPath = projectPath;
  if (!projectPath.includes(projectName)) {
    finalPath = path.isAbsolute(projectPath)
      ? projectPath + "\\" + projectName
      : projectPath + "\\" + projectName;
  }

  return {
    projectName,
    projectPath: finalPath.replace("/", "\\"),
  };
}

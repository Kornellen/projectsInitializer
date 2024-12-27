import inquirer from "inquirer";
import { languageType } from "../types/types";

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

  return { projectName, projectPath: projectPath.replace("/", "\\") };
}

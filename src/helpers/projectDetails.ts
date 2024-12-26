import inquirer from "inquirer";
import { languageType } from "../types/types";

export default async function projectDetails(
  language: languageType
): Promise<{ projectName: string; projectPath: string }> {
  const { projectName, projectPath } = await inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Type project name",
      default: `my-${
        language === "C++" ? "cpp" : language.toLowerCase()
      }-project`,
    },
    {
      type: "input",
      name: "projectPath",
      message: "Type Project Path",
      default: `./my-${
        language === "C++" ? "cpp" : language.toLowerCase()
      }-project`,
    },
  ]);

  return { projectName, projectPath: projectPath + `\\${projectName}` };
}

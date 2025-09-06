import { UserInterations } from "./UserInteractions";

export class ProjectDetails {
  public static projectDetails: projectDetailsType;

  public static async SetUpProjectDetails(language: languageType) {
    const { projectName } = await UserInterations.prepareQuestion(
      {
        type: "input",
        name: "projectName",
        message: "Enter your project name",
      },
      {
        default: `my-${
          language === "C++" ? "cpp" : language.toLocaleLowerCase()
        }-project`,
      }
    );

    let { projectPath } = await UserInterations.prepareQuestion(
      {
        type: "input",
        name: "projectPath",
        message:
          "Enter path to your new project (require full path like: C:\\Users\\your_project_name etc.)",
      },
      { default: `.\\${projectName}` }
    );

    if (!projectPath.includes(projectName)) projectPath += "\\" + projectName;

    this.projectDetails = {
      projectName: projectName,
      projectPath: projectPath,
      language: language,
    };
  }
}

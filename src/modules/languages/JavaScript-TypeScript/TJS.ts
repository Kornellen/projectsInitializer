import { FileHelper } from "../../../helpers/FileHelper";
import projectSummary from "../../../helpers/ProjectSummary";
import { UserInterations } from "../../../helpers/UserInteractions";
import selectFrontendFramework from "./AppTypes/client/FrontendApp";
import PlainWithHTMl from "./AppTypes/client/PlainWithHTML";
import ConsoleApp from "./AppTypes/server/ConsoleApp";
import { ServerApp } from "./AppTypes/server/ServerApp";

async function selectAppType(
  app: javaScriptAppType,
  language: "JavaScript" | "TypeScript",
  projectInfos: projectDetailsType
) {
  console.log(language);

  switch (app) {
    case "Frontend":
      const { FrontedFramework } = await UserInterations.prepareQuestion({
        type: "list",
        name: "FrontendFramework",
        message: "Choose Framework for Frontend",
        choices: ["React + Vite", "Next.js"],
      });
      await selectFrontendFramework(FrontedFramework, projectInfos, language);
      break;

    case "Backend":
      await ServerApp.main(language);
      break;

    case "Console":
      await ConsoleApp(language);
      break;

    case "Vanilla":
      if (language === "TypeScript")
        throw new Error("TypeScript is unsupported with this one");
      await PlainWithHTMl();
      break;
  }
}
export default async function TJS(
  projectType: projectAppType,
  projectInfos: projectDetailsType,
  language: "JavaScript" | "TypeScript"
) {
  try {
    projectInfos.projectPath = FileHelper.createDir(projectInfos.projectPath);

    process.chdir(projectInfos.projectPath);

    const { app }: { app: javaScriptAppType } =
      await UserInterations.prepareQuestion({
        type: "list",
        name: "app",
        message: "Choose App Type",
        choices: ["Frontend", "Backend", "Console", "Vanilla"],
      });

    await selectAppType(app, language, projectInfos);

    projectSummary(projectInfos, projectType);
  } catch (error) {
    FileHelper.cleanUpInCaseOfError(
      projectInfos.projectPath,
      error instanceof Error
        ? error.message
        : new Error(
            `There was an error creating ${projectInfos.language} project`
          )
    );
  }
}

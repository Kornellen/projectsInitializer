import { FileHelper } from "../../../helpers/FileHelper";
import projectSummary from "../../../helpers/ProjectSummary";
import { UserInterations } from "../../../helpers/UserInteractions";
import selectFrontendFramework from "./AppTypes/client/FrontendApp";
import ConsoleApp from "./AppTypes/server/ConsoleApp";
import { ServerApp } from "./AppTypes/server/ServerApp";

export default async function TJS(
  projectType: projectAppType,
  projectInfos: projectDetailsType,
  language: "JavaScript" | "TypeScript"
) {
  try {
    projectInfos.projectPath = FileHelper.createDir(projectInfos.projectPath);

    process.chdir(projectInfos.projectPath);

    if (projectType === "Framework") {
      const { app }: { app: javaScriptAppType } =
        await UserInterations.prepareQuestion({
          type: "list",
          name: "app",
          message: "Choose App Type",
          choices: ["Frontend", "Backend"],
        });

      switch (app) {
        case "Frontend":
          const { FrontedFramework } = await UserInterations.prepareQuestion({
            type: "list",
            name: "FrontendFramework",
            message: "Choose Framework for Frontend",
            choices: ["React + Vite", "Next.js"],
          });
          await selectFrontendFramework(
            FrontedFramework,
            projectInfos,
            language
          );
          break;

        case "Backend":
          await ServerApp.main(language);
          break;
      }
    }

    await ConsoleApp(language);

    projectSummary(projectInfos, projectType);
  } catch (error) {
    throw new Error("There was an error creating TypeScript application");
  }
}

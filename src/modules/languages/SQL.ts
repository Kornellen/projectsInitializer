import { FileHelper } from "../../helpers/FileHelper";
import projectSummary from "../../helpers/ProjectSummary";

export default function SQL(
  projectType: projectAppType,
  projectInfos: projectDetailsType
) {
  try {
    console.log(`Initialization of SQL project...`.blue);

    projectInfos.projectPath = FileHelper.createDir(projectInfos.projectPath);

    process.chdir(projectInfos.projectPath);

    FileHelper.createFile(
      `${projectInfos.projectName}.db`,
      "-- SQL code goes here"
    );

    projectSummary(projectInfos, projectType);
  } catch (error) {
    throw new Error(`There was an error creating the SQL project\n${error}`);
  }
}

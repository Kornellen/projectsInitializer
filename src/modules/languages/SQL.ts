import { createFile } from "../../helpers/createDirsFiles";
import fs from "fs";
import projectSummary from "../../helpers/creatingSummary";

export default function SQL(
  projectType: "Plain",
  projectInfos: { projectName: string; projectPath: string }
) {
  if (!fs.existsSync(projectInfos.projectPath)) {
    fs.mkdirSync(projectInfos.projectPath, { recursive: true });
  }

  createFile(
    `${projectInfos.projectPath}/database.db`,
    "-- SQL code goes here"
  );

  projectSummary(projectInfos, projectType);
}

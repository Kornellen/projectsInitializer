import { FileHelper } from "../../helpers/FileHelper";
import projectSummary from "../../helpers/ProjectSummary";

export default function Cpp(
  projectType: projectAppType,
  projectInfos: projectDetailsType
) {
  try {
    console.log(`Initialization of C++ project...`.blue);
    projectInfos.projectPath = FileHelper.createDir(projectInfos.projectPath);

    FileHelper.createFile(
      `${projectInfos.projectPath}/main.cpp`,
      `// C++ script code goes here
      #include <iostream>`
    );

    projectSummary(projectInfos, projectType);
  } catch (error) {
    throw new Error(`There was an error creating C++ project\n${error}`);
  }
}

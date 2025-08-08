import { Cpp, TJS, Pwsh, Python, SQL } from "../modules";
import { ProjectDetails } from "./ProjectDetails";
export default async function selectLanguage(
  language: languageType,
  projectType: projectAppType
) {
  const projectInfos = await ProjectDetails.projectDetails;

  switch (language) {
    case "C++":
      Cpp(projectType, projectInfos);
      break;
    case "JavaScript":
      TJS(projectType, projectInfos, "JavaScript");
      break;
    case "PowerShell":
      Pwsh(projectType, projectInfos);
      break;
    case "Python":
      Python(projectType, projectInfos);
      break;
    case "SQL":
      SQL(projectType, projectInfos);
      break;
    case "TypeScript":
      TJS(projectType, projectInfos, "TypeScript");
      break;
  }
}

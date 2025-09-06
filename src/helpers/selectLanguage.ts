import { Cpp, TJS, Pwsh, Python, SQL } from "../modules";
import { ProjectDetails } from "./ProjectDetails";
export default async function selectLanguage(
  language: languageType,
  projectType: projectAppType
) {
  const projectInfos = ProjectDetails.projectDetails;

  switch (language) {
    case "C++":
      Cpp(projectType, projectInfos);
      break;
    case "TypeScript":
    case "JavaScript":
      TJS(projectType, projectInfos, language);
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
  }
}

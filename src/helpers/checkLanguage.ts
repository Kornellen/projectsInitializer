import { Cpp, JavaScript, Pwsh, Python, SQL, TypeScript } from "../modules";
import { languageType } from "../types/types";
import projectDetails from "./projectDetails";

export default async function checkLanguage(
  language: languageType,
  projectType: "Plain" | "Framework"
) {
  const projectInfos = await projectDetails(language);

  switch (language) {
    case "C++":
      projectType = "Plain";
      Cpp(projectType, projectInfos);
      break;
    case "JavaScript":
      JavaScript(projectType, projectInfos);
      break;
    case "PowerShell":
      projectType = "Plain";
      Pwsh(projectType, projectInfos);
      break;
    case "Python":
      projectType = "Plain";
      Python(projectType, projectInfos);
      break;
    case "SQL":
      projectType = "Plain";
      SQL(projectType, projectInfos);
      break;
    case "TypeScript":
      TypeScript(projectType, projectInfos);
      break;
  }
}

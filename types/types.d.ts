declare global {
  type languageType =
    | "Python"
    | "TypeScript"
    | "JavaScript"
    | "C++"
    | "PowerShell"
    | "SQL";

  type javaScriptAppType = "Frontend" | "Backend" | "Console" | "Vanilla";

  type projectAppType = "Plain" | "Framework";

  type projectDetailsType = {
    projectName: string;
    projectPath: string;
    language: languageType;
  };
}

export {};

declare global {
  type languageType =
    | "Python"
    | "TypeScript"
    | "JavaScript"
    | "C++"
    | "PowerShell"
    | "SQL";

  type javaScriptAppType =
    | "Frontend"
    | "Backend"
    | "Console app"
    | "Plain with HTML";

  type projectAppType = "Plain" | "Framework";

  type projectDetailsType = {
    projectName: string;
    projectPath: string;
  };
}

export {};

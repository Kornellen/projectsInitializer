#!/usr/bin/env node
"use strict";
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// src/helpers/FileHelper.ts
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var FileHelper = class {
  static createUniqueDirectory(createPath, counter = 1) {
    let dir = createPath;
    let counterValue = counter;
    if (!import_fs.default.existsSync(dir)) return dir;
    if (!isNaN(Number(dir[dir.length - 1]))) {
      dir = dir.replace(dir[dir.length - 1], `${counterValue}`);
    } else dir += `_${counterValue}`;
    return this.createUniqueDirectory(dir, counterValue + 1);
  }
  static createDir(pathToDir) {
    try {
      const dir = this.createUniqueDirectory(pathToDir);
      import_fs.default.mkdirSync(dir, { recursive: true });
      return dir;
    } catch (error) {
      throw new Error(
        `There was an error creating project directory
${error}`
      );
    }
  }
  static createFile(fileName, fileContent = "") {
    try {
      import_fs.default.writeFileSync(fileName, fileContent, { encoding: "utf-8" });
    } catch (error) {
      throw new Error(`There was an error creating file
${error}`);
    }
  }
  static async cleanUpInCaseOfError(projectPath, error) {
    try {
      console.log(String(error).red.bold);
      process.chdir("../");
      await import_fs.default.promises.rm(projectPath, { recursive: true, force: true });
      console.error(
        `[Error]: ${error}
Removing directory at ${import_path.default.resolve(projectPath)}`
      );
    } catch (error2) {
      console.error(error2);
    }
  }
};

// src/helpers/ProjectSummary.ts
var import_table = require("table");
function projectSummary(projectInfos, projectType) {
  const dateOfCreation = (/* @__PURE__ */ new Date()).toLocaleTimeString();
  const summaryData = [
    ["Location", "Time of creation", "Language", "Type", "Name"],
    [
      projectInfos.projectPath,
      dateOfCreation,
      projectInfos.language,
      projectType,
      projectInfos.projectName
    ]
  ];
  console.log((0, import_table.table)(summaryData));
  console.log("Good Luck!");
}

// src/modules/languages/Cpp.ts
function Cpp(projectType, projectInfos) {
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
    FileHelper.cleanUpInCaseOfError(
      projectInfos.projectPath,
      error instanceof Error ? error.message : new Error(
        `There was an error creating ${projectInfos.language} project`
      )
    );
  }
}

// src/modules/languages/Pwsh.ts
function Pwsh(projectType, projectInfos) {
  try {
    console.log(`Initialization of PowerShell project...`.blue);
    projectInfos.projectPath = FileHelper.createDir(projectInfos.projectPath);
    FileHelper.createFile(
      `${projectInfos.projectPath}/script.ps1`,
      "# PowerShell script code goes here"
    );
    projectSummary(projectInfos, projectType);
  } catch (error) {
    FileHelper.cleanUpInCaseOfError(
      projectInfos.projectPath,
      error instanceof Error ? error.message : new Error(
        `There was an error creating ${projectInfos.language} project`
      )
    );
  }
}

// src/modules/languages/Python.ts
var import_child_process2 = require("child_process");

// src/helpers/UserInteractions.ts
var import_inquirer = __toESM(require("inquirer"));
var UserInterations = class {
  static async prepareQuestion({ type, name, message, choices }, other) {
    if (choices) {
      return await import_inquirer.default.prompt([
        {
          type,
          name,
          message,
          choices,
          ...other
        }
      ]);
    }
    return await import_inquirer.default.prompt([
      { type, name, message, ...other }
    ]);
  }
};

// src/helpers/DependencyInstaller.ts
var import_os = __toESM(require("os"));
var import_child_process = __toESM(require("child_process"));
var DependencyInstaller = class {
  static LANGUAGE_COMMANDS = {
    JavaScript: {
      Dev: (dependencies) => `npm i -D ${dependencies}`,
      Classic: (dependencies) => `npm i ${dependencies}`
    },
    Python: {
      Dev: (dependencies) => {
        return import_os.default.platform() === "win32" ? `venv\\Scripts\\Activate.ps1 && pip install ${dependencies}` : `venv\\bin\\activate && venv\\bin\\pip install ${dependencies}`;
      },
      Classic: (dependencies) => `pip install ${dependencies}`
    }
  };
  static DEFAULT_DEPENDENCIES = {
    JavaScript: [],
    TypeScript: ["typescript", "ts-node", "@types/node"],
    Python: []
  };
  static async dependencyHandler(language) {
    const { dependenciesToInstall } = await UserInterations.prepareQuestion({
      type: "input",
      name: "dependenciesToInstall",
      message: "Enter additional dependencies to install"
    });
    const { isDevMode } = await UserInterations.prepareQuestion(
      {
        type: "confirm",
        name: "isDevMode",
        message: "Installing as Dev/Virutal Dependencies?"
      },
      { default: false }
    );
    if (language === "TypeScript") {
      await this.setUpTypeScript();
    }
    this.dependencyInstaller(language, dependenciesToInstall, isDevMode);
  }
  static async dependencyInstaller(language, dependenciesToInstall, isDevMode) {
    try {
      const installationVariant = isDevMode ? "Dev" : "Classic";
      let command = "";
      if (language === "JavaScript" || language === "TypeScript")
        command = this.LANGUAGE_COMMANDS["JavaScript"][installationVariant](
          dependenciesToInstall
        );
      if (language === "Python")
        command = this.LANGUAGE_COMMANDS["Python"][installationVariant](
          dependenciesToInstall
        );
      let response = import_child_process.default.exec(command);
      return response.exitCode;
    } catch (error) {
      console.log(error);
      throw new Error(`There was an Error installing Dependencies!
${error}`);
    }
  }
  static async setUpTypeScript() {
    try {
      let command = this.LANGUAGE_COMMANDS["JavaScript"]["Dev"](
        this.DEFAULT_DEPENDENCIES["TypeScript"].join(" ")
      );
      command += "&& npx tsc --init";
      console.log(command);
      import_child_process.default.exec(
        command,
        (error) => error ? console.error(error) : null
      );
    } catch (error) {
      throw new Error(`There was an error seting up TypeScript
${error}`);
    }
  }
  static async defaultDepInstaller(lang, deps, isDev) {
    console.log("Installing default libraries...");
    const installer = await this.dependencyInstaller(
      lang,
      deps.join(" "),
      isDev
    );
    if (installer) {
      return 1;
    }
    return 0;
  }
};

// src/modules/languages/Python.ts
async function Python(projectType, projectInfos) {
  try {
    projectInfos.projectPath = FileHelper.createDir(projectInfos.projectPath);
    process.chdir(projectInfos.projectPath);
    FileHelper.createFile(`main.py`, "# Python code goes here");
    const { isVenv } = await UserInterations.prepareQuestion(
      {
        type: "confirm",
        name: "isVenv",
        message: "Would you like to create Virttual Environment for dependencies?"
      },
      { default: true }
    );
    if (isVenv) {
      try {
        console.log("Creating virtual environment...".blue);
        (0, import_child_process2.execSync)("python -m venv venv");
      } catch (error) {
        throw new Error(
          `There was an error creating the Python Virtual Environment!
${error}`
        );
      }
    }
    const { isAdditionalLibraries } = await UserInterations.prepareQuestion(
      {
        type: "confirm",
        name: "isAdditionalLibraries",
        message: "Would you like to install any dependencies?"
      },
      { default: false }
    );
    if (isAdditionalLibraries)
      await DependencyInstaller.dependencyHandler("Python");
    projectSummary(projectInfos, projectType);
  } catch (error) {
    FileHelper.cleanUpInCaseOfError(
      projectInfos.projectPath,
      error instanceof Error ? error.message : new Error(
        `There was an error creating ${projectInfos.language} project`
      )
    );
  }
}

// src/modules/languages/SQL.ts
function SQL(projectType, projectInfos) {
  try {
    console.log(`Initialization of SQL project...`.blue);
    projectInfos.projectPath = FileHelper.createDir(projectInfos.projectPath);
    process.chdir(projectInfos.projectPath);
    FileHelper.createFile(
      `${projectInfos.projectName}.sql`,
      "-- SQL code goes here"
    );
    projectSummary(projectInfos, projectType);
  } catch (error) {
    FileHelper.cleanUpInCaseOfError(
      projectInfos.projectPath,
      error instanceof Error ? error.message : new Error(
        `There was an error creating ${projectInfos.language} project`
      )
    );
  }
}

// src/modules/languages/JavaScript-TypeScript/AppTypes/client/FrontendApp.ts
var import_child_process3 = require("child_process");
async function selectFrontendFramework(framework, projectDetails, language) {
  const FRAMEWORK_INIT_COMMANDS = {
    React: {
      TypeScript: `npm create vite@latest ${projectDetails.projectName}\\. --template react-ts`,
      JavaScript: `npm create vite@latest ${projectDetails.projectName}\\. --template react`
    },
    Next: {
      TypeScript: `npx create-next-app@latest ${projectDetails.projectName} --ts --tailwind --eslint --use-npm --src-dir --no-turbopack --app`,
      JavaScript: `npx create-next-app@latest ${projectDetails.projectName} --js --tailwind --eslint --use-npm --src-dir --no-turbopack --app`
    }
  };
  let command = "";
  try {
    switch (framework) {
      case "Next.js":
        console.log(`Initialization of Next.js + ${language} project...`.blue);
        command = FRAMEWORK_INIT_COMMANDS["Next"][language];
        break;
      case "React + Vite":
        console.log(
          `Initialization of React + Vite + ${language} project...`.blue
        );
        command = FRAMEWORK_INIT_COMMANDS["React"][language];
        break;
    }
    const { stderr } = await (0, import_child_process3.exec)(command);
    if (stderr) console.error(stderr);
  } catch (error) {
    throw new Error(
      `There was an error creating ${framework} project
${error}`
    );
  }
}

// src/modules/languages/JavaScript-TypeScript/AppTypes/client/PlainWithHTML.ts
function PlainWithHTMl() {
  try {
    const files = [
      { file: "index.html", content: `<script src="./app.js"></script>` },
      { file: "style.css", content: "/*CSS Stylesheet*/" },
      { file: "app.js", content: "// JavaScript code" }
    ];
    files.forEach((file) => {
      FileHelper.createFile(file.file, file.content);
    });
  } catch (error) {
    throw new Error(`There was an error creating vanilla JavaScript Project`);
  }
}

// src/modules/languages/JavaScript-TypeScript/AppTypes/server/ConsoleApp.ts
var import_child_process4 = require("child_process");
async function ConsoleApp(language) {
  try {
    console.log("Initialization of Console App...".blue);
    (0, import_child_process4.execSync)("npm init -y");
    if (language === "TypeScript") {
      console.log("Initializing TypeScript...");
      await DependencyInstaller.dependencyHandler("TypeScript");
    }
    const { isAdditionalDependencies } = await UserInterations.prepareQuestion({
      type: "confirm",
      name: "isAdditionalDependencies",
      message: "Do you want to install other dependencies?"
    });
    if (isAdditionalDependencies)
      DependencyInstaller.dependencyHandler(language);
    FileHelper.createDir("./src");
  } catch (error) {
    throw new Error(
      `There was an error creating new Console App with ${language}`
    );
  }
}

// src/modules/languages/JavaScript-TypeScript/AppTypes/server/ServerApp.ts
var import_child_process5 = require("child_process");
var ServerApp = class {
  static DEFAULT_SERVER_DEPS = [
    "express",
    "express-validator",
    "cors",
    "dotenv",
    "http"
  ];
  static DEFAULT_APP_STRUCTURE = [
    "src",
    "src/config",
    "src/routes",
    "src/controllers",
    "src/middlewares",
    "src/helpers"
  ];
  static async main(language) {
    try {
      (0, import_child_process5.execSync)("npm init -y");
      if (language === "TypeScript") {
        console.log("Initializing TypeScript...");
        await DependencyInstaller.setUpTypeScript();
      }
      const isError = await DependencyInstaller.defaultDepInstaller(
        "JavaScript",
        this.DEFAULT_SERVER_DEPS,
        false
      );
      if (isError) {
        throw new Error(
          "There was an error installing default server libraries"
        );
      }
      const { isAdditionalDependencies } = await UserInterations.prepareQuestion({
        type: "confirm",
        name: "isAdditionalLibraries",
        message: `Is Backend App use other libraries? (Currently installed:
${this.DEFAULT_SERVER_DEPS.join(
          ",\n"
        )})`
      });
      if (isAdditionalDependencies)
        await DependencyInstaller.dependencyHandler(language);
      this.DEFAULT_APP_STRUCTURE.forEach(
        (directory) => FileHelper.createDir(directory)
      );
    } catch (error) {
      console.log(error);
      throw new Error("There was an error creating new Server App");
    }
  }
};

// src/modules/languages/JavaScript-TypeScript/TJS.ts
async function selectAppType(app, language, projectInfos) {
  console.log(language);
  switch (app) {
    case "Frontend":
      const { FrontedFramework } = await UserInterations.prepareQuestion({
        type: "list",
        name: "FrontendFramework",
        message: "Choose Framework for Frontend",
        choices: ["React + Vite", "Next.js"]
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
async function TJS(projectType, projectInfos, language) {
  try {
    projectInfos.projectPath = FileHelper.createDir(projectInfos.projectPath);
    process.chdir(projectInfos.projectPath);
    const { app } = await UserInterations.prepareQuestion({
      type: "list",
      name: "app",
      message: "Choose App Type",
      choices: ["Frontend", "Backend", "Console", "Vanilla"]
    });
    await selectAppType(app, language, projectInfos);
    projectSummary(projectInfos, projectType);
  } catch (error) {
    FileHelper.cleanUpInCaseOfError(
      projectInfos.projectPath,
      error instanceof Error ? error.message : new Error(
        `There was an error creating ${projectInfos.language} project`
      )
    );
  }
}

// src/helpers/ProjectDetails.ts
var ProjectDetails = class {
  static projectDetails;
  static async SetUpProjectDetails(language) {
    const { projectName } = await UserInterations.prepareQuestion(
      {
        type: "input",
        name: "projectName",
        message: "Enter your project name"
      },
      {
        default: `my-${language === "C++" ? "cpp" : language.toLocaleLowerCase()}-project`
      }
    );
    let { projectPath } = await UserInterations.prepareQuestion(
      {
        type: "input",
        name: "projectPath",
        message: "Enter path to your new project (require full path like: C:\\Users\\your_project_name etc.)"
      },
      { default: `.\\${projectName}` }
    );
    if (!projectPath.includes(projectName)) projectPath += "\\" + projectName;
    this.projectDetails = {
      projectName,
      projectPath,
      language
    };
  }
};

// src/helpers/selectLanguage.ts
async function selectLanguage(language, projectType) {
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

// src/index.ts
var import_colors = __toESM(require("colors"));

// src/helpers/ErrorHandler.ts
var ErrorHandler = class {
  error;
  message;
  constructor(error, message) {
    this.error = error;
    this.message = message;
  }
  logError() {
    console.error(`[Error Handler - Error]: ${this.message}`.red);
    if (this.error instanceof Error) {
      console.error(
        `[Error Handler - Error Details]: ${this.error.message}`.yellow
      );
    } else {
      console.error(` [Error Handler - Error Details]: ${this.error}`.yellow);
    }
  }
  handleError() {
    this.logError();
    FileHelper.cleanUpInCaseOfError(process.cwd(), this.error);
    console.log("Exiting process...".gray);
    process.exit(1);
  }
  static handleSIGNINT() {
    process.on("SIGINT", () => {
      console.log("Received SIGINT signal. Exiting process...".yellow);
      FileHelper.cleanUpInCaseOfError(process.cwd(), "Recived SIGINT");
      process.exit(1);
    });
  }
};
var ErrorHandler_default = ErrorHandler;

// src/index.ts
import_colors.default.enable();
var App = class {
  static LANGUAGES_WITHOUT_FRAMEWORK_SUPPORT = [
    "SQL",
    "PowerShell",
    "C++",
    "Python"
  ];
  static projectAppType = "Plain";
  static async main() {
    try {
      ErrorHandler_default.handleSIGNINT();
      const { language } = await UserInterations.prepareQuestion({
        type: "list",
        name: "language",
        message: "Choose Language for Project",
        choices: [
          "Python",
          "TypeScript",
          "JavaScript",
          "C++",
          "PowerShell",
          "SQL"
        ]
      });
      if (this.isSupportedLanguageFramework(language)) {
        const { projectAppType } = await UserInterations.prepareQuestion({
          type: "list",
          name: "projectAppType",
          message: "Choose Project App type",
          choices: ["Plain", "Framework"]
        });
        this.projectAppType = projectAppType;
      }
      await ProjectDetails.SetUpProjectDetails(language);
      selectLanguage(language, this.projectAppType);
    } catch (error) {
      throw new Error("There was an error");
    }
  }
  static isSupportedLanguageFramework(language) {
    return !this.LANGUAGES_WITHOUT_FRAMEWORK_SUPPORT.includes(language);
  }
};
App.main();
//# sourceMappingURL=index.js.map
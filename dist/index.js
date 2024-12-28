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
var __async = (__this, __arguments, generator) => {
  return new Promise((resolve, reject) => {
    var fulfilled = (value) => {
      try {
        step(generator.next(value));
      } catch (e) {
        reject(e);
      }
    };
    var rejected = (value) => {
      try {
        step(generator.throw(value));
      } catch (e) {
        reject(e);
      }
    };
    var step = (x) => x.done ? resolve(x.value) : Promise.resolve(x.value).then(fulfilled, rejected);
    step((generator = generator.apply(__this, __arguments)).next());
  });
};

// src/index.ts
var import_inquirer8 = __toESM(require("inquirer"));

// src/modules/languages/Cpp.ts
function Cpp(projectType, projectInfos) {
}

// src/modules/languages/JavaScript.ts
var import_inquirer4 = __toESM(require("inquirer"));

// src/modules/AppTypes/server/ConsoleApp.ts
var import_child_process3 = require("child_process");
var import_inquirer2 = __toESM(require("inquirer"));

// src/helpers/additionalLibraries.ts
var import_inquirer = __toESM(require("inquirer"));

// src/helpers/packageInstallers.ts
var import_child_process2 = require("child_process");

// src/helpers/ErrorHandler.ts
var import_child_process = require("child_process");
var import_os = __toESM(require("os"));
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var ErrorHandler = class {
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
  cleanUp(directory) {
    try {
      const command = import_os.default.platform() === "win32" ? `rmdir /s /q "${directory}"` : `rm -rf ${directory}`;
      if (import_fs.default.existsSync(directory)) {
        console.log(`Cleaning up directory: ${directory}`.yellow);
        process.chdir(`${import_path.default.dirname(directory)}`);
        (0, import_child_process.execSync)(command, { stdio: "inherit" });
      } else {
        console.warn(`Directory does not exist: ${directory}`.yellow);
      }
      console.log(`Cleanup successful.`.green);
    } catch (cleanupError) {
      console.error(`Error during cleanup: ${cleanupError}`.red);
    }
  }
  handleError() {
    this.logError();
    this.cleanUp(process.cwd());
    console.log("Exiting process...".gray);
    process.exit(1);
  }
  static handleSIGNINT() {
    process.on("SIGINT", () => {
      console.log("Received SIGINT signal. Exiting process...".yellow);
      process.exit(1);
    });
  }
};
var ErrorHandler_default = ErrorHandler;

// src/helpers/packageInstallers.ts
function npmPackageInstaller(saveDev, packageLists) {
  return __async(this, null, function* () {
    try {
      const command = `npm install ${packageLists.join(" ")} ${saveDev ? "--save-dev" : ""}`;
      (0, import_child_process2.execSync)(command);
    } catch (error) {
      new ErrorHandler_default(
        error,
        `There was an error installing the npm package`
      ).handleError();
    }
  });
}
function pipPackageInstaller(packageLists) {
  return __async(this, null, function* () {
    try {
      const command = `venv\\Scripts\\activate && pip install ${packageLists.join(
        " "
      )}`;
      (0, import_child_process2.execSync)(command);
    } catch (error) {
      new ErrorHandler_default(
        error,
        `There was an error installing the pip package`
      ).handleError();
    }
  });
}

// src/helpers/additionalLibraries.ts
function additionalLibraries(language) {
  return __async(this, null, function* () {
    const { additionalLibraries: additionalLibraries2 } = yield import_inquirer.default.prompt({
      type: "input",
      name: "additionalLibraries",
      message: "Type Additional Libraries to install"
    });
    if (language === "Python") {
      pipPackageInstaller(additionalLibraries2.split(" "));
    } else if (language === "JavaScript" || language === "TypeScript") {
      const { saveDev } = yield import_inquirer.default.prompt({
        type: "confirm",
        name: "saveDev",
        message: "Save Developer mode? (default: No)",
        default: false
      });
      npmPackageInstaller(saveDev, additionalLibraries2.split(" "));
    } else {
      return;
    }
  });
}

// src/helpers/createDirsFiles.ts
var import_fs2 = __toESM(require("fs"));
var uniqueDir = (path3) => {
  let dir = path3;
  let counter = 1;
  while (import_fs2.default.existsSync(dir)) {
    dir = path3 + `-${counter}`;
    counter++;
  }
  return dir;
};
var createDir = (dirName) => {
  const dir = uniqueDir(dirName);
  try {
    import_fs2.default.mkdirSync(dir, { recursive: true });
    return dir;
  } catch (error) {
    new ErrorHandler_default(
      error,
      "There was an error creating the directory"
    ).handleError();
    throw error;
  }
};
var createFile = (fileName, fileContent = "") => {
  try {
    import_fs2.default.writeFileSync(fileName, fileContent, { encoding: "utf8" });
  } catch (error) {
    new ErrorHandler_default(
      error,
      "There was an error creating the file"
    ).handleError();
  }
};

// src/modules/AppTypes/server/ConsoleApp.ts
function ConsoleApp(language) {
  return __async(this, null, function* () {
    try {
      console.log("Initialization of Console App...".blue);
      (0, import_child_process3.execSync)("npm init -y");
      if (language === "TypeScript") {
        npmPackageInstaller(true, ["typescript", "ts-node", "@types/node"]);
        (0, import_child_process3.execSync)("npx tsc --init", { stdio: "inherit" });
      }
      const { isAdditionalLibraries } = yield import_inquirer2.default.prompt({
        type: "confirm",
        name: "isAdditionalLibraries",
        message: "Is your app use additional libraries?"
      });
      if (isAdditionalLibraries) {
        additionalLibraries(language);
      }
      createDir("./src");
    } catch (error) {
      new ErrorHandler_default(
        error,
        "There was an error creating the console app."
      ).handleError();
    }
  });
}

// src/modules/AppTypes/server/ServerApp.ts
var import_child_process4 = require("child_process");
var import_inquirer3 = __toESM(require("inquirer"));
function configureHTTPS(dirs, isHTTPS) {
  if (isHTTPS) {
    dirs.push("certificates");
  }
}
function setupTypeScript(typeScriptPack) {
  return __async(this, null, function* () {
    try {
      console.log("Setting up TypeScript...".blue);
      npmPackageInstaller(true, typeScriptPack);
      (0, import_child_process4.execSync)("tsc --init");
    } catch (error) {
      new ErrorHandler_default(
        error,
        "There was an error setting up TypeScript"
      ).handleError();
    }
  });
}
function ServerApp(language) {
  return __async(this, null, function* () {
    try {
      console.log("Initialization of Server App...".blue);
      (0, import_child_process4.execSync)("npm init -y");
      const { isHTTPS } = yield import_inquirer3.default.prompt({
        type: "confirm",
        name: "isHTTPS",
        message: "Is Backend APP use HTTPS Protocol?"
      });
      const typeScriptPack = [
        "typescript",
        "ts-node",
        "tsc",
        "@types/node",
        "@types/express",
        "@types/cors",
        "@types/express-validator"
      ];
      const dirs = [
        "src",
        "src/config",
        "src/routes",
        "src/controllers",
        "src/middlewares",
        "src/helpers"
      ];
      const defautlLib = [
        "express",
        "express-validator",
        "cors",
        "dotenv",
        "https",
        "http"
      ];
      if (language === "TypeScript") {
        yield setupTypeScript(typeScriptPack);
      }
      npmPackageInstaller(false, defautlLib);
      const { isAdditionalLibraries } = yield import_inquirer3.default.prompt({
        type: "confirm",
        name: "isAdditionalLibraries",
        message: `Is Backend App use other libraries? (Currently installed: ${language === "TypeScript" ? defautlLib.concat(typeScriptPack).join(", ") : defautlLib.join(", ")})`
      });
      if (isAdditionalLibraries) {
        additionalLibraries("JavaScript");
      }
      configureHTTPS(dirs, isHTTPS);
      console.log(`Creating app at ${process.cwd()}...`);
      dirs.forEach((dir) => {
        createDir(dir);
      });
    } catch (error) {
      new ErrorHandler_default(
        error,
        "There was an error creating Server App"
      ).handleError();
    }
  });
}

// src/modules/AppTypes/client/PlainWithHTML.ts
function PlainWithHTMl() {
  return __async(this, null, function* () {
    try {
      const files = [
        { file: "index.html", content: `<script src="./app.js"></script>` },
        { file: "style.css", content: "/*CSS Stylesheet*/" },
        { file: "app.js", content: "// JavaScript code" }
      ];
      files.forEach((file) => {
        createFile(file.file, file.content);
      });
    } catch (error) {
      new ErrorHandler_default(
        error,
        "There was an error creating the Plain Js with HTML project"
      ).handleError();
    }
  });
}

// src/modules/AppTypes/client/FrontendApp.ts
var import_child_process5 = require("child_process");
function checkFramework(framework, projectDetails2, language) {
  return __async(this, null, function* () {
    try {
      switch (framework) {
        case "Next.js":
          console.log(`Initialization of Next.js + ${language} project...`.blue);
          const commandNext = language === "JavaScript" ? `npx create-next-app@latest ${projectDetails2.projectName} --js --tailwind --eslint --use-npm --src-dir --no-turbopack --app` : `npx create-next-app@latest ${projectDetails2.projectName} --ts --tailwind --eslint --use-npm --src-dir --no-turbopack --app`;
          (0, import_child_process5.execSync)(commandNext, {
            stdio: "inherit"
          });
          break;
        case "React + Vite":
          console.log(
            `Initialization of React + Vite + ${language} project...`.blue
          );
          const commandVite = language === "JavaScript" ? `npm create vite@latest ${projectDetails2.projectName}\\. -- --template react` : `npm create vite@latest ${projectDetails2.projectName}\\. -- --template react-ts`;
          (0, import_child_process5.execSync)(commandVite, {
            stdio: "inherit"
          });
          break;
      }
    } catch (error) {
      new ErrorHandler_default(
        error,
        `There was an error creating ${framework} project`
      ).handleError();
    }
  });
}

// src/helpers/creatingSummary.ts
function projectSummary(projectInfos, projectType) {
  const dateOfCreation = (/* @__PURE__ */ new Date()).toLocaleTimeString();
  return console.log(
    `Project created at ${projectInfos.projectPath} | Time: ${dateOfCreation} | Project Type: ${projectType} | Project Name: ${projectInfos.projectName} | Good Luck!`.bgBlue
  );
}

// src/modules/languages/JavaScript.ts
function JavaScript(projectType, projectInfos) {
  return __async(this, null, function* () {
    try {
      projectInfos.projectPath = createDir(projectInfos.projectPath);
      process.chdir(projectInfos.projectPath);
      if (projectType === "Framework") {
        const { app: app2 } = yield import_inquirer4.default.prompt({
          type: "list",
          name: "app",
          message: "Choose App Type",
          choices: ["Frontend", "Backend"]
        });
        switch (app2) {
          case "Frontend":
            const { javaScriptFramework } = yield import_inquirer4.default.prompt({
              type: "list",
              name: "javaScriptFramework",
              message: "Choose Framework for Frontend",
              choices: ["React + Vite", "Next.js"]
            });
            yield checkFramework(javaScriptFramework, projectInfos, "JavaScript");
            break;
          case "Backend":
            yield ServerApp("JavaScript");
            break;
        }
      } else {
        const { app: app2 } = yield import_inquirer4.default.prompt({
          type: "list",
          name: "app",
          message: "Choose App Type",
          choices: ["Console app", "Plain with HTML"]
        });
        switch (app2) {
          case "Console app":
            yield ConsoleApp("JavaScript");
            break;
          case "Plain with HTML":
            yield PlainWithHTMl();
            break;
        }
      }
      yield projectSummary(projectInfos, projectType);
    } catch (error) {
      new ErrorHandler_default(
        error,
        "There was an error creating the JavaScript project"
      ).handleError();
    }
  });
}

// src/modules/languages/Pwsh.ts
function Pwsh(projectType, projectInfos) {
  return __async(this, null, function* () {
    try {
      console.log(`Initialization of PowerShell project...`.blue);
      projectInfos.projectPath = createDir(projectInfos.projectPath);
      createFile(
        `${projectInfos.projectPath}/script.ps1`,
        "# PowerShell script code goes here"
      );
      yield projectSummary(projectInfos, projectType);
    } catch (error) {
      new ErrorHandler_default(
        error,
        `There was an error creating the PowerShell project`
      ).handleError();
    }
  });
}

// src/modules/languages/Python.ts
var import_inquirer5 = __toESM(require("inquirer"));
var import_child_process6 = require("child_process");
function Python(projectType, projectInfos) {
  return __async(this, null, function* () {
    try {
      projectInfos.projectPath = createDir(projectInfos.projectPath);
      process.chdir(projectInfos.projectPath);
      createFile(`main.py`, "# Python code goes here");
      const { isVenv } = yield import_inquirer5.default.prompt({
        type: "confirm",
        name: "isVenv",
        message: "Is your app use virual environment for packages?",
        default: true
      });
      if (isVenv) {
        try {
          console.log("Creating virtual environment...".blue);
          (0, import_child_process6.execSync)("python -m venv venv");
        } catch (error) {
          new ErrorHandler_default(
            error,
            `There was an error creating the Python Virtual Environment`
          ).handleError();
        }
      }
      const { isAdditionalLibraries } = yield import_inquirer5.default.prompt({
        type: "confirm",
        name: "isAdditionalLibraries",
        message: "Is your app use additional libraries?"
      });
      if (isAdditionalLibraries) {
        additionalLibraries("Python");
      }
      yield projectSummary(projectInfos, projectType);
    } catch (error) {
      new ErrorHandler_default(
        error,
        `There was an error creating the Python project`
      ).handleError();
    }
  });
}

// src/modules/languages/SQL.ts
function SQL(projectType, projectInfos) {
  return __async(this, null, function* () {
    try {
      console.log(`Initialization of SQL project...`.blue);
      projectInfos.projectPath = createDir(projectInfos.projectPath);
      process.chdir(projectInfos.projectPath);
      createFile(`database.db`, "-- SQL code goes here");
      yield projectSummary(projectInfos, projectType);
    } catch (error) {
      new ErrorHandler_default(
        error,
        `There was an error creating the PowerShell project`
      ).handleError();
    }
  });
}

// src/modules/languages/TypeScript.ts
var import_inquirer6 = __toESM(require("inquirer"));
function TypeScript(projectType, projectInfos) {
  return __async(this, null, function* () {
    try {
      projectInfos.projectPath = createDir(projectInfos.projectPath);
      process.chdir(projectInfos.projectPath);
      if (projectType === "Framework") {
        const { app: app2 } = yield import_inquirer6.default.prompt({
          type: "list",
          name: "app",
          message: "Choose App Type",
          choices: ["Frontend", "Backend"]
        });
        switch (app2) {
          case "Frontend":
            const { javaScriptFramework } = yield import_inquirer6.default.prompt({
              type: "list",
              name: "javaScriptFramework",
              message: "Choose Framework for Frontend",
              choices: ["React + Vite", "Next.js"]
            });
            yield checkFramework(javaScriptFramework, projectInfos, "TypeScript");
            break;
          case "Backend":
            yield ServerApp("TypeScript");
            break;
        }
      } else {
        const { app: app2 } = yield import_inquirer6.default.prompt({
          type: "list",
          name: "app",
          message: "Choose App Type",
          choices: ["Console app"]
        });
        switch (app2) {
          case "Console app":
            yield ConsoleApp("TypeScript");
            break;
        }
      }
      yield projectSummary(projectInfos, projectType);
    } catch (error) {
      new ErrorHandler_default(
        error,
        "There was an error creating the TypeScript project"
      ).handleError();
    }
  });
}

// src/helpers/projectDetails.ts
var import_inquirer7 = __toESM(require("inquirer"));
var import_path2 = __toESM(require("path"));
function projectDetails(language) {
  return __async(this, null, function* () {
    const { projectName } = yield import_inquirer7.default.prompt([
      {
        type: "input",
        name: "projectName",
        message: "Type project name",
        default: `my-${language === "C++" ? "cpp" : language.toLowerCase()}-project`
      }
    ]);
    const { projectPath } = yield import_inquirer7.default.prompt({
      type: "input",
      name: "projectPath",
      message: "Type Project Path",
      default: `.\\${projectName}`
    });
    let finalPath = projectPath;
    if (!projectPath.includes(projectName)) {
      finalPath = import_path2.default.isAbsolute(projectPath) ? projectPath + "\\" + projectName : projectPath + "\\" + projectName;
    }
    return {
      projectName,
      projectPath: finalPath.replace("/", "\\")
    };
  });
}

// src/helpers/checkLanguage.ts
function checkLanguage(language, projectType) {
  return __async(this, null, function* () {
    const projectInfos = yield projectDetails(language);
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
  });
}

// src/index.ts
var import_colors = __toESM(require("colors"));
import_colors.default.enable();
ErrorHandler_default.handleSIGNINT();
function app() {
  return __async(this, null, function* () {
    let projectType;
    const { language } = yield import_inquirer8.default.prompt({
      type: "list",
      name: "language",
      message: "Choose Language for Project",
      choices: ["Python", "TypeScript", "JavaScript", "C++", "PowerShell", "SQL"]
    });
    let answeredType;
    if (language !== "SQL" && language !== "PowerShell" && language !== "C++" && language !== "Python") {
      answeredType = yield import_inquirer8.default.prompt({
        type: "list",
        name: "projectType",
        message: "Choose Project Type",
        choices: ["Plain", "Framework"]
      });
    }
    projectType = (answeredType == null ? void 0 : answeredType.projectType) || "Plain";
    console.log(`Project Type: ${projectType}`);
    checkLanguage(language, projectType);
  });
}
app();
//# sourceMappingURL=index.js.map
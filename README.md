# Project Overview

## Overview

This project is a simple, multi-language CLI project management tool that allows users to quickly initialize new projects. Inspired by Vite, this tool supports various programming languages and frameworks, providing a streamlined way to kickstart development.

## Project Structure

### **Root Directory**

- .gitignore: Contains files and directories that should be ignored by Git
- README.md: Project Overview and Usage Instructions

- package.json: Project dependencies and scripts

- tsconfig.json: TypeScript compiler options for this project

### `src/` Directory

- src/index.ts: The main entry point of the application

### `src/helpers/` Directory

Contains functions that are common to multiple parts of the application

- additionalLibraries.ts: Contains code that allows user to install additional `pip` or `npm` libraries to their project

- checkLanguage.ts: Contains code that checks the language of the project and returns the corresponding CLI commands

- createDirsFiles.ts: Contains code that creates the necessary directories and files for the project

- creatingSummary.ts: Contains code that creates a summary of the project initialization

- packageInstallers.ts: Contains code that allows user to install `npm` or `pip` packages to their project

- projectDetails.ts: Contains code that allows user to input project details like project name, project path

### `src/modules` Directory

Contains all the modules of the application

- `AppType` Subdirectory: Defines types of the application supported by the frameworks

  - `client/FrontendApp.ts`: Manage initialization of Client-side frontend/fullstack applications. There are two types of frontend applications: `React + Vite` and `Next.js`.

  - `client/PlainWithHTML.ts`: Manage initialization of Client-side frontend JavaScript applications with blank HTML file

  - `server/ConsoleApp.ts`: Manage initialization of Server-side Node.js environment `Console Application`

  - `server/ServerApp.ts`: Manage initialization of Server-side Node.js environment `Server Application` with `Express.js`

- `languages` Subdirectory: Definies the programming languages supported by the application

  - `JavaScript.ts`: Manage initialization of JavaScript projects

  - `Python.ts`: Manage initialization of Python projects

  - `TypeScript.ts`: Manage initialization of TypeScript projects

  - `SQL.ts`: Manage initialization of SQL projects

  - `C++.ts`: Manage initialization of C++ projects **(Support Planned)**

  - `Pwsh.ts`: Manage initialization of PowerShell projects

  - `index.ts`: Index file for the `languages` directory

### `src/types` Directory

Contains all the types used in the application

## Installation

1. Clone the repository:

```bash
    git clone https://github.com/Kornellen/projectsInitializer.git
```

2. Navigate to the project directory and install dependencies:

```bash
    cd projectsInitializer
    npm install
```

3. Build the application

```bash
    tsc
```

4. Run the application without linking (optional)

```bash
    npm run dev
```

5. Link the application

```bash
    npm link
```

6. Run the CLI tool

```bash
    npx projectsinitializer
```

## Planned Features

- [ ] Support for C++ language projects

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

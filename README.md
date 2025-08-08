# Project Overview

## Overview

This project is a simple, multi-language CLI project management tool that allows users to quickly initialize new projects. Inspired by Vite, this tool supports various programming languages and frameworks, providing a streamlined way to kickstart development.

# Requirements

- node.js >= 20.0.0
- npm >= 8.0.0

## For Developers

### Project Structure

### **Root Directory**

- `.gitignore`: Contains files and directories that should be ignored by Git
- `README.md`: Project Overview and Usage Instructions

- `package.json`: Project dependencies and scripts

- `tsconfig.json`: TypeScript compiler options for this project

### `src/` Directory

- src/index.ts: The main entry point of the application

### `src/helpers/` Directory

Contains functions that are common to multiple parts of the application

- `additionalLibraries.ts`: Contains code that allows user to install additional `pip` or `npm` libraries to their project

- `checkLanguage.ts`: Contains code that checks the language of the project and returns the corresponding CLI commands

- `createDirsFiles.ts`: Contains code that creates the necessary directories and files for the project

- `creatingSummary.ts`: Contains code that creates a summary of the project initialization

- `packageInstallers.ts`: Contains code that allows user to install `npm` or `pip` packages to their project

- `projectDetails.ts`: Contains code that allows user to input project details like project name, project path

- `ErrorHandler.ts`: Contains code that handles errors that occur during project initialization

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

## For Release Users

### Installation

1. Install the CLI tool globally:

```bash
    npm install -g github:Kornellen/projectsInitializer
```

2. Run the CLI tool:

```bash
    npx projectsinitializer
```

Or

```bash
    projectsinitializer
```

## Example Usage

### For Developers

### Usage without linking

Just use following command in the main folder of project:

```bash
    npm run dev # For running the application in development mode
```

### Usage with linking

At start you need to compile the application with following command:

```bash
    npm run build # For compiling TypeScript application
```

After this run:

```bash
    npm link
```

After linking the application, you can use the CLI tool to initialize a new project. Here's an example:

```bash
    npx projectsinitializer
```

### For All Users

This will prompt you to select programming language

```bash
    ? Choose Language for Project (Use arrow keys)
    ❯ Python
    TypeScript
    JavaScript
    C++
    PowerShell
    SQL
```

After selecting the language like JavaScript or TypeScript it will firstly ask you to choose the project type like Plain (Console App for JavaScript and TypeScript And Vanilla JS with HTML and CSS for JavaScript) or Framework (For JavaScript and TypeScript). _This question is only for TypeScript and JavaScript projects_

```bash
    ✔ Choose Language for Project TypeScript
    ? Choose Project Type (Use arrow keys)
    ❯ Plain
    Framework
```

Next You will be asked to choose the project name and the project location.

```bash
    ✔ Choose Language for Project Python
    Project Type: Plain
    ✔ Type project name my-python-project
    ✔ Type Project Path example
```

Project Path can be absolute path or relative path. In example case it will be initialized in `./example/my-python-project` directory. This tool always creates a new directory for the project.

In Python projects, you will be asked about creating a virtual environment. Default Option is `Yes`

```bash
    ? Is your app use virual environment for packages? (Y/n)
```

In JavaScript or TypeScript you will be asked about application type. If chosen `Plain` you can select beteewn `Console App` with Node.js and `Plain JS` with HTML and CSS - This Option is only aviable for JavaScript.

```bash
    ✔ Choose Language for Project JavaScript
    ✔ Choose Project Type Plain
    Project Type: Plain
    ✔ Type project name my-javascript-project
    ✔ Type Project Path .\my-javascript-project
    ? Choose App Type (Use arrow keys)
    ❯ Console app
    Plain with HTML
```

If you choose `Framework` you will be asked about the application type like `Backend` or `Frontend`. This Option is only aviable for JavaScript and TypeScript. `Framework` option support frameworks like `React` connected with `Vite` and `Next.js`

```bash
    ✔ Choose Language for Project TypeScript
    ✔ Choose Project Type Framework
    Project Type: Framework
    ✔ Type project name my-typescript-project
    ✔ Type Project Path example
    ✔ Choose App Type Frontend
    ? Choose Framework for Frontend (Use arrow keys)
    ❯ React + Vite
    Next.js
```

If you choose `Backend` you will be asked about HTTPS Protocol usage in your `Web API` written in `Node.js` with `Express.js`.

```bash
    ✔ Choose Language for Project TypeScript
    ✔ Choose Project Type Framework
    Project Type: Framework
    ✔ Type project name my-typescript-project
    ✔ Type Project Path example
    ✔ Choose App Type Backend
    ✔ Is Backend APP use HTTPS Protocol? Yes
```

All of process like creation of `virtual environment` for `Python`, initialization of `TypeScript compiler` are done automatically.

## Planned Features

- [x] Support for C++ language projects
- [ ] Support for PHP language projects

## License

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details

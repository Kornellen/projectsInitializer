# ProjectInitializer

<img src='https://badgen.net/badge/icon/typescript?icon=typescript&label'>
<img src='https://badgen.net/npm/v/projectsinitializer'/>
<a href='LICENSE.md'><img src='https://badgen.net/npm/license/projectsinitializer'/></a>
<img src='https://badgen.net/npm/dw/projectsinitializer?color=blue'/>&nbsp;<img src='https://badgen.net/npm/dt/projectsinitializer?color=blue' />&nbsp;<img src='https://badgen.net/github/last-commit/kornellen/projectsInitializer' />

Simple CLI tool for project initialization. Supports languages like **JavaScript, TypeScript, Python and more**

## Table of Contents

- [Overview](#overview)
- [Requrements](#requirements)
- [Project Structure](#project-structure)
- [Installation](#installation)
  - [From GitHub Repository](#from-github-repository)
  - [Using Package Manager](#using-package-managers)
- [Example Usage](#example-usage)
- [Planed Features](#planned-features)
- [License](#license)

## Overview

Simple, **multi-language CLI** project management tool that allows users to quickly initialize new projects. Inspired by Vite, this tool supports various programming languages and frameworks, providing a streamlined way to kickstart development.

## Requirements

- **Node.js**
- **npm** or any other **package manager**

## Project Structure

```
📁projectsInitializer
└── 📁src
    └── 📁helpers                               # Contains helpers objects
        ├── DependencyInstaller.ts
        ├── ErrorHandler.ts
        ├── FileHelper.ts
        ├── ProjectDetails.ts
        ├── ProjectSummary.ts
        ├── selectLanguage.ts
        ├── UserInteractions.ts
    └── 📁modules
        └── 📁languages                         # Contains Language-Orieneted Logic
            └── 📁JavaScript-TypeScript         # Contains JavaScript/TypeScript-Oriented Logic
                └── 📁AppTypes
                    └── 📁client
                        ├── FrontendApp.ts
                        ├── PlainWithHTML.ts
                    └── 📁server
                        ├── ConsoleApp.ts
                        ├── ServerApp.ts
                ├── TJS.ts
            ├── Cpp.ts
            ├── Pwsh.ts
            ├── Python.ts
            ├── SQL.ts
       ├── index.ts
    ├── index.ts
└── 📁types                                     # Contains custom types
    ├── types.d.ts
├── .gitignore                                  # Files excluded from version controll
├── LICENSE.md                                  # License
├── package-lock.json                           # npm lock file
├── package.json
├── README-npm.md                               # README for npmjs.com
├── README.md                                   # Full Project Documentation
├── tsconfig.json
└── tsup.config.ts                              # TypeScript Compiler Configs
```

## Installation

### From GitHub Repository

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
   npm run build
   ```

4. Run the tool

   - Without linking:

   ```bash
   # For tests
   npm run dev
   ```

   - With linking:

   ```bash
   npm link

   npx projectsinitializer
   ```

### Using Package Managers

```bash
# Using npm
npm install -g projectsinitializer

# Using yarn

yarn global add projectsinitializer

# Using pnpm

pnpm add -g projectsinitializer

```

## Example Usage

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
    ? Is your app use virtual environment for packages? (Y/n)
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

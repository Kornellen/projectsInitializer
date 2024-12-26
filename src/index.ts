#!/usr/bin/env node

import inquirer from "inquirer";
import { checkLanguage } from "./helpers";
import { execSync } from "child_process";

async function app() {
  let projectType: "Plain" | "Framework";
  const { language } = await inquirer.prompt({
    type: "list",
    name: "language",
    message: "Choose Language for Project",
    choices: ["Python", "TypeScript", "JavaScript", "C++", "PowerShell", "SQL"],
  });

  const answeredType = await inquirer.prompt({
    type: "list",
    name: "projectType",
    message: "Choose Project Type",
    choices: ["Plain", "Framework"],
  });

  projectType = answeredType.projectType;

  checkLanguage(language, projectType);
}

app();

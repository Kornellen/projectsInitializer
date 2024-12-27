#!/usr/bin/env node

import inquirer from "inquirer";
import checkLanguage from "./helpers/checkLanguage";

async function app() {
  let projectType: "Plain" | "Framework";
  const { language } = await inquirer.prompt({
    type: "list",
    name: "language",
    message: "Choose Language for Project",
    choices: ["Python", "TypeScript", "JavaScript", "C++", "PowerShell", "SQL"],
  });
  let answeredType;

  if (
    language !== "SQL" &&
    language !== "PowerShell" &&
    language !== "C++" &&
    language !== "Python"
  ) {
    answeredType = await inquirer.prompt({
      type: "list",
      name: "projectType",
      message: "Choose Project Type",
      choices: ["Plain", "Framework"],
    });
  }

  projectType = answeredType?.projectType || "Plain";
  console.log(`Project Type: ${projectType}`);

  checkLanguage(language, projectType);
}

app();

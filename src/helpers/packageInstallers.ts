import { execSync } from "child_process";
import ErrorHandler from "./ErrorHandler";

export async function npmPackageInstaller(
  saveDev: boolean,
  packageLists: string[]
) {
  try {
    const command = `npm install ${packageLists.join(" ")} ${
      saveDev ? "--save-dev" : ""
    }`;

    execSync(command);
  } catch (error) {
    new ErrorHandler(
      error,
      `There was an error installing the npm package`
    ).handleError();
  }
}

export async function pipPackageInstaller(packageLists: string[]) {
  try {
    const command = `venv\\Scripts\\activate && pip install ${packageLists.join(
      " "
    )}`;

    execSync(command);
  } catch (error) {
    new ErrorHandler(
      error,
      `There was an error installing the pip package`
    ).handleError();
  }
}

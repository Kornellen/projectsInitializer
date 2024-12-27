import { execSync } from "child_process";

export async function npmPackageInstaller(
  saveDev: boolean,
  packageLists: string[]
) {
  console.log(packageLists.join(" "));
  const command = `npm install ${packageLists.join(" ")} ${
    saveDev ? "--save-dev" : ""
  }`;

  console.log(command);

  execSync(command);
}

export async function pipPackageInstaller(packageLists: string[]) {
  const command = `venv\\Scripts\\activate && pip install ${packageLists.join(
    " "
  )}`;

  execSync(command);
}

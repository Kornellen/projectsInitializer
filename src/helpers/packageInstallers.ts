import { exec } from "child_process";

export async function npmPackageInstaller(
  saveDev: boolean,
  packageLists: string[]
) {
  const command = `npm install ${packageLists.join(" ")} ${
    saveDev ? "--save-dev" : ""
  }`;

  exec(command, (error, stderr) => {
    if (error) {
      console.error("Error: " + error);
      return;
    }
  });
}

export async function pipPackageInstaller() {}

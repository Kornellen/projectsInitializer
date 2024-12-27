export default function projectSummary(
  projectInfos: { projectPath: string; projectName: string },
  projectType: "Plain" | "Framework"
) {
  const dateOfCreation = new Date().toLocaleTimeString();

  return console.log(
    `Project created at ${projectInfos.projectPath} | Time: ${dateOfCreation} | Project Type: ${projectType} | Project Name: ${projectInfos.projectName} | Good Luck!`
      .bgBlue
  );
}

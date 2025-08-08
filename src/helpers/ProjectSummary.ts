import { table } from "table";

export default function projectSummary(
  projectInfos: projectDetailsType,
  projectType: "Plain" | "Framework"
) {
  const dateOfCreation = new Date().toLocaleTimeString();

  const summaryData = [
    ["Location", "Time of creation", "Type", "Name"],
    [
      projectInfos.projectPath,
      dateOfCreation,
      projectType,
      projectInfos.projectName,
    ],
  ];

  console.log(table(summaryData));
  console.log("Good Luck!");
}

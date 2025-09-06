import { table } from "table";

export default function projectSummary(
  projectInfos: projectDetailsType,
  projectType: "Plain" | "Framework"
) {
  const dateOfCreation = new Date().toLocaleTimeString();

  const summaryData = [
    ["Location", "Time of creation", "Language", "Type", "Name"],
    [
      projectInfos.projectPath,
      dateOfCreation,
      projectInfos.language,
      projectType,
      projectInfos.projectName,
    ],
  ];

  console.log(table(summaryData));
  console.log("Good Luck!");
}

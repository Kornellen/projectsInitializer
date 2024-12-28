"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = projectSummary;
function projectSummary(projectInfos, projectType) {
    const dateOfCreation = new Date().toLocaleTimeString();
    return console.log(`Project created at ${projectInfos.projectPath} | Time: ${dateOfCreation} | Project Type: ${projectType} | Project Name: ${projectInfos.projectName} | Good Luck!`
        .bgBlue);
}

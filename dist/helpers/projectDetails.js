"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = projectDetails;
const inquirer_1 = __importDefault(require("inquirer"));
const path_1 = __importDefault(require("path"));
function projectDetails(language) {
    return __awaiter(this, void 0, void 0, function* () {
        const { projectName } = yield inquirer_1.default.prompt([
            {
                type: "input",
                name: "projectName",
                message: "Type project name",
                default: `my-${language === "C++" ? "cpp" : language.toLowerCase()}-project`,
            },
        ]);
        const { projectPath } = yield inquirer_1.default.prompt({
            type: "input",
            name: "projectPath",
            message: "Type Project Path",
            default: `.\\${projectName}`,
        });
        let finalPath = projectPath;
        if (!projectPath.includes(projectName)) {
            finalPath = path_1.default.isAbsolute(projectPath)
                ? projectPath + "\\" + projectName
                : projectPath + "\\" + projectName;
        }
        return {
            projectName,
            projectPath: finalPath.replace("/", "\\"),
        };
    });
}

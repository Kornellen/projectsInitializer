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
exports.default = Python;
const inquirer_1 = __importDefault(require("inquirer"));
const createDirsFiles_1 = require("../../helpers/createDirsFiles");
const child_process_1 = require("child_process");
const additionalLibraries_1 = __importDefault(require("../../helpers/additionalLibraries"));
const creatingSummary_1 = __importDefault(require("../../helpers/creatingSummary"));
const ErrorHandler_1 = __importDefault(require("../../helpers/ErrorHandler"));
function Python(projectType, projectInfos) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            projectInfos.projectPath = (0, createDirsFiles_1.createDir)(projectInfos.projectPath);
            process.chdir(projectInfos.projectPath);
            (0, createDirsFiles_1.createFile)(`main.py`, "# Python code goes here");
            const { isVenv } = yield inquirer_1.default.prompt({
                type: "confirm",
                name: "isVenv",
                message: "Is your app use virual environment for packages?",
                default: true,
            });
            if (isVenv) {
                try {
                    console.log("Creating virtual environment...".blue);
                    (0, child_process_1.execSync)("python -m venv venv");
                }
                catch (error) {
                    new ErrorHandler_1.default(error, `There was an error creating the Python Virtual Environment`).handleError();
                }
            }
            const { isAdditionalLibraries } = yield inquirer_1.default.prompt({
                type: "confirm",
                name: "isAdditionalLibraries",
                message: "Is your app use additional libraries?",
            });
            if (isAdditionalLibraries) {
                (0, additionalLibraries_1.default)("Python");
            }
            yield (0, creatingSummary_1.default)(projectInfos, projectType);
        }
        catch (error) {
            new ErrorHandler_1.default(error, `There was an error creating the Python project`).handleError();
        }
    });
}

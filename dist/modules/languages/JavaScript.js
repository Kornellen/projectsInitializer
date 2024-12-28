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
exports.default = JavaScript;
const inquirer_1 = __importDefault(require("inquirer"));
const ConsoleApp_1 = __importDefault(require("../AppTypes/server/ConsoleApp"));
const ServerApp_1 = __importDefault(require("../AppTypes/server/ServerApp"));
const PlainWithHTML_1 = __importDefault(require("../AppTypes/client/PlainWithHTML"));
const FrontendApp_1 = __importDefault(require("../AppTypes/client/FrontendApp"));
const creatingSummary_1 = __importDefault(require("../../helpers/creatingSummary"));
const createDirsFiles_1 = require("../../helpers/createDirsFiles");
const ErrorHandler_1 = __importDefault(require("../../helpers/ErrorHandler"));
function JavaScript(projectType, projectInfos) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            projectInfos.projectPath = (0, createDirsFiles_1.createDir)(projectInfos.projectPath);
            process.chdir(projectInfos.projectPath);
            if (projectType === "Framework") {
                const { app } = yield inquirer_1.default.prompt({
                    type: "list",
                    name: "app",
                    message: "Choose App Type",
                    choices: ["Frontend", "Backend"],
                });
                switch (app) {
                    case "Frontend":
                        const { javaScriptFramework } = yield inquirer_1.default.prompt({
                            type: "list",
                            name: "javaScriptFramework",
                            message: "Choose Framework for Frontend",
                            choices: ["React + Vite", "Next.js"],
                        });
                        yield (0, FrontendApp_1.default)(javaScriptFramework, projectInfos, "JavaScript");
                        break;
                    case "Backend":
                        yield (0, ServerApp_1.default)("JavaScript");
                        break;
                }
            }
            else {
                const { app } = yield inquirer_1.default.prompt({
                    type: "list",
                    name: "app",
                    message: "Choose App Type",
                    choices: ["Console app", "Plain with HTML"],
                });
                switch (app) {
                    case "Console app":
                        yield (0, ConsoleApp_1.default)("JavaScript");
                        break;
                    case "Plain with HTML":
                        yield (0, PlainWithHTML_1.default)();
                        break;
                }
            }
            yield (0, creatingSummary_1.default)(projectInfos, projectType);
        }
        catch (error) {
            new ErrorHandler_1.default(error, "There was an error creating the JavaScript project").handleError();
        }
    });
}

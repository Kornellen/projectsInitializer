#!/usr/bin/env node
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
const inquirer_1 = __importDefault(require("inquirer"));
const checkLanguage_1 = __importDefault(require("./helpers/checkLanguage"));
const colors_1 = __importDefault(require("colors"));
const ErrorHandler_1 = __importDefault(require("./helpers/ErrorHandler"));
colors_1.default.enable();
ErrorHandler_1.default.handleSIGNINT();
function app() {
    return __awaiter(this, void 0, void 0, function* () {
        let projectType;
        const { language } = yield inquirer_1.default.prompt({
            type: "list",
            name: "language",
            message: "Choose Language for Project",
            choices: ["Python", "TypeScript", "JavaScript", "C++", "PowerShell", "SQL"],
        });
        let answeredType;
        if (language !== "SQL" &&
            language !== "PowerShell" &&
            language !== "C++" &&
            language !== "Python") {
            answeredType = yield inquirer_1.default.prompt({
                type: "list",
                name: "projectType",
                message: "Choose Project Type",
                choices: ["Plain", "Framework"],
            });
        }
        projectType = (answeredType === null || answeredType === void 0 ? void 0 : answeredType.projectType) || "Plain";
        console.log(`Project Type: ${projectType}`);
        (0, checkLanguage_1.default)(language, projectType);
    });
}
app();

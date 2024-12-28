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
exports.default = checkLanguage;
const modules_1 = require("../modules");
const projectDetails_1 = __importDefault(require("./projectDetails"));
function checkLanguage(language, projectType) {
    return __awaiter(this, void 0, void 0, function* () {
        const projectInfos = yield (0, projectDetails_1.default)(language);
        switch (language) {
            case "C++":
                projectType = "Plain";
                (0, modules_1.Cpp)(projectType, projectInfos);
                break;
            case "JavaScript":
                (0, modules_1.JavaScript)(projectType, projectInfos);
                break;
            case "PowerShell":
                projectType = "Plain";
                (0, modules_1.Pwsh)(projectType, projectInfos);
                break;
            case "Python":
                projectType = "Plain";
                (0, modules_1.Python)(projectType, projectInfos);
                break;
            case "SQL":
                projectType = "Plain";
                (0, modules_1.SQL)(projectType, projectInfos);
                break;
            case "TypeScript":
                (0, modules_1.TypeScript)(projectType, projectInfos);
                break;
        }
    });
}

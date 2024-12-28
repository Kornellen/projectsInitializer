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
exports.default = additionalLibraries;
const inquirer_1 = __importDefault(require("inquirer"));
const packageInstallers_1 = require("./packageInstallers");
function additionalLibraries(language) {
    return __awaiter(this, void 0, void 0, function* () {
        const { additionalLibraries } = yield inquirer_1.default.prompt({
            type: "input",
            name: "additionalLibraries",
            message: "Type Additional Libraries to install",
        });
        if (language === "Python") {
            (0, packageInstallers_1.pipPackageInstaller)(additionalLibraries.split(" "));
        }
        else if (language === "JavaScript" || language === "TypeScript") {
            const { saveDev } = yield inquirer_1.default.prompt({
                type: "confirm",
                name: "saveDev",
                message: "Save Developer mode? (default: No)",
                default: false,
            });
            (0, packageInstallers_1.npmPackageInstaller)(saveDev, additionalLibraries.split(" "));
        }
        else {
            return;
        }
    });
}

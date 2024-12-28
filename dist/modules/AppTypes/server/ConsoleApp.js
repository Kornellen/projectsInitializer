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
exports.default = ConsoleApp;
const child_process_1 = require("child_process");
const inquirer_1 = __importDefault(require("inquirer"));
const additionalLibraries_1 = __importDefault(require("../../../helpers/additionalLibraries"));
const packageInstallers_1 = require("../../../helpers/packageInstallers");
const createDirsFiles_1 = require("../../../helpers/createDirsFiles");
const ErrorHandler_1 = __importDefault(require("../../../helpers/ErrorHandler"));
function ConsoleApp(language) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Initialization of Console App...".blue);
            (0, child_process_1.execSync)("npm init -y");
            if (language === "TypeScript") {
                (0, packageInstallers_1.npmPackageInstaller)(true, ["typescript", "ts-node", "@types/node"]);
                (0, child_process_1.execSync)("npx tsc --init", { stdio: "inherit" });
            }
            const { isAdditionalLibraries } = yield inquirer_1.default.prompt({
                type: "confirm",
                name: "isAdditionalLibraries",
                message: "Is your app use additional libraries?",
            });
            if (isAdditionalLibraries) {
                (0, additionalLibraries_1.default)(language);
            }
            (0, createDirsFiles_1.createDir)("./src");
        }
        catch (error) {
            new ErrorHandler_1.default(error, "There was an error creating the console app.").handleError();
        }
    });
}

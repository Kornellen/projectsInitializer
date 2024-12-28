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
exports.default = ServerApp;
const child_process_1 = require("child_process");
const inquirer_1 = __importDefault(require("inquirer"));
const packageInstallers_1 = require("../../../helpers/packageInstallers");
const additionalLibraries_1 = __importDefault(require("../../../helpers/additionalLibraries"));
const createDirsFiles_1 = require("../../../helpers/createDirsFiles");
const ErrorHandler_1 = __importDefault(require("../../../helpers/ErrorHandler"));
function configureHTTPS(dirs, isHTTPS) {
    if (isHTTPS) {
        dirs.push("certificates");
    }
}
function setupTypeScript(typeScriptPack) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Setting up TypeScript...".blue);
            (0, packageInstallers_1.npmPackageInstaller)(true, typeScriptPack);
            (0, child_process_1.execSync)("tsc --init");
        }
        catch (error) {
            new ErrorHandler_1.default(error, "There was an error setting up TypeScript").handleError();
        }
    });
}
function ServerApp(language) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log("Initialization of Server App...".blue);
            (0, child_process_1.execSync)("npm init -y");
            const { isHTTPS } = yield inquirer_1.default.prompt({
                type: "confirm",
                name: "isHTTPS",
                message: "Is Backend APP use HTTPS Protocol?",
            });
            const typeScriptPack = [
                "typescript",
                "ts-node",
                "tsc",
                "@types/node",
                "@types/express",
                "@types/cors",
                "@types/express-validator",
            ];
            const dirs = [
                "src",
                "src/config",
                "src/routes",
                "src/controllers",
                "src/middlewares",
                "src/helpers",
            ];
            const defautlLib = [
                "express",
                "express-validator",
                "cors",
                "dotenv",
                "https",
                "http",
            ];
            if (language === "TypeScript") {
                yield setupTypeScript(typeScriptPack);
            }
            (0, packageInstallers_1.npmPackageInstaller)(false, defautlLib);
            const { isAdditionalLibraries } = yield inquirer_1.default.prompt({
                type: "confirm",
                name: "isAdditionalLibraries",
                message: `Is Backend App use other libraries? (Currently installed: ${language === "TypeScript"
                    ? defautlLib.concat(typeScriptPack).join(", ")
                    : defautlLib.join(", ")})`,
            });
            if (isAdditionalLibraries) {
                (0, additionalLibraries_1.default)("JavaScript");
            }
            configureHTTPS(dirs, isHTTPS);
            console.log(`Creating app at ${process.cwd()}...`);
            dirs.forEach((dir) => {
                (0, createDirsFiles_1.createDir)(dir);
            });
        }
        catch (error) {
            new ErrorHandler_1.default(error, "There was an error creating Server App").handleError();
        }
    });
}

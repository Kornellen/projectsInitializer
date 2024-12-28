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
exports.npmPackageInstaller = npmPackageInstaller;
exports.pipPackageInstaller = pipPackageInstaller;
const child_process_1 = require("child_process");
const ErrorHandler_1 = __importDefault(require("./ErrorHandler"));
function npmPackageInstaller(saveDev, packageLists) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const command = `npm install ${packageLists.join(" ")} ${saveDev ? "--save-dev" : ""}`;
            (0, child_process_1.execSync)(command);
        }
        catch (error) {
            new ErrorHandler_1.default(error, `There was an error installing the npm package`).handleError();
        }
    });
}
function pipPackageInstaller(packageLists) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const command = `venv\\Scripts\\activate && pip install ${packageLists.join(" ")}`;
            (0, child_process_1.execSync)(command);
        }
        catch (error) {
            new ErrorHandler_1.default(error, `There was an error installing the pip package`).handleError();
        }
    });
}

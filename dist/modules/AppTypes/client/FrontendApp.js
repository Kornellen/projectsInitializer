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
exports.default = checkFramework;
const child_process_1 = require("child_process");
const ErrorHandler_1 = __importDefault(require("../../../helpers/ErrorHandler"));
function checkFramework(framework, projectDetails, language) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            switch (framework) {
                case "Next.js":
                    console.log(`Initialization of Next.js + ${language} project...`.blue);
                    const commandNext = language === "JavaScript"
                        ? `npx create-next-app@latest ${projectDetails.projectName} --js --tailwind --eslint --use-npm --src-dir --no-turbopack --app`
                        : `npx create-next-app@latest ${projectDetails.projectName} --ts --tailwind --eslint --use-npm --src-dir --no-turbopack --app`;
                    (0, child_process_1.execSync)(commandNext, {
                        stdio: "inherit",
                    });
                    break;
                case "React + Vite":
                    console.log(`Initialization of React + Vite + ${language} project...`.blue);
                    const commandVite = language === "JavaScript"
                        ? `npm create vite@latest ${projectDetails.projectName}\\. -- --template react`
                        : `npm create vite@latest ${projectDetails.projectName}\\. -- --template react-ts`;
                    (0, child_process_1.execSync)(commandVite, {
                        stdio: "inherit",
                    });
                    break;
            }
        }
        catch (error) {
            new ErrorHandler_1.default(error, `There was an error creating ${framework} project`).handleError();
        }
    });
}

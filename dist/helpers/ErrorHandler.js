"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const child_process_1 = require("child_process");
const os_1 = __importDefault(require("os"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
class ErrorHandler {
    constructor(error, message) {
        this.error = error;
        this.message = message;
    }
    logError() {
        console.error(`[Error Handler - Error]: ${this.message}`.red);
        if (this.error instanceof Error) {
            console.error(`[Error Handler - Error Details]: ${this.error.message}`.yellow);
        }
        else {
            console.error(` [Error Handler - Error Details]: ${this.error}`.yellow);
        }
    }
    cleanUp(directory) {
        try {
            const command = os_1.default.platform() === "win32"
                ? `rmdir /s /q "${directory}"`
                : `rm -rf ${directory}`;
            if (fs_1.default.existsSync(directory)) {
                console.log(`Cleaning up directory: ${directory}`.yellow);
                process.chdir(`${path_1.default.dirname(directory)}`);
                (0, child_process_1.execSync)(command, { stdio: "inherit" });
            }
            else {
                console.warn(`Directory does not exist: ${directory}`.yellow);
            }
            console.log(`Cleanup successful.`.green);
        }
        catch (cleanupError) {
            console.error(`Error during cleanup: ${cleanupError}`.red);
        }
    }
    handleError() {
        this.logError();
        this.cleanUp(process.cwd());
        console.log("Exiting process...".gray);
        process.exit(1);
    }
    static handleSIGNINT() {
        process.on("SIGINT", () => {
            console.log("Received SIGINT signal. Exiting process...".yellow);
            process.exit(1);
        });
    }
}
exports.default = ErrorHandler;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createFile = exports.createDir = void 0;
const fs_1 = __importDefault(require("fs"));
const ErrorHandler_1 = __importDefault(require("./ErrorHandler"));
const uniqueDir = (path) => {
    let dir = path;
    let counter = 1;
    while (fs_1.default.existsSync(dir)) {
        dir = path + `-${counter}`;
        counter++;
    }
    return dir;
};
const createDir = (dirName) => {
    const dir = uniqueDir(dirName);
    try {
        fs_1.default.mkdirSync(dir, { recursive: true });
        return dir;
    }
    catch (error) {
        new ErrorHandler_1.default(error, "There was an error creating the directory").handleError();
        throw error;
    }
};
exports.createDir = createDir;
const createFile = (fileName, fileContent = "") => {
    try {
        fs_1.default.writeFileSync(fileName, fileContent, { encoding: "utf8" });
    }
    catch (error) {
        new ErrorHandler_1.default(error, "There was an error creating the file").handleError();
    }
};
exports.createFile = createFile;

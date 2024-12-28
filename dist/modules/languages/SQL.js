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
exports.default = SQL;
const createDirsFiles_1 = require("../../helpers/createDirsFiles");
const creatingSummary_1 = __importDefault(require("../../helpers/creatingSummary"));
const ErrorHandler_1 = __importDefault(require("../../helpers/ErrorHandler"));
function SQL(projectType, projectInfos) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            console.log(`Initialization of SQL project...`.blue);
            projectInfos.projectPath = (0, createDirsFiles_1.createDir)(projectInfos.projectPath);
            process.chdir(projectInfos.projectPath);
            (0, createDirsFiles_1.createFile)(`database.db`, "-- SQL code goes here");
            yield (0, creatingSummary_1.default)(projectInfos, projectType);
        }
        catch (error) {
            new ErrorHandler_1.default(error, `There was an error creating the PowerShell project`).handleError();
        }
    });
}

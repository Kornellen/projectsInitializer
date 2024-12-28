"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Python = exports.SQL = exports.Pwsh = exports.TypeScript = exports.JavaScript = exports.Cpp = void 0;
const Cpp_1 = __importDefault(require("./languages/Cpp"));
exports.Cpp = Cpp_1.default;
const JavaScript_1 = __importDefault(require("./languages/JavaScript"));
exports.JavaScript = JavaScript_1.default;
const Pwsh_1 = __importDefault(require("./languages/Pwsh"));
exports.Pwsh = Pwsh_1.default;
const Python_1 = __importDefault(require("./languages/Python"));
exports.Python = Python_1.default;
const SQL_1 = __importDefault(require("./languages/SQL"));
exports.SQL = SQL_1.default;
const TypeScript_1 = __importDefault(require("./languages/TypeScript"));
exports.TypeScript = TypeScript_1.default;

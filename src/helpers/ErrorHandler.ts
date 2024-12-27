import { execSync } from "child_process";
import os from "os";
import fs from "fs";
import path from "path";

class ErrorHandler {
  private error: unknown;
  private message: string;

  constructor(error: unknown, message: string) {
    this.error = error;
    this.message = message;
  }

  private logError() {
    console.error(`[Error Handler - Error]: ${this.message}`.red);
    if (this.error instanceof Error) {
      console.error(
        `[Error Handler - Error Details]: ${this.error.message}`.yellow
      );
    } else {
      console.error(` [Error Handler - Error Details]: ${this.error}`.yellow);
    }
  }

  private cleanUp(directory: string): void {
    try {
      const command =
        os.platform() === "win32"
          ? `rmdir /s /q "${directory}"`
          : `rm -rf ${directory}`;
      if (fs.existsSync(directory)) {
        console.log(`Cleaning up directory: ${directory}`.yellow);
        process.chdir(`${path.dirname(directory)}`);
        execSync(command, { stdio: "inherit" });
      } else {
        console.warn(`Directory does not exist: ${directory}`.yellow);
      }
      console.log(`Cleanup successful.`.green);
    } catch (cleanupError) {
      console.error(`Error during cleanup: ${cleanupError}`.red);
    }
  }

  public handleError(): void {
    this.logError();
    this.cleanUp(process.cwd());
    console.log("Exiting process...".gray);
    process.exit(1);
  }

  public static handleSIGNINT() {
    process.on("SIGINT", () => {
      console.log("Received SIGINT signal. Exiting process...".yellow);
      process.exit(1);
    });
  }
}

export default ErrorHandler;

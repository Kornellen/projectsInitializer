import { FileHelper } from "./FileHelper";
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

  public handleError(): void {
    this.logError();
    FileHelper.cleanUpInCaseOfError(process.cwd(), this.error);
    console.log("Exiting process...".gray);
    process.exit(1);
  }

  public static handleSIGNINT() {
    process.on("SIGINT", () => {
      console.log("Received SIGINT signal. Exiting process...".yellow);
      FileHelper.cleanUpInCaseOfError(process.cwd(), "Recived SIGINT");
      process.exit(1);
    });
  }
}

export default ErrorHandler;

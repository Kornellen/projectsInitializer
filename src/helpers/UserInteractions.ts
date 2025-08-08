import inquirer from "inquirer";

type QuestionConfigType = {
  type: "input" | "checkbox" | "list" | "confirm";
  name: string;
  message: string;
  choices?: string[];
};

export class UserInterations {
  public static async prepareQuestion(
    { type, name, message, choices }: QuestionConfigType,
    other?: any
  ): Promise<any> {
    if (choices) {
      return await inquirer.prompt([
        {
          type: type,
          name: name,
          message: message,
          choices: choices,
          ...other,
        },
      ]);
    }

    return await inquirer.prompt([
      { type: type, name: name, message: message, ...other },
    ]);
  }
}

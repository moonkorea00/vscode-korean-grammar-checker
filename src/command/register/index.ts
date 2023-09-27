import * as vscode from 'vscode';

type CommandReturnType = Promise<string | undefined> | void;

export const register = (command: string, cb: () => CommandReturnType) => {
  return vscode.commands.registerCommand(command, cb);
};

import * as vscode from 'vscode';

export const register = (command: string, cb: (...args: any[]) => any) => {
  return vscode.commands.registerCommand(command, cb);
};

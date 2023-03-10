import * as vscode from 'vscode';
import { commands } from './command';
import { resetCorrectionState } from './command/command.utils';

export function activate(context: vscode.ExtensionContext) {
  const { check, apply } = commands(context);

  context.subscriptions.push(check, apply);
}

export function deactivate(context: vscode.ExtensionContext) {
  resetCorrectionState(context);
}

import * as vscode from 'vscode';
import { commands } from './command';
import { workspace, initialCorrectionState } from './command/command.utils';

export function activate(context: vscode.ExtensionContext) {
  const { check, apply } = commands(context);

  context.subscriptions.push(check, apply);
}

export function deactivate(context: vscode.ExtensionContext) {
  workspace.set(context, 'correction', initialCorrectionState);
}

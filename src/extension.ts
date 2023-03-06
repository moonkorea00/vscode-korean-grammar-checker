import * as vscode from 'vscode';
import { checkGrammar } from './command';

export function activate(context: vscode.ExtensionContext) {
  context.subscriptions.push(checkGrammar);
}

export function deactivate() {}
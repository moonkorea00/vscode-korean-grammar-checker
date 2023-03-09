import * as vscode from 'vscode';
import { register } from './register';
import { checkGrammar } from './check';
import { applyCorrection } from './apply';

const commandMap = {
  check: 'korean-grammar-checker.checkGrammar',
  apply: 'korean-grammar-checker.applyCorrection',
};

export function commands(context: vscode.ExtensionContext) {
  const check = register(commandMap.check, () => checkGrammar(context));
  const apply = register(commandMap.apply, () => applyCorrection(context));

  return { check, apply };
}
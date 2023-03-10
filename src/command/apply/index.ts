import * as vscode from 'vscode';
import { applyDocumentCorrection } from './applyDocumentCorrection';
import { applySelectionCorrection } from './applySelectionCorrection';
import { showVscodeMessage } from '../command.utils';
import { getCorrectionState } from '../command.utils';

export function applyCorrection(context: vscode.ExtensionContext) {
  const editor = vscode.window.activeTextEditor;

  if (!editor) return;

  const state = getCorrectionState(context);
  const isRequestForEntireText = state.correctedContent !== null;

  try {
    if (isRequestForEntireText) {
      return applyDocumentCorrection(editor, state);
    } else {
      return applySelectionCorrection(editor, state);
    }
  } catch (err) {
    if (err instanceof Error && err.message === 'initial text not found') {
      showVscodeMessage('chunkNotFound');
    }
    console.log(err);
  }
}

import type { CorrectionStateWithContext } from '../../types';
import * as vscode from 'vscode';
import { applyDocumentCorrection } from './applyDocumentCorrection';
import { applySelectionCorrection } from './applySelectionCorrection';
import { workspace, showVscodeMessage } from '../command.utils';

export function applyCorrection(context: vscode.ExtensionContext) {
  const editor = vscode.window.activeTextEditor;

  if (!editor) return;

  const correctionState = workspace.get<CorrectionStateWithContext>(
    context,
    'correction'
  );

  if (!correctionState) return;

  const isCorrectionForSelection = !!correctionState.chunkPosition;

  try {
    if (isCorrectionForSelection) {
      applySelectionCorrection(editor, correctionState);
    } else {
      applyDocumentCorrection(editor, correctionState);
    }
  } catch (err) {
    if (err instanceof Error && err.message === 'initial text not found') {
      showVscodeMessage('chunkNotFound');
    }
  }
}

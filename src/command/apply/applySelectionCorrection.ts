import * as vscode from 'vscode';
import { CorrectionState } from '../../types';
import { decodeHtmlEntity } from '../command.utils';

export function applySelectionCorrection(
  editor: vscode.TextEditor,
  state: CorrectionState
) {
  if (state.correctedChunk === null) return;

  editor.edit(text => {
    const { startIndex, endIndex } = state.chunkPosition!;
    const isInitialAndCorrectedMatch =
      editor.document.getText(new vscode.Range(startIndex, endIndex)) ===
      state.initialChunk;

    if (isInitialAndCorrectedMatch) {
      const html = state.correctedChunk!;
      const parsedHtml = decodeHtmlEntity(html, editor);

      text.replace(new vscode.Range(startIndex, endIndex), parsedHtml);
    } else {
      throw new Error('initial text not found');
    }
  });
}

import * as vscode from 'vscode';
import { CorrectionState } from '../../types';
import { decodeHtmlEntity } from '../command.utils';

export function applySelectionCorrection(
  editor: vscode.TextEditor,
  state: CorrectionState
) {
  if (state.correctedChunk === null) return;

  editor.edit(text => {
    const { startPosition, endPosition } = state.chunkPosition!;
    const isInitialAndCorrectedChunkMatch =
      editor.document.getText(new vscode.Range(startPosition, endPosition)) ===
      state.initialChunk;

    if (isInitialAndCorrectedChunkMatch) {
      const html = state.correctedChunk!;
      const parsedHtml = decodeHtmlEntity(html, editor);

      text.replace(new vscode.Range(startPosition, endPosition), parsedHtml);
    } else {
      throw new Error('initial text not found');
    }
  });
}

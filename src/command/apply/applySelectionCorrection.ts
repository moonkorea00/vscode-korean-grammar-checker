import type { CorrectionState } from '../../types';
import * as vscode from 'vscode';
import { decodeHtmlEntity } from '../command.utils';

export function applySelectionCorrection(
  editor: vscode.TextEditor,
  state: CorrectionState
) {
  if (state.correction === null) return;

  editor.edit(text => {
    const { startPosition, endPosition } = state.chunkPosition!;
    const isSelectedTextAndRequestTextMatch =
      editor.document.getText(new vscode.Range(startPosition, endPosition)) ===
      state.editorText;

    if (isSelectedTextAndRequestTextMatch) {
      const html = state.correction as string;
      const parsedHtml = decodeHtmlEntity(html, editor);

      text.replace(new vscode.Range(startPosition, endPosition), parsedHtml);
    } else {
      throw new Error('initial text not found');
    }
  });
}

import * as vscode from 'vscode';
import { CorrectionState } from '../../types';
import { decodeHtmlEntity } from '../command.utils';

export function applyDocumentCorrection(
  editor: vscode.TextEditor,
  state: CorrectionState
) {
  const isInitialAndCorrectedNotMatch =
    editor.document.getText().slice(0, 500) !== state.initialText;
  if (isInitialAndCorrectedNotMatch) return;

  editor.edit(text => {
    const html = state.correctedContent!;
    const parsedHtml = decodeHtmlEntity(html, editor);

    text.replace(
      new vscode.Range(
        new vscode.Position(0, 0),
        editor.document.positionAt(500)
      ),
      parsedHtml
    );
  });
}

import type { CorrectionState } from '../../types';
import * as vscode from 'vscode';
import { decodeHtmlEntity } from '../command.utils';

export function applyDocumentCorrection(
  editor: vscode.TextEditor,
  state: CorrectionState
) {

  editor.edit(text => {
    const html = state.correction as string;
    const parsedHtml = decodeHtmlEntity(html, editor);

    text.replace(
      new vscode.Range(
        new vscode.Position(0, 0),
        editor.document.positionAt(editor.document.getText().length)
      ),
      parsedHtml
    );
  });
}

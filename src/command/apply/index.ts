import * as vscode from 'vscode';
import { decodeHtmlEntity } from '../command.utils';

export function applyCorrection(context: vscode.ExtensionContext) {
  const editor = vscode.window.activeTextEditor;

  if (!editor) return;

  editor.edit(text => {
    const isRequestForEntireText =
      context.workspaceState.get('corrected_content') !== null;
    let html: string;

    // correct entire document
    if (isRequestForEntireText) {
      html = context.workspaceState.get<string>('corrected_content')!;
      const parsedHtml = decodeHtmlEntity(html, editor);

      text.replace(
        new vscode.Range(
          new vscode.Position(0, 0),
          editor.document.positionAt(500)
        ),
        parsedHtml
      );
    } else {
      // correct selected text
      const initialChunk = context.workspaceState.get<string>('initial_chunk')!;
      const isChunkInDocument = editor.document
        .getText()
        .includes(initialChunk);
      const { startIndex, endIndex } = context.workspaceState.get<{
        startIndex: vscode.Position;
        endIndex: vscode.Position;
      }>('chunk_position')!;

      
      if (isChunkInDocument) {
        html = context.workspaceState.get<string>('corrected_chunk')!;
        const parsedHtml = decodeHtmlEntity(html, editor);

        text.replace(new vscode.Range(startIndex, endIndex), parsedHtml);
      } else {
        vscode.window.showErrorMessage(
          'Error : Could not find original selected text to be corrected.'
        );
      }
    }
  });
}

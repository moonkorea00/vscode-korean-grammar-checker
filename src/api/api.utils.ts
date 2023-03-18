import * as vscode from 'vscode';

export function splitChunks(editor: vscode.TextEditor, text: string) {
  const MAX_WORD_COUNT = 500;

  if (text.length < MAX_WORD_COUNT) return [text];

  const document = editor.document;
  const documentText = document.getText();

  const selection = editor.selection;
  const { start: selectionStartPosition, end: selectionEndPosition } = selection;
  const startOffset =
    JSON.stringify(selectionStartPosition) !==
    JSON.stringify(selectionEndPosition)
      ? document.offsetAt(selectionStartPosition)
      : 0;

  const endOfLineChar = document.eol === vscode.EndOfLine.CRLF ? '\r\n' : '\n';

  let chunks: string[] = [];

  for (let i = startOffset; i < documentText.length; ) {
    const slicedChunk = documentText.slice(i, i + MAX_WORD_COUNT);
    const slicedChunkStartPosition = document.positionAt(i);
    const slicedChunkEndPosition = document.positionAt(i + slicedChunk.length);
    const lastIdxOfEOL = slicedChunk.lastIndexOf(endOfLineChar);

    let chunkLength: number;

    if (lastIdxOfEOL !== -1) {
      if (
        !selection.isEmpty &&
        slicedChunkEndPosition.isAfter(selectionEndPosition)
      ) {
        chunkLength = document.getText(
          new vscode.Range(slicedChunkStartPosition, selectionEndPosition)
        ).length;
      } else {
        chunkLength = lastIdxOfEOL + 1;
      }
    } else {
      if (slicedChunkEndPosition.isBefore(selection.end)) {
        chunkLength = document.getText(
          new vscode.Range(slicedChunkStartPosition, slicedChunkEndPosition)
        ).length;
      } else {
        const lastChunkEndPosition = document.positionAt(documentText.length);
        const lastChunkLength = document.getText(
          new vscode.Range(
            slicedChunkStartPosition,
            selectionEndPosition || lastChunkEndPosition
          )
        ).length;

        chunkLength = lastChunkLength;
      }
    }

    const chunkEndPosition = document.positionAt(
      document.offsetAt(slicedChunkStartPosition) + chunkLength
    );
    const chunk = document.getText(
      new vscode.Range(slicedChunkStartPosition, chunkEndPosition)
    );

    if (chunk.length === 0) break;

    chunks.push(chunk);

    i += chunk.length;
  }

  return chunks;
}

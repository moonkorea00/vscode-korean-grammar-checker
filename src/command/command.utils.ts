import * as vscode from 'vscode';

export function decodeHtmlEntity(input: string, editor: vscode.TextEditor) {
  const regex = /&([a-z]+);|<br>/g;
  const entityMap = {
    lt: '<',
    gt: '>',
    amp: '&',
    quot: '"',
    apos: "'",
    middot: '·',
    bull: '•',
    copy: '©',
    reg: '®',
    ordm: 'º',
    trade: '™',
  };

  const parsedHtml = input.replaceAll(regex, (match, entity) =>
    entity in entityMap
      ? entityMap[entity as keyof typeof entityMap]
      : match === '<br>'
      ? editor.document.eol === vscode.EndOfLine.CRLF
        ? '\r\n'
        : '\n'
      : match
  );

  return parsedHtml;
}

export function getChunkIndicies(editor: vscode.TextEditor) {
  const chunk = editor.selection;
  const startIndex = chunk.start;
  const endIndex = chunk.end;

  return {
    startIndex,
    endIndex,
  };
}

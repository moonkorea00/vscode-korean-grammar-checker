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
  const chunk: vscode.Selection = editor.selection;
  const startPosition: vscode.Position = chunk.start;
  const endPosition: vscode.Position = chunk.end;

  return {
    startPosition,
    endPosition,
  };
}

export const workspace = {
  get: <T>(context: vscode.ExtensionContext, key: string): T | undefined =>
    context.workspaceState.get(key),
  set: <T>(context: vscode.ExtensionContext, key: string, value: T) => {
    context.workspaceState.update(key, value);
  },
};

export const initialCorrectionState = {
  editorText: null,
  correction: null,
  chunkPosition: null,
};

type ErrorType = 'axiosError' | 'unexpected' | 'chunkNotFound';

export function showVscodeMessage(
  errorType: ErrorType,
  errorMessage?: string | ((status: number) => string)
) {
  const messageMap = {
    axiosError: `Error : ${errorMessage}`,
    unexpected: `An unexpected error occurred. Please try again later. Error : ${errorMessage}`,
    chunkNotFound: 'Make a new Inspection request. Initial text not found.',
  };

  return vscode.window.showWarningMessage(
    messageMap[errorType as keyof typeof messageMap]
  );
}

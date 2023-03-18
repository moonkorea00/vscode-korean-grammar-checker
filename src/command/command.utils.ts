import * as vscode from 'vscode';
import { ChunkPosition, CorrectionState } from '../types';

type VscodeMessageProps = {
  [key: string]: string | ((status: number) => string);
};

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

export function getCorrectionState(context: vscode.ExtensionContext) {
  const state: CorrectionState =
    context.workspaceState.get('correction_state')!;

  return state;
}

export function updateCorrectionState(
  context: vscode.ExtensionContext,
  initialText: string | null = null,
  correctedContent: string | null,
  initialChunk: string | null = null,
  correctedChunk: string | null = null,
  chunkPosition: ChunkPosition | null = null
) {
  context.workspaceState.update('correction_state', {
    initialText,
    correctedContent,
    initialChunk,
    correctedChunk,
    chunkPosition,
  });
}

export function resetCorrectionState(context: vscode.ExtensionContext) {
  context.workspaceState.update('correction_state', {
    initialText: null,
    correctedContent: null,
    initialChunk: null,
    correctedChunk: null,
    chunkPosition: null,
  });
}

export function showVscodeMessage(errType: string, data?: VscodeMessageProps) {
  const messageMap = {
    axiosError: `Error : ${data?.errorMessage}`,
    unexpected: `An unexpected error occurred. Please try again later.`,
    chunkNotFound: 'Make a new Inspection request. Initial text not found.',
  };

  return vscode.window.showWarningMessage(
    messageMap[errType as keyof typeof messageMap]
  );
}

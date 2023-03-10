import * as vscode from 'vscode';
import { ChunkPosition, CorrectionState } from '../types';

type VscodeMessageProps = {
  [key: string]: number | string | ((status: number) => string);
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
  const chunk = editor.selection;
  const startIndex = chunk.start;
  const endIndex = chunk.end;

  return {
    startIndex,
    endIndex,
  };
}

export function getCorrectionState(context: vscode.ExtensionContext) {
  const state: CorrectionState =
    context.workspaceState.get('correction_state')!;

  return state;
}

export function updateCorrectionState(
  context: vscode.ExtensionContext,
  correctedContent: string | null,
  initialChunk: string | null = null,
  correctedChunk: string | null = null,
  chunkPosition: ChunkPosition | null = null
) {
  context.workspaceState.update('correction_state', {
    correctedContent,
    initialChunk,
    correctedChunk,
    chunkPosition,
  });
}

export function resetCorrectionState(context: vscode.ExtensionContext) {
  context.workspaceState.update('correction_state', {
    correctedContent: null,
    initialChunk: null,
    correctedChunk: null,
    chunkPosition: null,
  });
}

export function showVscodeMessage(errType: string, data?: VscodeMessageProps) {
  const messageMap = {
    maxCount: `Max word count(500) exceeded - ${data?.WORD_COUNT}/${data?.MAX_WORD_COUNT}`,
    axiosError: `Error : ${data?.errorMessage}`,
    unexpected: `An unexpected error occurred. Please try again later.`,
    chunkNotFound:
      'Could not find text to correct. Make a new Inspection request.',
  };

  return vscode.window.showWarningMessage(
    messageMap[errType as keyof typeof messageMap]
  );
}

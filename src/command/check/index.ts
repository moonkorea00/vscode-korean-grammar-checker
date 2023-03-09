/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import axios, { AxiosError, isAxiosError } from 'axios';
import { createPanel } from '../../panel';
import { getChunkIndicies } from '../command.utils';

export async function checkGrammar(context: vscode.ExtensionContext) {
  const editor = vscode.window.activeTextEditor;
  const fullEditorText = editor?.document.getText();
  const selectedEditorText = editor?.document.getText(editor.selection);
  const chunkQuery = (selectedEditorText || fullEditorText)?.slice(0, 500);

  const WORD_COUNT = (selectedEditorText || fullEditorText)?.length;
  const MAX_WORD_COUNT = 500;

  const url = 'https://m.search.naver.com/p/csearch/ocontent/util/SpellerProxy';

  if (!editor) {
    return;
  }

  try {
    if (!selectedEditorText && !fullEditorText) {
      throw new Error('No text detected.');
    }

    const { data } = await axios.get(url, {
      params: {
        color_blindness: 0,
        q: chunkQuery,
      },
    });

    // render panel
    createPanel(data);

    // store state
    if (selectedEditorText) {
      const { startIndex, endIndex } = getChunkIndicies(editor);

      context.workspaceState.update('corrected_content', null);
      context.workspaceState.update(
        'initial_chunk',
        selectedEditorText.slice(0, 500)
      );
      context.workspaceState.update(
        'corrected_chunk',
        data.message.result.notag_html
      );

      context.workspaceState.update('chunk_position', { startIndex, endIndex });
    } else {
      context.workspaceState.update(
        'corrected_content',
        data.message.result.notag_html
      );
    }

    if (Number(WORD_COUNT) > MAX_WORD_COUNT) {
      vscode.window.showWarningMessage(
        `Max word count(500) exceeded - ${WORD_COUNT}/${MAX_WORD_COUNT}`
      );
    }

    // remove state when panel unmounts
    // onDispose('reset context')
    // on unmount destroy
    // on check command, destroy
    // ?on apply command, destroy
  } catch (err) {
    const errorMap = {
      ENOTFOUND: `Unable to connect to the server. Please check your network connection.`,
      range: (status: number) =>
        status >= 400 && status < 500
          ? `Client Error: ${(err as AxiosError).response?.status}`
          : `Potential server error. Immediate Request after another can lead to an error.`,
      default: `An unexpected error occurred. Please try again later.`,
    };

    if (isAxiosError(err)) {
      const errorMessage =
        errorMap.range(Number(err.response?.status)) ||
        errorMap[err.code as keyof typeof errorMap] ||
        errorMap.default;
      return vscode.window.showErrorMessage(`Error : ${errorMessage}`);
    } else if (err instanceof Error && err.message === 'No text detected.') {
      return vscode.window.showWarningMessage(
        `No text found to inspect. Focus on file or select text.`
      );
    } else {
      return vscode.window.showErrorMessage(
        `An unexpected error occurred. Please try again later.`
      );
    }
  }
}
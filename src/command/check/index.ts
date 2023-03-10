/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import { AxiosError, isAxiosError } from 'axios';
import { renderPanel } from '../../panel';
import { fetchCorrections } from '../../api';
import {
  getChunkIndicies,
  showVscodeMessage,
  updateCorrectionState,
} from '../command.utils';

export async function checkGrammar(context: vscode.ExtensionContext) {
  const editor = vscode.window.activeTextEditor;

  if (!editor) return;

  const fullEditorText = editor.document.getText();
  const selectedEditorText = editor.document.getText(editor.selection);
  const textChunk = (selectedEditorText || fullEditorText).slice(0, 500);

  const WORD_COUNT = (selectedEditorText || fullEditorText).length;
  const MAX_WORD_COUNT = 500;

  try {
    if (!selectedEditorText && !fullEditorText) return;

    const data = await fetchCorrections(textChunk);

    // render panel
    renderPanel(data, context);

    // store state
    if (selectedEditorText) {
      const position = getChunkIndicies(editor);
      updateCorrectionState(
        context,
        null,
        selectedEditorText.slice(0, 500),
        data.message.result.notag_html,
        position
      );
    } else {
      updateCorrectionState(context, data.message.result.notag_html);
    }

    if (Number(WORD_COUNT) > MAX_WORD_COUNT) {
      showVscodeMessage('maxCount', { WORD_COUNT, MAX_WORD_COUNT });
    }
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
        errorMap[err?.code as keyof typeof errorMap] ||
        errorMap.default;
      return showVscodeMessage('axiosError', {
        errorMessage: errorMessage!,
      });
    } else {
      console.log(err);
      return showVscodeMessage('unexpected');
    }
  }
}

/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import axios, { AxiosError, isAxiosError } from 'axios';
import { createAndUpdatePanel } from '../panel';

export const checkGrammar = vscode.commands.registerCommand(
  'korean-grammar-checker.koreanGrammarChecker',
  async () => {
    const editor = vscode.window.activeTextEditor;
    const fullEditorText = editor?.document.getText();
    const selectedEditorText = editor?.document.getText(editor.selection);

    const WORD_COUNT = (selectedEditorText || fullEditorText)?.length;
    const MAX_WORD_COUNT = 500;

    try {
      if (!selectedEditorText && !fullEditorText) {
        throw new Error('No text detected.');
      }

      const { data } = await axios.get(
        'https://m.search.naver.com/p/csearch/ocontent/util/SpellerProxy',
        {
          params: {
            color_blindness: 0,
            q: selectedEditorText || fullEditorText,
          },
        }
      );

      createAndUpdatePanel(data);
      
      
      if (Number(WORD_COUNT) > MAX_WORD_COUNT) {
        vscode.window.showWarningMessage(
          `Max word count(500) exceeded - ${WORD_COUNT}/${MAX_WORD_COUNT}`
        );
      }

    } catch (err: AxiosError | unknown) {
      const errorMap = {
        ENOTFOUND: `Unable to connect to the server. Please check your network connection.`,
        range: (status: number) => status >= 400 && status < 500
            ? `Client Error: ${(err as AxiosError).response?.status}`
            : `Potential server error. Immediate Request after another can lead to an error.`,
        default: `An unexpected error occurred. Please try again later.`,
      };

      if (isAxiosError(err)) {
        const errorMessage = errorMap.range(Number(err.response?.status)) || errorMap[err.code as keyof typeof errorMap] || errorMap.default;
        vscode.window.showErrorMessage(`Error : ${errorMessage}`);
      } else if (err instanceof Error && err.message === 'No text detected.') {
        vscode.window.showWarningMessage(`No text found to inspect. Focus on file or select text.`);
      } else {
        vscode.window.showErrorMessage(
          `An unexpected error occurred. Please try again later.`
        );
      }
    }
  }
);

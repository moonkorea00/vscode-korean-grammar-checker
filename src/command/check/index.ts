/* eslint-disable @typescript-eslint/naming-convention */
import type { AxiosError } from 'axios';
import * as vscode from 'vscode';
import { isAxiosError } from 'axios';
import { fetchCorrections } from '../../api';
import { renderPanel } from '../../panel';
import {
  workspace,
  getChunkIndicies,
  showVscodeMessage,
} from '../command.utils';

export async function checkGrammar(context: vscode.ExtensionContext) {
  const editor = vscode.window.activeTextEditor;

  if (!editor) return;

  const documentText = editor.document.getText();
  const selectedText = editor.document.getText(editor.selection);
  const editorText = selectedText || documentText;

  if (!editorText) return;

  try {
    const { html, notag } = await fetchCorrections(context, editor, editorText);

    renderAndStoreCorrections(
      html,
      notag,
      context,
      editor,
      selectedText,
      documentText
    );
  } catch (err) {
    if (isAxiosError(err)) {
      return handleAxiosError(err);
    } else if (err instanceof Error) {
      return showVscodeMessage('unexpected', err.message);
    } else {
      showVscodeMessage('unexpected');
    }
  }
}

function renderAndStoreCorrections(
  html: string,
  notag: string,
  context: vscode.ExtensionContext,
  editor: vscode.TextEditor,
  selectedText: string,
  documentText: string
) {
  renderPanel(html, context);

  if (selectedText) {
    const positions = getChunkIndicies(editor);

    workspace.set(context, 'correction', {
      editorText: selectedText,
      correction: notag,
      chunkPosition: positions,
    });
  } else {
    workspace.set(context, 'correction', {
      editorText: documentText,
      correction: notag,
      chunkPosition: null,
    });
  }
}

function handleAxiosError(err: AxiosError) {
  const errorMap = {
    ENOTFOUND: `Unable to connect to the server. Please check your network connection.`,
    range: (status: number) =>
      status >= 400 && status < 500
        ? `Client Error: ${err.response?.status}`
        : `Potential server error. Immediate Request after another can lead to an error.`,
    default: `An unexpected error occurred. Please try again later.`,
  };

  const errorMessage =
    errorMap.range(Number(err.response?.status)) ||
    errorMap[err?.code as keyof typeof errorMap] ||
    errorMap.default;

  return showVscodeMessage('axiosError', errorMessage);
}

/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import axios from 'axios';
import { splitChunks } from './api.utils';

export async function fetchCorrections(
  editor: vscode.TextEditor,
  text: string
) {
  const chunk = splitChunks(editor, text);

  const URL = 'https://m.search.naver.com/p/csearch/ocontent/util/SpellerProxy';
  const PASSPORT_KEY = '633b693a365e691612b9a81486ebc48a4c630a60';

  const promises = chunk.map(value =>
    axios.get(URL, {
      params: {
        color_blindness: 0,
        q: value,
        passportKey: PASSPORT_KEY,
      },
    })
  );

  const correction = vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: 'Running grammar check..',
      cancellable: true,
    },
    async () => {
      const res = await Promise.all(promises);
      const data = res.reduce(
        (acc, val) => {
          return {
            ...acc,
            notag: acc.notag + val.data.message.result.notag_html,
            html: acc.html + val.data.message.result.html,
          };
        },
        { notag: '', html: '' }
      );

      return data;
    }
  );

  return correction;
}

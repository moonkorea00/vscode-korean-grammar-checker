/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import axios from 'axios';
import { splitChunks } from './api.utils';

export async function fetchCorrections(
  editor: vscode.TextEditor,
  text: string
) {
  const chunk = splitChunks(editor, text);

  const url = 'https://m.search.naver.com/p/csearch/ocontent/util/SpellerProxy';

  const promises = chunk.map(value =>
    axios.get(url, {
      params: {
        color_blindness: 0,
        q: value,
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

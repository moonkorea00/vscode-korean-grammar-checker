/* eslint-disable @typescript-eslint/naming-convention */
import * as vscode from 'vscode';
import axios from 'axios';
import { splitTextToChunks } from './api.utils';
import { workspace } from '../command/command.utils';

export async function fetchCorrections(
  context: vscode.ExtensionContext,
  editor: vscode.TextEditor,
  text: string
) {
  let passportKey = workspace.get<string>(context, 'passport_key');

  if (!passportKey) {
    passportKey = await fetchPassportKey();
    if (passportKey) {
      workspace.set<string>(context, 'passport_key', passportKey);
    }
  }

  async function attemptCorrection() {
    const BASE_URL =
      'https://m.search.naver.com/p/csearch/ocontent/util/SpellerProxy';
    const MAX_RETRIES = 2;
    let retries = 0;

    const chunks = splitTextToChunks(editor, text);

    while (retries < MAX_RETRIES) {
      try {
        const promises = chunks.map(value =>
          axios.get(BASE_URL, {
            params: {
              color_blindness: 0,
              q: value,
              passportKey,
            },
          })
        );
        const res = await Promise.all(promises);

        if (res[0].data.message.error === '유효한 키가 아닙니다.') {
          throw new Error('invalid key');
        }

        const combinedCorrection = res.reduce(
          (acc, val) => {
            return {
              ...acc,
              notag: acc.notag + val.data.message.result.notag_html,
              html: acc.html + val.data.message.result.html,
            };
          },
          { notag: '', html: '' }
        );

        return combinedCorrection;
      } catch (err) {
        retries++;
        if (err instanceof Error) {
          if (err.message === 'invalid key') {
            passportKey = await fetchPassportKey();
            if (passportKey) {
              workspace.set<string>(context, 'passport_key', passportKey);
            }
          }
          if (err.message === 'Failed to get key') {
            throw new Error(err.message);
          }
        } else {
          throw err;
        }
      }
    }

    if (retries === MAX_RETRIES) {
      throw new Error('Max retry exceeded.');
    }
  }

  const correction = vscode.window.withProgress(
    {
      location: vscode.ProgressLocation.Notification,
      title: 'Running grammar check..',
      cancellable: true,
    },
    attemptCorrection
  ) as Thenable<{ notag: string; html: string }>;

  return correction;
}

async function fetchPassportKey() {
  const BASE_URL =
    'https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=맞춤법검사기';

  try {
    const { data: html } = await axios.get(BASE_URL);
    const match = /passportKey=([a-zA-Z0-9]+)/.exec(html);

    if (match) return match[1];
  } catch (err) {
    throw new Error('Failed to get key');
  }
}

import * as vscode from 'vscode';

type CorrectionData = {
  message: {
    result: {
      html: string;
    };
  };
};

export function createAndUpdatePanel(data: CorrectionData) {
  const panel = vscode.window.createWebviewPanel(
    'correctionPanel',
    'Correction Panel',
    vscode.ViewColumn.Two,
    {}
  );

  panel.webview.html = createPanelHTML(data.message.result.html);
}

export function createPanelHTML(html: string) {
  return `
      <!DOCTYPE html>
      <html lang="kor">
      <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>korean grammar check</title>
          <style type="text/css">
            em.red_text{
              color: #FF5757
            }
            em.green_text{
              color: #01C73C
            }
            em.blue_text{
              color: #2FACEA
            }
            em.purple_text{
              color: #B22AF8
            }
          </style>
      </head>
      <body>
          <div>${html}<div/>
      </body>
      </html>`;
}

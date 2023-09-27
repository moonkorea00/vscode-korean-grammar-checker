import * as vscode from 'vscode';

export type ChunkPosition = {
  startPosition: vscode.Position;
  endPosition: vscode.Position;
};

export type CorrectionState = {
  editorText: string | null;
  correction: string | null;
  chunkPosition?: ChunkPosition | null;
};

export type CorrectionStateWithContext = {
  context: vscode.ExtensionContext;
} & CorrectionState;
import * as vscode from 'vscode';

export type ChunkPosition = {
  startPosition: vscode.Position;
  endPosition: vscode.Position;
};

export type CorrectionState = {
  initialText: string | null;
  correctedContent: string | null;
  initialChunk: string | null;
  correctedChunk: string | null;
  chunkPosition: ChunkPosition | null;
};

import * as vscode from 'vscode';

export type ChunkPosition = {
  startIndex: vscode.Position;
  endIndex: vscode.Position;
};

export type CorrectionState = {
  correctedContent: string | null;
  initialChunk: string | null;
  correctedChunk: string | null;
  chunkPosition: ChunkPosition | null;
};
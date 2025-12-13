/**
 * ! Inmutabilidad con copia
 * Aunque la inmutabilidad es una buena práctica, no siempre es posible.
 * En estos casos, se puede hacer una copia del objeto y modificar la copia.
 *
 *  * Es útil para mantener un historial de estados en aplicaciones interactivas.
 *
 */

class CodeEditorState {
  readonly content: string;
  readonly cursorPosition: number;
  readonly unsaveChange: boolean;

  constructor(content: string, cursorPosition: number, unsaveChange: boolean) {
    this.content = content;
    this.cursorPosition = cursorPosition;
    this.unsaveChange = unsaveChange;
  }

  copyWith({
    content,
    cursorPosition,
    unsaveChange,
  }: Partial<CodeEditorState>): CodeEditorState {
    return new CodeEditorState(
      content ?? this.content,
      cursorPosition ?? this.cursorPosition,
      unsaveChange ?? this.unsaveChange
    );
  }

  displayState(): void {
    console.log(
      `Content: ${this.content}\nCursor Position: ${this.cursorPosition}\nUnsaved Changes: ${this.unsaveChange}`
    );
  }
}

class CodeEditorHistory {
  private history: CodeEditorState[] = [];
  private currentIndex: number = -1;

  save(state: CodeEditorState): void {
    if (this.currentIndex < this.history.length - 1) {
      this.history = this.history.slice(0, this.currentIndex + 1);
    }

    // Si se hacen cambios después de deshacer, se elimina el historial futuro
    this.history.push(state);
    this.currentIndex++;
  }

  undo(): CodeEditorState | null {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      return this.history[this.currentIndex];
    }
    return null;
  }

  redo(): CodeEditorState | null {
    if (this.currentIndex < this.history.length - 1) {
      this.currentIndex++;
      return this.history[this.currentIndex];
    }
    return null;
  }
}

function main() {
  const history = new CodeEditorHistory();
  let editorState = new CodeEditorState("Initial content", 0, false);
  history.save(editorState);
  editorState.displayState();

  editorState = editorState.copyWith({
    content: "First change",
    cursorPosition: 12,
    unsaveChange: true,
  });
  history.save(editorState);
  editorState.displayState();
}

main();

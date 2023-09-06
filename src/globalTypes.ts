export interface NotesObjectType {
    id: number;
    currentNote: string;
    isCompleted: boolean;
}

export interface NoteType {
    id: number;
    note: string;
    notes: NotesObjectType[];
}

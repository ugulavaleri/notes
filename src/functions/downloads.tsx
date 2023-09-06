import FileSaver from "file-saver";
import JSZip from "jszip";
import { NoteType } from "../globalTypes";

// saves all file
export function handleDownloadClick(notes: NoteType[]) {
    const zip = new JSZip();

    notes.forEach((note) => {
        const formattedNote = `Note ${note?.id}:\n\n${note?.notes
            .map((note) => {
                return `${note.currentNote} - ${
                    note.isCompleted ? "Completed!" : "Active"
                }`;
            })
            .join("\n")}`;
        zip.file(`Note-${note?.id}.txt`, formattedNote);
    });

    zip.generateAsync({ type: "blob" }).then((blob) => {
        FileSaver.saveAs(blob, "AllNotes.zip");
    });
}

// saves current Note
export const handleDownloadNote = (note: NoteType | null) => {
    const zip = new JSZip();

    const formattedNote = `Note "${note?.note}":\n\n${note?.notes
        .map((note) => {
            return `${note.currentNote} - ${
                note.isCompleted ? "Completed!" : "Active"
            }`;
        })
        .join("\n")}`;
    zip.file(`Note-${note?.note}.txt`, formattedNote);

    zip.generateAsync({ type: "blob" }).then((blob) => {
        FileSaver.saveAs(blob, "AllNotes.zip");
    });
};

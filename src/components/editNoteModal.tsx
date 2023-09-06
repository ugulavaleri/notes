import React, { useEffect, useState } from "react";
import Button from "../commons/button";
import { handleDownloadNote } from "../functions/downloads";
import { NotesObjectType, NoteType } from "../globalTypes";
import EachNoteList from "./eachNoteList";
import Modal from "./modal";
import SaveChangedText from "./saveChangedText";

interface EditNoteModal {
    note: NoteType | null;
    setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>;
    setClickedNote: React.Dispatch<React.SetStateAction<NoteType | null>>;
}

function EditNoteModal({ note, setNotes, setClickedNote }: EditNoteModal) {
    const [openAddInput, setOpenAddInput] = useState(false);
    const [newNote, setNewNote] = useState("");
    const [editedNote, setEditedNote] = useState("");
    const [editedNoteIndex, setEditedNoteIndex] = useState<number>(-1);

    const editCurrentNote = (id: number) => {
        setEditedNoteIndex(id);
    };

    const saveEditedNote = (id: number) => {
        setNotes((prev) => {
            setEditedNote("");
            return prev.map((n) => {
                if (n.id === id) {
                    return { ...n, currentNote: editedNote };
                }
                return n;
            });
        });

        setClickedNote((prevClickedNote) => {
            if (prevClickedNote && prevClickedNote.id === note?.id) {
                return {
                    ...prevClickedNote,
                    notes: prevClickedNote.notes.map((n) =>
                        n.id === id ? { ...n, currentNote: editedNote } : n
                    ),
                };
            }
            setEditedNote("");
            return prevClickedNote;
        });

        setEditedNoteIndex(-1);
    };

    const cancelEdit = () => {
        setEditedNoteIndex(-1);
        setEditedNote("");
    };

    useEffect(() => {
        localStorage.setItem("clickedNote", JSON.stringify(note));
    }, [note]);

    const AddNoteToCurrentNote = (id: number | undefined) => {
        if (newNote.trim() === "") {
            return;
        }

        setNotes((prevNotes) => {
            const updatedNotes = prevNotes.map((n) => {
                if (n.id === id) {
                    const updatedNote = {
                        id: n.notes.length + 1,
                        currentNote: newNote,
                        isCompleted: false,
                    };

                    return {
                        ...n,
                        notes: [updatedNote, ...n.notes],
                    };
                }
                return n;
            });

            localStorage.setItem("notes", JSON.stringify(updatedNotes));

            setClickedNote((prevClickedNote) => {
                if (prevClickedNote && prevClickedNote.id === id) {
                    return {
                        ...prevClickedNote,
                        notes:
                            updatedNotes.find((n) => n.id === id)?.notes || [],
                    };
                }
                return prevClickedNote;
            });

            return updatedNotes;
        });

        setNewNote("");
        setOpenAddInput(false);
    };

    const handleRemoveNote = (id: number) => {
        const updatedNote = note?.notes.filter((n) => n.id !== id);

        if (!updatedNote) {
            return 0;
        }

        setNotes((prevNotes) => {
            const updatedNotes = prevNotes.map((n) => {
                if (n.id === note?.id) {
                    return {
                        ...n,
                        notes: updatedNote,
                    };
                }
                return n;
            });

            // Update setClickedNote
            setClickedNote((prevClickedNote) => {
                if (prevClickedNote && prevClickedNote.id === note?.id) {
                    return {
                        ...prevClickedNote,
                        notes: updatedNote,
                    };
                }
                return prevClickedNote;
            });
            return updatedNotes;
        });
    };

    const openAddInputClick = () => {
        setOpenAddInput(false);
    };

    return (
        <Modal title={note?.note}>
            <ul className="max-h-[170px] overflow-scroll relative">
                {openAddInput && (
                    <div className="flex justify-between mb-[20px]">
                        <input
                            type="text"
                            placeholder="add todo.."
                            className="w-[50%] pl-[5px] outline-none"
                            onChange={(e) => setNewNote(e.target.value)}
                        />
                        <Button
                            styles={
                                "bg-green-800 text-white px-[10px] py-[3px]"
                            }
                            ClickEvent={openAddInputClick}
                        >
                            Cancel
                        </Button>
                        <Button
                            styles={
                                "bg-green-800 text-white px-[10px] py-[3px]"
                            }
                            ClickEvent={() => AddNoteToCurrentNote(note?.id)}
                        >
                            Add Note
                        </Button>
                    </div>
                )}

                {note !== null ? (
                    note?.notes?.map((n: NotesObjectType) => (
                        <li
                            className="flex justify-between items-center mb-[10px]"
                            key={n.id}
                        >
                            {editedNoteIndex === n.id ? (
                                <SaveChangedText
                                    editedNote={editedNote}
                                    setEditedNote={setEditedNote}
                                    saveEditedNote={saveEditedNote}
                                    cancelEdit={cancelEdit}
                                    id={n.id}
                                    n={n}
                                />
                            ) : (
                                <EachNoteList
                                    n={n}
                                    editCurrentNote={editCurrentNote}
                                    handleRemoveNote={handleRemoveNote}
                                    id={n.id}
                                />
                            )}
                        </li>
                    ))
                ) : (
                    <div className="text-center">
                        <h1>there is no Notes</h1>
                    </div>
                )}
            </ul>
            <div className="sticky top-[100%] flex justify-end gap-[10px]">
                <Button
                    styles="bg-green-700 text-white py-[5px] px-[8px] rounded-[10px]"
                    ClickEvent={() => setOpenAddInput(true)}
                >
                    add note
                </Button>
                <Button
                    styles="bg-green-700 text-white py-[5px] px-[8px] rounded-[10px]"
                    ClickEvent={() => note && handleDownloadNote(note)}
                >
                    download note
                </Button>
            </div>
        </Modal>
    );
}

export default EditNoteModal;

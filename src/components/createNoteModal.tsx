import { useState } from "react";
import Button from "../commons/button";
import { NoteType } from "../globalTypes";
import Modal from "./modal";

interface CreateNoteModalProps {
    setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>;
    notes?: NoteType[];
}

function CreateNoteModal({ setNotes }: CreateNoteModalProps) {
    const [newNoteText, setNewNoteText] = useState("");

    const AddNewNote = () => {
        if (newNoteText.trim()) {
            const newNoteItem: NoteType = {
                id: Date.now(),
                note: newNoteText,
                notes: [],
            };

            setNotes((prev) => [newNoteItem, ...prev]);
            setNewNoteText("");
        }
    };

    return (
        <Modal title="Create Note">
            <div className="relative  h-[200px]">
                <input
                    type="text"
                    placeholder="Add Note Title.."
                    className="w-full h-[40px] pl-[15px] outline-none"
                    value={newNoteText}
                    onChange={(e) => setNewNoteText(e.target.value)}
                />
                <div className="sticky top-[100%] text-center">
                    <Button
                        styles="bg-green-700 text-white py-[5px] px-[8px] rounded-[10px]"
                        ClickEvent={AddNewNote}
                    >
                        Add New Note
                    </Button>
                </div>
            </div>
        </Modal>
    );
}

export default CreateNoteModal;

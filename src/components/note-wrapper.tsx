import { useEffect, useState } from "react";
import { GrNotes } from "react-icons/gr";
import { IoAddCircleOutline } from "react-icons/io5";
import Note from "./note";
import EditNoteModal from "./editNoteModal";
import CreateNoteModal from "./createNoteModal";
import { NoteType } from "../globalTypes";
import { handleDownloadClick } from "../functions/downloads";

function setLocalStorage(key: string, value: any) {
    localStorage.setItem(key, JSON.stringify(value));
}

function getLocalStorage(key: string, defaultValue: any) {
    const storedValue = localStorage.getItem(key);
    return storedValue ? JSON.parse(storedValue) : defaultValue;
}

function NoteWrapper() {
    const [notes, setNotes] = useState<NoteType[]>(
        getLocalStorage("notes", [])
    );
    const [isEditModalShowing, setIsEditModalShowing] = useState<
        boolean | null
    >(getLocalStorage("editModal", null));
    const [isCreateModalShowing, setIsCreateModalShowing] = useState<
        boolean | null
    >(getLocalStorage("createModal", null));
    const [clickedNote, setClickedNote] = useState<NoteType | null>(
        getLocalStorage("clickedNote", null)
    );

    const openModalWithNote = (note: NoteType) => {
        setIsEditModalShowing(true);
        setLocalStorage("editModal", true);
        setIsCreateModalShowing(false);
        setLocalStorage("createModal", false);
        setClickedNote(note);
        setLocalStorage("clickedNote", note);
    };

    const AddNewNote = () => {
        setIsEditModalShowing(false);
        setLocalStorage("editModal", false);
        setIsCreateModalShowing(true);
        setLocalStorage("createModal", true);
    };

    useEffect(() => {
        setLocalStorage("notes", notes);
    }, [notes]);

    return (
        <div className="h-[100vh] w-[100vw] flex items-center justify-center px-[30px]">
            <div className="max-w-[1000px] w-full h-[1000px] bg-green-400 mx-auto rounded-[20px] relative p-[20px]">
                <div className="flex items-center justify-center gap-[20px] mb-[50px]">
                    <h1 className="text-[30px] font-bold">NOTES</h1>
                    <GrNotes size={30} />
                </div>
                <div className="grid grid-cols-5 gap-y-[30px] gap-x-[20px] max-h-[370px] h-full overflow-scroll 2xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-4 sm:grid-cols-3">
                    {notes.map((note) => (
                        <Note
                            note={note}
                            openModalWithNote={openModalWithNote}
                            setNotes={setNotes}
                            notes={notes}
                            key={note.id}
                        />
                    ))}
                </div>
                <div className="mt-[50px]">
                    {isEditModalShowing && (
                        <EditNoteModal
                            note={clickedNote}
                            setNotes={setNotes}
                            setClickedNote={setClickedNote}
                        />
                    )}
                    {isCreateModalShowing && (
                        <CreateNoteModal setNotes={setNotes} notes={notes} />
                    )}
                </div>
                <div className="sticky top-[100%] flex justify-end gap-[20px]">
                    <IoAddCircleOutline
                        size={30}
                        className="cursor-pointer"
                        onClick={AddNewNote}
                    />
                    <button onClick={() => notes && handleDownloadClick(notes)}>
                        Download All
                    </button>
                </div>
            </div>
        </div>
    );
}

export default NoteWrapper;

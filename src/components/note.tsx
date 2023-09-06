import { NoteType } from "../globalTypes";
import { BsFillTrashFill } from "react-icons/bs";

interface NoteProps {
    note: NoteType;
    openModalWithNote: (note: NoteType) => void;
    setNotes: React.Dispatch<React.SetStateAction<NoteType[]>>;
    notes: NoteType[];
}

function Note({ note, openModalWithNote, setNotes, notes }: NoteProps) {
    const RemoveWholeNote = (
        event: React.MouseEvent<SVGElement, MouseEvent>
    ) => {
        event.stopPropagation();
        const filteredNotes = notes.filter((n) => n.id !== note.id);
        setNotes(filteredNotes);
    };

    return (
        <>
            <div
                className="max-w-[170px] w-full h-[170px] rounded-[20px] bg-green-300 mx-auto flex items-center justify-center"
                onClick={() => openModalWithNote(note)}
            >
                <div className="h-[150px]">
                    <h1 className="text-[18px]">{note.note}</h1>

                    <div className="sticky top-[100%] flex justify-center">
                        <BsFillTrashFill
                            className="cursor-pointer"
                            onClick={(e) => RemoveWholeNote(e)}
                        />
                    </div>
                </div>
            </div>
        </>
    );
}

export default Note;

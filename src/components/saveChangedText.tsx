import Button from "../commons/button";
import { NotesObjectType } from "../globalTypes";

interface SaveChangedTextProps {
    editedNote: string;
    setEditedNote: React.Dispatch<React.SetStateAction<string>>;
    saveEditedNote: (id: number) => void;
    cancelEdit: () => void;
    id: number;
    n: NotesObjectType;
}

function SaveChangedText({
    editedNote,
    setEditedNote,
    saveEditedNote,
    cancelEdit,
    id,
    n,
}: SaveChangedTextProps) {
    return (
        <div className="flex justify-between w-full">
            <input
                type="text"
                value={editedNote ? editedNote : n.currentNote}
                className="outline-none pl-[10px]"
                onChange={(e) => setEditedNote(e.target.value)}
            />
            <div className="flex gap-[10px]">
                <button
                    onClick={() => saveEditedNote(id)}
                    disabled={!editedNote ? true : false}
                    className={`border border-[#000000] px-[5px] py-[2px] rounded-[10px] ${
                        !editedNote && "bg-green-200"
                    }`}
                >
                    Save
                </button>
                <Button
                    ClickEvent={cancelEdit}
                    styles="border border-[#000000] px-[5px] py-[2px] rounded-[10px]"
                >
                    Cancel
                </Button>
            </div>
        </div>
    );
}

export default SaveChangedText;

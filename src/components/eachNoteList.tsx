import Button from "../commons/button";
import { NotesObjectType } from "../globalTypes";

interface EachNoteListTypes {
    n: NotesObjectType;
    editCurrentNote: (id: number) => void;
    handleRemoveNote: (id: number) => 0 | undefined;
    id: number;
}

function EachNoteList({
    n,
    editCurrentNote,
    handleRemoveNote,
    id,
}: EachNoteListTypes) {
    return (
        <>
            <p className="text-[20px]">{n.currentNote}</p>
            <div className="flex gap-[10px]">
                <Button
                    styles="border border-[#000000] px-[5px] py-[2px] rounded-[10px]"
                    ClickEvent={() => editCurrentNote(id)}
                >
                    edit
                </Button>
                <Button
                    styles="border border-[#000000] px-[5px] py-[2px] rounded-[10px]"
                    ClickEvent={() => handleRemoveNote(n.id)}
                >
                    remove
                </Button>
            </div>
        </>
    );
}

export default EachNoteList;

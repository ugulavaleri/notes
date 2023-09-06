import React from "react";

function Modal({
    children,
    title,
}: {
    children: React.ReactNode;
    title: string | undefined;
}) {
    return (
        <div>
            <div className="max-w-[400px] h-[300px] w-full rounded-[20px] bg-green-300 mx-auto border border-[#f7f7f7d9] p-[15px] relative">
                <div className="text-center text-[25px] font-bold">
                    <h1 className="mb-[15px]">{title}</h1>
                </div>
                {children}
            </div>
        </div>
    );
}

export default Modal;

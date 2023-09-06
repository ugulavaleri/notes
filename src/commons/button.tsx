interface ButtonTypes {
    ClickEvent: () => void;
    styles: string;
    children: React.ReactNode;
    aditionalInfo?: string | number;
}

function Button({ children, ClickEvent, styles, aditionalInfo }: ButtonTypes) {
    return (
        <button className={styles} onClick={ClickEvent}>
            {children}
        </button>
    );
}

export default Button;

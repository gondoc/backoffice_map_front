import React, {forwardRef} from "react";

interface EmailVerifyCodeInputProps {
    index: number;
    value: string;
    onPaste: (e: React.ClipboardEvent<HTMLInputElement>) => void;
    onChange: (e: React.ChangeEvent<HTMLInputElement>, index: number) => void;
    onKeyDown: (e: React.KeyboardEvent<HTMLInputElement>, index: number) => void;
    disabled?: boolean;
}

const EmailVerifyCodeInput = forwardRef<
    HTMLInputElement,
    EmailVerifyCodeInputProps
>(({index, value, onPaste, onKeyDown, onChange, disabled}, ref) => {
    return (
        <input
            type="text"
            ref={ref}
            className={"code-input"}
            maxLength={1}
            autoFocus={index === 0}
            value={value || ""}
            onPaste={(e) => onPaste(e)}
            onChange={(e) => onChange(e, index)}
            onKeyDown={(e) => onKeyDown(e, index)}
            disabled={disabled && disabled}
        />
    );
});

export default EmailVerifyCodeInput;

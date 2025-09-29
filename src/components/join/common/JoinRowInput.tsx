import {useEffect, useState} from "react";
import useDebounce from "@hook/useDebounce";
import {TErrorMsg} from "@type/user.types";
import {DEBOUNCE_DELAY} from "@config/common.const";
import styled from "styled-components";

const JoinRowInput = ({
                          label,
                          className,
                          type,
                          inputClassName,
                          placeholder,
                          autoFocus,
                          required,
                          setPayload,
                          errorMsg,
                          initValue,
                      }: {
    label: string;
    className?: string;
    type: string;
    inputClassName?: string;
    placeholder: string;
    autoFocus?: boolean;
    required?: boolean;
    errorMsg?: TErrorMsg;
    setPayload?: (payloadValue: string) => void;
    initValue?: string;
}) => {
    const [typing, setTyping] = useState<string>(initValue ? initValue : "");
    const debounceValue = useDebounce(typing, DEBOUNCE_DELAY);

    useEffect(() => {
        if (setPayload) {
            setPayload(debounceValue);
        }
    }, [debounceValue]);

    useEffect(() => {
        if (initValue) {
            setTyping(initValue);
        }
    }, [initValue])

    return (
        <StInputArea className="input-area" key={label}>
            <label htmlFor={label}>{label}</label>
            <div className={`${className ? className : ""}`}>
                <input
                    id={label}
                    autoComplete={"off"}
                    type={type}
                    value={typing}
                    name={label}
                    autoFocus={autoFocus}
                    onChange={(e) => setTyping(e.target.value)}
                    className={`${inputClassName ? inputClassName : ""} ${errorMsg !== "" ? "isError" : ""}`}
                    placeholder={placeholder}
                    required={required}
                />
                {errorMsg && <span>{errorMsg}</span>}
            </div>
        </StInputArea>
    );
};

export default JoinRowInput;


const StInputArea = styled.div`
    width: 422px;
    height: 82px;
    margin-bottom: 24px;

    label {
        display: block;
        text-align: left;
        margin-bottom: 8px;
        font-size: 16px;
        font-weight: 600;
        line-height: 16px;
        color: #111111;
    }

    input {
        width: 406px;
        height: 56px;
        border-radius: 8px;
        border: 1px solid #DCD9D9;
        padding-left: 16px;

        &::placeholder {
            font-size: 16px;
            font-weight: 400;
            line-height: 24px;
            text-align: left;
            color: #4D4D4D;
        }
    }

    input.isError {
        border: 1px solid #FF7777;
    }
`


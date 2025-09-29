import React, {useEffect, useState} from 'react';
import {useSearchParams} from 'react-router-dom';
import {useRcvryEmailVerifyMutation} from "@query/MemberQuery";
import styled from "styled-components";

const VerifyEmailPage = () => {
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState('verifying'); // verifying, success, error
    const [message, setMessage] = useState('');
    const [countdown, setCountdown] = useState(3);

    const {mutate: verifyRcvryEmail, isSuccess, isPending, isError} = useRcvryEmailVerifyMutation();

    useEffect(() => {
        const token = searchParams.get('token');

        if (!token) {
            setStatus('error');
            setMessage('유효하지 않은 인증 링크입니다.');
            return;
        }

        verifyRcvryEmail(token)
    }, [searchParams]);

    // 인증 성공 시 카운트다운 시작
    useEffect(() => {
        if (isSuccess) {
            setMessage('인증되었습니다!');
            const timer = setInterval(() => {
                setCountdown(prev => {
                    if (prev <= 1) {
                        clearInterval(timer);
                        window.close(); // 창 닫기
                        return 0;
                    }
                    return prev - 1;
                });
            }, 1000);

            return () => clearInterval(timer);
        }
    }, [isSuccess]);

    return (
        <StVerifyEmailPageWrapper>
            <StContentArea>
                {isPending && (
                    <>
                        <StSpinner/>
                        <StText>인증 처리 중...</StText>
                    </>
                )}

                {isSuccess && (
                    <>
                        <StIcon color="#4CAF50">✅</StIcon>
                        <StTitle>{message}</StTitle>
                        <StText>
                            {countdown}초 후 페이지가 닫힙니다.
                        </StText>
                        <StButton onClick={() => window.close()}>
                            지금 닫기
                        </StButton>
                    </>
                )}

                {isError && (
                    <>
                        <StIcon color="#f44336">❌</StIcon>
                        <StTitle>인증 실패</StTitle>
                        <StText>{message || '인증에 실패했습니다.'}</StText>
                    </>
                )}
            </StContentArea>
        </StVerifyEmailPageWrapper>
    );

};

export default VerifyEmailPage;

const StVerifyEmailPageWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    font-family: Arial, sans-serif;
    background-color: 'f5f5f5;
`

const StContentArea = styled.div`
    padding: 40px;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    max-width: 400px;
    width: 90%;
`

const StSpinner = styled.div`
    width: 40px;
    height: 40px;
    border: 3px solid #769FCD;
    border-top: 3px solid transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
    margin: 0 auto 20px;

    @keyframes spin {
        0% {
            transform: rotate(0deg);
        }
        100% {
            transform: rotate(360deg);
        }
    }
`;

const StIcon = styled.div`
    font-size: 48px;
    color: ${props => props.color};
    margin-bottom: 20px;
`;

const StTitle = styled.h2`
    color: #333;
    margin-bottom: 15px;
    font-size: 24px;
`;

const StText = styled.p`
    font-size: 16px;
    color: #666;
    margin-bottom: 20px;
`;

const StButton = styled.button`
    background-color: #769FCD;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 6px;
    cursor: pointer;
    font-size: 14px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    transition: background-color 0.2s;

    &:hover {
        background-color: #6590b8;
    }

    &:active {
        transform: translateY(1px);
    }
`;
import {useMutation, UseMutationResult, useQuery, UseQueryResult,} from "@tanstack/react-query";
import {AxiosError, AxiosResponse} from "axios";
import axios from "@config/axios.config";
import {QueryKeys} from "@query/QueryKeys";
import {IResponse} from "@type/common.types";
import Url from "@config/url";
import {IJoinPayload, ILoginPayload, IUserInfo} from "@type/user.types";

// // 이메일 인증 코드 검증 요청
// export const useVerifyEmailCodeMutation = (
//     successHandler?: (res: boolean) => void,
//     failHandler?: () => void,
// ): UseMutationResult<
//     boolean,
//     AxiosError,
//     { code: string; email: string },
//     unknown
// > =>
//     useMutation<boolean, AxiosError, { code: string; email: string }>({
//         mutationFn: (param: { code: string; email: string }) =>
//             axios
//                 .post(API.USER.VERIFY_CODE, {
//                     email: param.email,
//                     code: param.code,
//                 })
//                 .then((res) => {
//                     console.log("useVerifyEmailCodeMutation res ", res);
//                     return res.data.data;
//                 }),
//
//         onSuccess: (res) => {
//             console.log("useVerifyEmailCodeMutation onSuccess  res \n", res);
//             if (successHandler) {
//                 successHandler(res);
//             }
//         },
//
//         onError: (res) => {
//             console.log("useVerifyEmailCodeMutation onError  res \n", res);
//             if (failHandler) {
//                 failHandler();
//             }
//         },
//     });

// 로그인
export const useUserInfoMutation = (
    helpMsgHandler: (msg: string) => void,
    successHandler?: (res: boolean) => void,
    failHandler?: () => void,
): UseMutationResult<boolean, AxiosError, ILoginPayload, unknown> =>
    useMutation<boolean, AxiosError, ILoginPayload>({
        mutationFn: (param: ILoginPayload) =>
            axios.post(Url.AUTH.LOGIN,
                {
                    email: param.id,
                    password: param.pw,
                },
                {
                    withCredentials: true,
                },
            ).then((res) => {
                const isSuccess: boolean = res.data.code === 200 && res.data.message === "SUCCESS";
                if (!isSuccess) {
                    helpMsgHandler(res.data.data);
                }
                return isSuccess;
            }),
        onSuccess: (res: boolean) => {
            if (successHandler && res) {
                successHandler(res)
            }
        },
        onError: () => {
            if (failHandler) {
                failHandler();
            }
        },
    });

// me
export const useCurrentUserQuery = (): UseQueryResult<IUserInfo, AxiosError> => {
    return useQuery({
        queryKey: [QueryKeys.member.me],
        queryFn: () => axios.get(Url.AUTH.ME, {
            withCredentials: true
        }),
        enabled: false,
        retry: false,
        staleTime: 1000 * 60 * 60,
        select: ({data}) => {
            return data?.data;
        },
    });
};

// RecoveryMail
export const useCurrentRecoveryMailQuery = (): UseQueryResult<string, AxiosError> => {
    return useQuery({
        queryKey: [QueryKeys.member.email.recovery()],
        queryFn: () => axios.get(Url.AUTH.RECOVERY, {
            withCredentials: true
        }),
        enabled: false,
        retry: false,
        staleTime: 1000 * 60 * 60,
        select: ({data}) => data?.data,
    });
};

// logout
export const useLogOutUserQuery = (): UseQueryResult<boolean, AxiosError> => {
    return useQuery({
        queryKey: [QueryKeys.member.logout()],
        queryFn: () => axios.post(Url.AUTH.LOGOUT, {
            withCredentials: true
        }),
        enabled: false,
        retry: false,
        select: ({data}) => {
            return data?.data
        }
    });
};

// id-check
export const useUserEmailDupCheck = (
    param: string,
): UseQueryResult<AxiosResponse<IResponse<boolean>>, AxiosError> => {
    return useQuery({
        queryKey: [QueryKeys.member.idCheck(param)],
        queryFn: () => axios.get(Url.USER.ID_CHECK.replace(`{id}`, param)),
        enabled: false,
        retry: false,
    });
};

// // nick-check
// export const useUserNickDupCheck = (param: string): boolean => {
//     const {data} = useQuery({
//         queryKey: [QueryKeys.member.nickCheck(param)],
//         queryFn: () => axios.get(Url.USER.NICK_CHECK.replace(`{nick}`, param)),
//         enabled: param !== "",
//     });
//
//     return data && data?.data?.data;
// };

// nick-check
export const useUserNickDupCheck = (
    param: string,
): UseQueryResult<boolean, AxiosError> => {
    return useQuery({
        queryKey: [QueryKeys.member.nickCheck(param)],
        queryFn: () => axios.get(Url.USER.NICK_CHECK.replace(`{nick}`, param)),
        enabled: param !== "",
        select: ({data}) => data?.data,
    });
};

// 이메일 인증 코드 발송 요청
export const useSendEmailCode = (
    email: string,
    // ): UseQueryResult<AxiosResponse<IResponse<number>>, AxiosError> => {
): UseQueryResult<number, AxiosError> => {
    return useQuery({
        queryKey: [QueryKeys.member.email.codeSend(email)],
        queryFn: () =>
            axios.post(Url.USER.SEND_CODE, {
                email: email,
            }),
        enabled: false,
        retry: false,
        select: (data) => data?.data?.data,
    });
};

// 이메일 인증 코드 검증 요청
export const useVerifyEmailCodeMutation = (
    successHandler?: (res: boolean) => void,
    failHandler?: () => void,
): UseMutationResult<
    boolean,
    AxiosError,
    { code: string; email: string },
    unknown
> => useMutation<boolean, AxiosError, { code: string; email: string }>({
    mutationFn: (param: { code: string; email: string }) =>
        axios.post(Url.USER.VERIFY_CODE, {
            email: param.email,
            code: param.code,
        }).then((res) => {
            console.log("useVerifyEmailCodeMutation res ", res);
            return res.data.data;
        }),

    onSuccess: (res) => {
        console.log("useVerifyEmailCodeMutation onSuccess  res \n", res);
        if (successHandler) {
            successHandler(res);
        }
    },

    onError: (res) => {
        console.log("useVerifyEmailCodeMutation onError  res \n", res);
        if (failHandler) {
            failHandler();
        }
    },
});

// 닉네임 요청
export const useUserNickQuery = (): UseQueryResult<string | void, AxiosError> => {
    return useQuery({
        queryKey: QueryKeys.member.nick(),
        queryFn: () =>
            axios.get<IResponse<string>>(Url.USER.NICK)
                .then(({data}) => data?.data)
                .catch((err) => console.error("err ", err)),
    });
};

// 닉네임 변경
export const useModUserNickMutation = (
    successHandler: (res: boolean) => void,
    failHandler: (errorCd: string | number | undefined, msg?: string | undefined | unknown) => void,
): UseMutationResult<AxiosResponse, AxiosError, { userEmail: string, userNick: string }, unknown> =>
    useMutation<AxiosResponse, AxiosError, { userEmail: string, userNick: string }>({
        mutationFn: (param: { userEmail: string, userNick: string }) =>
            axios.patch(Url.USER.NICK, {
                email: param.userEmail,
                nickName: param.userNick,
            }).then((response) => {
                console.log("useModUserNickMutation res ", response);
                return response;
            }),

        onSuccess: (res: AxiosResponse) => {
            if (res && res.data?.code === 200) successHandler(res.data?.data);
            failHandler(res.data?.code, res.data?.data);
        },

        onError: ({response}) => {
            console.log("useModUserNickMutation onError  res \n", response);
            failHandler(response?.status, response?.data);
        },
    });

// 회원가입
export const useUserJoinMutation = (
    successHandler: () => void,
    failHandler: () => void,
): UseMutationResult<void, AxiosError, IJoinPayload, unknown> =>
    useMutation<void, AxiosError, IJoinPayload>({
        mutationFn: (param: IJoinPayload) =>
            axios.post(Url.USER.INFO, {
                // userId: param.userId,
                email: param.userEmail,
                password: param.userPw,
                nickName: param.userNick,
            }).then((res) => {
                console.log("useUserJoinMutation res ", res);
                return res.data.data;
            }),

        onSuccess: (res) => {
            console.log("useUserJoinMutation onSuccess  res \n", res);
            successHandler();
        },

        onError: (res) => {
            console.log("useUserJoinMutation onError  res \n", res);
            failHandler();
        },
    });

// 아디디 찾기
export const useFindIdMutation = (
    resultHandler: () => void,
    failHandler: () => void,
): UseMutationResult<boolean, AxiosError, string, unknown> =>
    useMutation<boolean, AxiosError, string>({
        mutationFn: (param: string) =>
            axios.post(Url.USER.FIND_ID, {
                email: param,
            }).then((res) => {
                console.log("useFindIdMutation res ", res);
                return res.data.data;
            }),

        onSuccess: (res) => {
            console.log("useFindIdMutation onSuccess  res \n", res);
            resultHandler();
        },

        onError: (res) => {
            console.log("useFindIdMutation onError  res \n", res);
            failHandler();
        },
    });

// 비밀번호 잊음
export const useForgotPwMutation = (
    resultHandler: () => void,
    failHandler: () => void,
): UseMutationResult<boolean, AxiosError, string, unknown> =>
    useMutation<boolean, AxiosError, string>({
        mutationFn: (param: string) =>
            axios.post(Url.AUTH.FIND_PW, {
                email: param,
            }).then((res) => {
                console.log("useForgotPwMutation res ", res);
                return res.data.data;
            }),

        onSuccess: (res) => {
            console.log("useForgotPwMutation onSuccess  res \n", res);
            resultHandler();
        },

        onError: (res) => {
            console.log("useForgotPwMutation onError  res \n", res);
            failHandler();
        },
    });

// 비밀번호 재설정
export const useResetPwMutation = (
    resultHandler: () => void,
    failHandler: () => void,
): UseMutationResult<boolean, AxiosError, { token: string, newPw: string }, unknown> =>
    useMutation<boolean, AxiosError, { token: string, newPw: string }>({
        mutationFn: (param: { token: string, newPw: string }) =>
            axios.post(Url.AUTH.RESET_PW, {
                token: param.token,
                newPassword: param.newPw,
            }).then((res) => {
                console.log("useResetPwMutation res ", res);
                return res.data.data;
            }),

        onSuccess: (res) => {
            console.log("useResetPwMutation onSuccess  res \n", res);
            resultHandler();
        },

        onError: (res) => {
            console.log("useResetPwMutation onError  res \n", res);
            failHandler();
        },
    });

// 비밀번호 변경
export const useChangePwMutation = (
    successHandler: (res: boolean) => void,
    failHandler: (errorCd: string | number | undefined, msg?: string | undefined | unknown) => void,
): UseMutationResult<AxiosResponse, AxiosError, { userEmail: string, pw: string, newPw: string }, unknown> =>
    useMutation<AxiosResponse, AxiosError, { userEmail: string, pw: string, newPw: string }>({
        mutationFn: (param: { userEmail: string, pw: string, newPw: string }) =>
            axios.patch(Url.AUTH.CHANGE_PW, {
                email: param.userEmail,
                pw: param.pw,
                newPw: param.newPw,
            }).then((res) => {
                console.log("useChangePwMutation res ", res);
                return res;
            }),

        onSuccess: (res: AxiosResponse) => {
            if (res && res.data?.code === 200) {
                successHandler(res.data?.data)
            } else {
                failHandler(res.data?.code, res.data?.data);
            }
        },

        onError: ({response}) => {
            console.log("useModUserNickMutation onError  res \n", response);
            failHandler(response?.status, response?.data);
        },
    });

// 복구 이메일 등록
export const useRcvryEmailMutation = (
    successHandler: (res: boolean) => void,
    failHandler: (errorCd: string | number | undefined, msg?: string | undefined | unknown) => void,
): UseMutationResult<AxiosResponse, AxiosError, { email: string, rcvryEmail: string }, unknown> =>
    useMutation<AxiosResponse, AxiosError, { email: string, rcvryEmail: string }>({
        mutationFn: (param: { email: string, rcvryEmail: string }) =>
            axios.post(Url.USER.RCVRY_EMAIL, {
                email: param.email,
                rcvryEmail: param.rcvryEmail,
            }).then((res) => {
                console.log("useRcvryEmailMutation res ", res);
                return res;
            }),

        onSuccess: (res) => {
            console.log("useRcvryEmailMutation onSuccess  res \n", res);
            if (res && res.data?.code === 200) {
                successHandler(res.data?.data);
            } else {
                failHandler(res.data?.code, res.data?.data);
            }
        },

        onError: ({response}) => {
            console.log("useRcvryEmailMutation onError  res \n", response);
            failHandler(response?.status, response?.data);
        },
    });

// 복구 이메일 인증
export const useRcvryEmailVerifyMutation = (): UseMutationResult<boolean, AxiosError, string, unknown> =>
    useMutation<boolean, AxiosError, string>({
        mutationFn: (param: string) =>
            axios.post(Url.USER.VERIFY_EMAIL, {
                token: param
            }).then(({data}) => {
                console.log("useRcvryEmailVerifyMutation res ", data);
                return data?.data;
            }),
    });
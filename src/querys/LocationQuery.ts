import {useMutation, UseMutationResult, useQuery, UseQueryResult} from "@tanstack/react-query";
import {AxiosError} from "axios";
import axios from "@config/axios.config";

import {QueryKeys} from "@query/QueryKeys";
import Url from "@config/url";
import {ILocation} from "@type/location.types";

export const useLocationQuery = (): UseQueryResult<ILocation[], AxiosError> => {
    return useQuery({
        queryKey: [QueryKeys.MAP.site()],
        queryFn: () => axios.get(Url.LOCATION.LIST),
        select: ({data}) => data?.data,
    })
}

export const useLocationRegMutation = (
    successHandler: (res: ILocation) => void,
    failHandler: (errorCd: string, msg?: string) => void,
): UseMutationResult<ILocation, AxiosError, FormData, unknown> => useMutation<ILocation, AxiosError, FormData>({
    mutationFn: (param: FormData) => axios.post(Url.LOCATION.REG, param, {
        headers: {"Content-Type": "multipart/form-data"}
    }).then(({data}) => {
        if (data?.code === 405) return failHandler(data?.code, data?.message);
        return data?.data
    }),

    onSuccess: (res: ILocation) => {
        successHandler(res)
    },

    onError: (res) => {
        console.error("location register failed ", res);
        failHandler(res.code as string)
    },
})

export const useLocationModMutation = (
    successHandler: (res: ILocation) => void,
    failHandler: (errorCd?: string | number, msg?: string | undefined | unknown) => void,
): UseMutationResult<ILocation, AxiosError, FormData, unknown> => useMutation<ILocation, AxiosError, FormData>({
    mutationFn: (param: FormData) => axios.patch(Url.LOCATION.MOD, param, {
        headers: {"Content-Type": "multipart/form-data"}
    }).then((response) => {
        return response.data
    }),

    onSuccess: (res: ILocation) => {
        successHandler(res)
    },

    onError: ({response}) => {
        failHandler(response?.status, response?.data)
    },
})

export const useLocationDelMutation = (
    successHandler: () => void,
    failHandler: (errorCd?: string | number, msg?: string | undefined | unknown) => void,
): UseMutationResult<boolean, AxiosError, string, unknown> => useMutation<boolean, AxiosError, string>({
    mutationFn: (param: string) => axios.delete(Url.LOCATION.DEL.replace(`{id}`, param))
        .then((response) => {
            return response.data
        }),

    onSuccess: (res: boolean) => {
        if (res) {
            successHandler()
        } else {
            failHandler()
        }
    },

    onError: ({response}) => {
        failHandler(response?.status, response?.data)
    },
})

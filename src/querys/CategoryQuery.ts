import {useMutation, UseMutationResult, useQuery, UseQueryResult} from "@tanstack/react-query";
import {AxiosError} from "axios";
import axios from "@config/axios.config";

import {QueryKeys} from "@query/QueryKeys";
import Url from "@config/url";
import {ICategory} from "@type/categories.types";
import {IHomeStat} from "@type/common.types";

export const useCategoryQuery = (): UseQueryResult<ICategory[], AxiosError> => {
    return useQuery({
        queryKey: [QueryKeys.MAP.cate()],
        queryFn: () => axios.get(Url.CATEGORY.LIST),
        select: ({data}) => {
            return data?.data
        },
    })
}

export const useCategoryStatQuery = (): UseQueryResult<IHomeStat, AxiosError> => {
    return useQuery({
        queryKey: [QueryKeys.MAP.stat()],
        queryFn: () => axios.get(Url.CATEGORY.STAT),
        select: ({data}) => data,
    })
}

export const useCategoryRegMutation = (
    successHandler: (res: ICategory) => void,
    failHandler: (errorCd: string, msg?: string) => void,
): UseMutationResult<ICategory, AxiosError, ICategory, unknown> => useMutation<ICategory, AxiosError, ICategory>({
    mutationFn: (param: ICategory) => axios.post(Url.CATEGORY.REG, {
        name: param.nm,
        content: param.content
    }).then(({data}) => {
        if (data?.code === 405) return failHandler(data?.code, data?.message);
        return data?.data
    }),

    onSuccess: (res: ICategory) => {
        successHandler(res)
    },

    onError: (res) => {
        console.error("category register failed ", res);
        failHandler(res.code as string)
    },
})

export const useCategoryModMutation = (
    successHandler: (res: ICategory) => void,
    failHandler: (errorCd: string | number | undefined, msg?: string | undefined | unknown) => void,
): UseMutationResult<ICategory, AxiosError, Omit<ICategory, "isShow">, unknown> => useMutation<ICategory, AxiosError, Omit<ICategory, "isShow">>({
    mutationFn: (param: Omit<ICategory, "isShow">) => axios.patch(Url.CATEGORY.MOD, param)
        .then((response) => {
            return response.data
        }),

    onSuccess: (res: ICategory) => {
        successHandler(res)
    },

    onError: ({response}) => {
        failHandler(response?.status, response?.data)
    }
})

export const useCategoryDelMutation = (
    successHandler: () => void,
    failHandler: (errorCd?: string | number, msg?: string | undefined | unknown) => void,
): UseMutationResult<boolean, AxiosError, string, unknown> => useMutation<boolean, AxiosError, string>({
    mutationFn: (param: string) => axios.delete(Url.CATEGORY.DEL.replace(`{id}`, param))
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
    }
})

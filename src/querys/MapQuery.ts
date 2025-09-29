import {useMutation, UseMutationResult, useQuery, UseQueryResult} from "@tanstack/react-query";
import {AxiosError, type AxiosResponse} from "axios";
import axios from "@config/axios.config";
import {IHistory, IHistRegisterForm, IYearHistory} from "@type/hist.types";
import {QueryKeys} from "@query/QueryKeys";
import Url from "@config/url";
import type {IResponse} from "@type/common.types";

export const useHistQuery = (): UseQueryResult<IHistory[], AxiosError> => {
    return useQuery({
        queryKey: [QueryKeys.MAP.list()],
        queryFn: () => axios.get(Url.MAP.LIST),
        enabled: false,
        select: ({data}) => data?.data
    })
}

export const useYearHistQuery = (): UseQueryResult<IYearHistory[], AxiosError> => {
    return useQuery({
        queryKey: [QueryKeys.MAP.year()],
        queryFn: () => axios.get(Url.MAP.YEAR),
        enabled: false,
        select: ({data}) => data?.data
    })
}

export const useSiteQuery = (): UseQueryResult<AxiosResponse<IResponse<IYearHistory[]>>, AxiosError> => {
    return useQuery({
        queryKey: [QueryKeys.MAP.year()],
        queryFn: () => axios.get(Url.MAP.YEAR),
        enabled: false,
        select: ({data}) => data?.data
    })
}

export const useHistRegMutation = (
    successHandler: (res: IHistory) => void,
    failHandler: (errorCd: string, msg?: string) => void,
): UseMutationResult<IHistory, AxiosError, IHistRegisterForm, unknown> => useMutation<IHistory, AxiosError, IHistRegisterForm>({
    mutationFn: (param: IHistRegisterForm) => axios.post(Url.MAP.REG, {
        // name: param.nm,
        // content: param.content
        histNm: param.histNm,
        staffCnt: param.staffCnt,
        categoryId: param.cateId,
        siteId: param.siteId,
        startDtm: param.startDtm,
        endDtm: param.endDtm,
    }).then(({data}) => {
        if (data?.code === 405) return failHandler(data?.code, data?.message);
        return data?.data
    }),

    onSuccess: (res: IHistory) => {
        successHandler(res)
    },

    onError: (res) => {
        console.error("history register failed ", res);
        failHandler(res.code as string)
    },
})

export const useHistModMutation = (
    successHandler: (res: IHistory) => void,
    failHandler: (errorCd: string | number | undefined, msg?: string | undefined | unknown) => void,
): UseMutationResult<AxiosResponse, AxiosError, IHistRegisterForm, unknown> => useMutation<AxiosResponse, AxiosError, IHistRegisterForm>({
    mutationFn: (param: IHistRegisterForm) => axios.patch(Url.MAP.MOD, {
        histId: param.id,
        histNm: param.histNm,
        staffCnt: param.staffCnt,
        categoryId: param.cateId,
        siteId: param.siteId,
        startDtm: param.startDtm,
        endDtm: param.endDtm,
    }).then((response) => {
        return response
    }),

    onSuccess: (res: AxiosResponse) => {
        if (res && res.data?.code === 200) {
            successHandler(res.data)
        } else {
            failHandler(res.data?.code, res.data?.data)
        }
    },

    onError: ({response}) => {
        failHandler(response?.status, response?.data)
    }
})

export const useHistDelMutation = (
    successHandler: () => void,
    failHandler: (errorCd?: string | number, msg?: string | undefined | unknown) => void,
): UseMutationResult<AxiosResponse, AxiosError, string, unknown> => useMutation<AxiosResponse, AxiosError, string>({
    mutationFn: (param: string) => axios.delete(Url.MAP.DEL.replace(`{id}`, param))
        .then((response) => {
            console.log('response ', response)
            // return response.data.code === 200
            return response
        }),

    onSuccess: (res) => {
        if (res && res.data?.code === 200) {
            successHandler()
        } else {
            failHandler(res.data?.code, res.data?.data)
        }
    },

    onError: ({response}) => {
        console.log('response ', response)
        failHandler(response?.status, response?.data)
    }
})

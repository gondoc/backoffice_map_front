import {TStatus} from "@type/common.types";

export interface IHistory {
    categoryContent: string,
    categoryNm: string,
    startDtm: string,
    endDtm: string,
    histNm: string,
    id: string,
    lat: string,
    lng: string,
    logoImgPath: string,
    siteId: string,
    siteNm: string,
    staffCnt: number,
    // createDtm: string,
    lastUpdateDtm: string,
    isLock: boolean
}

export interface IYearHistory {
    yearLabel: string,
    histRecords: IHistory[]
}

export interface IHistRegisterForm {
    id?: string,
    histNm: string,
    siteId: string,
    siteNm: string,
    cateId: string,
    cateNm: string,
    staffCnt: number | string,
    startDtm?: string,
    endDtm?: string,
    isShow: boolean,
    status: TStatus
}
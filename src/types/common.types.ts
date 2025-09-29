import {IHistory} from "./hist.types";
import React from "react";

export type TStatus = "none"
    | "add"
    | "mod"
    | "del"

export interface IResponse<T> {
    code: number;
    message: string;
    data: T
}

export interface ILabelValue {
    label: string,
    value: string | number,
}

export interface ILabelValueStatus extends ILabelValue {
    status?: TStatus,
    prevNav?: {
        value: string | number,
        label: string
    },
}

export type TitleType = "none" // 초기화 상태
    | "projects"    // 전체 보기
    | "year"     // 연도별 보기
    | "timeline"    // 타임라인 보기

export interface INavInfo {
    currentNav: TitleType
    isOpen: boolean,
    activeHistItem: IHistory | null,
    year: {
        isOpen: boolean,
        activeYear: string | null,
    } | null,
    isPlay?: boolean
}

export type ToastStatusType = "none" // 토스트 초기화 상태
    | "success"     // 성공.
    | "failed"      // 실패.
    | "noResult"    // 검색 결과 없음.
    | "reset"       // 화면이 초기화되었습니다.
    | "error"       // 통신 상태 에러 // 잠시후 다시 시도 바랍니다.
    | "activeTimeline"         // 타임라인을 시작합니다.
    | "deactivatedTimeline"    // 타임라인을 종료합니다.

export interface ToastState {
    status: ToastStatusType,
    msg: string,
}

export interface IDialogStatus extends Omit<ToastState, "status"> {
    isOpen: boolean,
    isJustConfirm: boolean,
    status: TStatus
    title: string,
    msg: string,
    leftBtn?: React.ReactNode | null,
    rightBtn?: React.ReactNode | null,
    noCloseBtn?: boolean,
}

export interface IHomeStat {
    activeCnt: number;
    inActiveCnt: number;
}
import {ILabelValue, ILabelValueStatus} from "@type/common.types";
import {TModUserTab} from "@type/user.types";


export interface INav {
    subject: string,
    items: ILabelValueStatus[]
}

export enum NAV_VALUE {
    HOME,
    STATISTICS,
    HIST_LIST,
    HIST_ADD,
    CATE_LIST,
    CATE_ADD,
    LOCA_LIST,
    LOCA_ADD,
    LOCA_MOD,
    LOCA_DEL,
    MOD_ACCOUNT,
    ACCOUNT_MNG,
    SYS_LOG,
}

export const NAV_CONSTANT: INav[] = [
    {
        subject: "대시보드",
        items: [
            {
                label: "요약",
                value: NAV_VALUE.HOME
            }
        ]
    },
    {
        subject: "프로젝트 관리",
        items: [
            {
                label: "이력 관리",
                value: NAV_VALUE.HIST_LIST,
            },
            {
                label: "분류 관리",
                value: NAV_VALUE.CATE_LIST,
            },
            {
                label: "지역 관리",
                value: NAV_VALUE.LOCA_LIST,
            },
            // {
            //     label: "새 프로젝트 등록",
            //     value: NAV_VALUE.HIST_ADD
            // },
        ]
    },
    // {
    //     subject: "프로젝트 분류 관리",
    //     items: [
    //         {
    //             label: "분류 목록",
    //             value: NAV_VALUE.CATE_LIST
    //         },
    //         {
    //             label: "새 분류 등록",
    //             value: NAV_VALUE.CATE_ADD
    //         }
    //     ]
    // },
    // {
    //     subject: "지역 관리",
    //     items: [
    //         {
    //             label: "지역 목록",
    //             value: NAV_VALUE.LOCA_LIST
    //         },
    //         {
    //             label: "새 지역 등록",
    //             value: NAV_VALUE.LOCA_ADD
    //         }
    //     ]
    // },
    {
        subject: "설정",
        items: [
            {
                label: "내 정보 관리",
                value: NAV_VALUE.MOD_ACCOUNT
            },
            {
                label: "계정 관리",
                value: NAV_VALUE.ACCOUNT_MNG
            },
            // {
            //     label: "시스템 로그",
            //     value: NAV_VALUE.SYS_LOG
            // }
        ]
    },
]

export const MAP_DEFAULT_CONST = {
    position: {center: {lat: 36.514217, lng: 127.602323}}, // initialize load default crdnt
    zoomLv: {
        init: 12,
        active: 10,
        timeline: 11,
    },
}

export interface IModLabelValue extends ILabelValue {
    value: TModUserTab
}

export const MOD_USER_STEP_LABEL: IModLabelValue[] = [
    {label: "내 정보 보기", value: "default"},
    {label: "닉네임 변경", value: "nickname"},
    {label: "복구 이메일 등록 · 변경", value: "recoveryEmail"},
    {label: "비밀번호 변경", value: "password"},
]


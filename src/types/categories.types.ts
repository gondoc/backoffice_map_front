import {IHomeStat} from "@type/common.types";

export interface ICategory {
    isShow: boolean,
    id?: string,
    nm: string,
    content: string,
    createDtm?: string,
    updateDtm?: string,
    isLock?: boolean,
}

export interface ICategoryStat extends IHomeStat {
    key: string;
}
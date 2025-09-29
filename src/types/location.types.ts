export interface IRegisterForm {
    id?: string,
    name: string,
    x: string,
    y: string,
    file: File | undefined,
    fileName: string | undefined,
    isShow: boolean
}

export interface ICoordinateIcon extends ICoordinate {
    isActive: boolean;
}

export interface ICoordinate {
    x: string,
    y: string,
}

export interface ILocation {
    id: string,
    nm: string,
    lat: string,
    lng: string,
    logoImgPath: string,
    isLock: boolean,
}
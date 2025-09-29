export interface IMapCenter {
    center: {
        lat: number;
        lng: number;
    } | {
        x: number;
        y: number;
    };
}

declare module '*.mdx'
declare module "*.png"
declare module "*.jpg"
declare module '*.css'
declare module '*.scss'
declare module '*.mp3'
declare module '*.svg' {
    import * as React from 'react';

    export const ReactComponent: React.FunctionComponent<
        React.SVGProps<SVGSVGElement> & {title?: string}
    >;

    const src: string;
    export default src;
}

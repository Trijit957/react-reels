type screens = 'largeScreen' | 'mediumScreen' | 'smallScreen' | 'extraSmallScreen';
type widths = 'w1' | 'w2' | 'w3';

export type sizeObjType = {
   [key in screens]: number;
}

export type screenWidthObjType = {
    [key in widths]: number;
}


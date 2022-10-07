export type ReelsType = {
    id: number;
    reelInfo: ReelInfoType;
    rightMenu?: RightMenuType;
    bottomSection?: BottomSectionType;
}

export type ReelInfoType = {
    url: string;
    type: string;
    description?: string;
    postedBy?: PostedByType;
    likes?: LikesType;
    dislikes?: DislikesType;
    comments?: CommentsType;
    shares?: SharesType;  
}

export type PostedByType = {
    avatar: string;
    name: string;
}

export type LikesType = {
    count: number;
}

export type DislikesType = {
    count: number;
}

export type CommentsType = {
    count: number;
}

export type SharesType = {
    count: number;
}

export type RightMenuType = {
    options: Array<OptionType>;
}

export type OptionType = {
    id: number;
    label: string;
    value: number | string | boolean;
}

export type BottomSectionType = {
    component: JSX.Element | null;
}

export type ReelMetaInfoType = {
    videoDimensions?: {
        height?: number;
        width?: number;
      },
    backGroundColor?: string;
    borderRadius?: number;
    likeActiveColor?: string;
    dislikeActiveColor?: string;
}
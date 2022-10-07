import * as React from 'react'
import ReelsComponent from './components/ReelsComponent'
import { ReelMetaInfoType, ReelsType } from './components/ReelsComponent/reels.type'

interface Props {
  reels: Array<ReelsType>,
  reelMetaInfo?: ReelMetaInfoType,
  onMenuItemClicked?: (event: any) => any;
  onLikeClicked?: (reel: ReelsType) => any;
  onDislikeClicked?: (reel: ReelsType) => any;
  onCommentClicked?: (reel: ReelsType) => any;
  onShareClicked?: (reel: ReelsType) => any;
  onAvatarClicked?: (reel: ReelsType) => any;
}

export const Reels: React.FC<Props> = ({ reels, reelMetaInfo, onMenuItemClicked, onLikeClicked, onDislikeClicked, onCommentClicked, onShareClicked, onAvatarClicked }): JSX.Element => {
  return (
    <ReelsComponent
       reels={reels}
       reelMetaInfo={reelMetaInfo}
       onMenuItemClicked={onMenuItemClicked}
       onLikeClicked={onLikeClicked}
       onDislikeClicked={onDislikeClicked}
       onCommentClicked={onCommentClicked}
       onShareClicked={onShareClicked}
       onAvatarClicked={onAvatarClicked}
    />
  )
}

# @sayings/react-reels

> A minimalistic Video Reels/Shorts (like Instagram Reels or Youtube Shorts) component for React
(Compatiable for both Desktop and mobile screens)

[![NPM](https://img.shields.io/npm/v/@sayings/react-reels.svg)](https://www.npmjs.com/package/@sayings/react-reels) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save @sayings/react-reels
```

![Alt text](https://firebasestorage.googleapis.com/v0/b/whatsapp-clone-176af.appspot.com/o/desktop.png?alt=media&token=8428f52d-503f-4547-bb92-62461b22c923)

![Alt text](https://firebasestorage.googleapis.com/v0/b/whatsapp-clone-176af.appspot.com/o/mobile%20(1).jpeg?alt=media&token=6888cb99-1ab5-48bc-b7b8-fe0628331879)

## Usage

```tsx
import React, { Reels } from 'react'

import MyComponent from '@sayings/react-reels'
import '@sayings/react-reels/dist/index.css'

const App = () => {
  return (
    <Reels
      reels={reels}
      reelMetaInfo={reelMetaInfo}
      onMenuItemClicked={(event) => {
          console.log(event.value) 
          // other actions
      }}
      onLikeClicked={(reel) => {
          console.log(reel) // current Reel Data
          // other actions
      }}
      onDislikeClicked={(reel) => console.log(reel)}
      onCommentClicked={(reel) => console.log(reel)}
      onShareClicked={(reel) => console.log(reel)}
      onAvatarClicked={(reel) => console.log(reel)}
    />
  )
}
```
## Props

| Name           | Required | Default          | Description                                                                                                                                                                                                                       |
| -------------- | -------- | ---------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `reels`     | yes      |                  |  Array of Objects Containing all the necessary information about each reel.                                                                                                                                                      |
| `reelMetaInfo`       | no      |                  | Meta Details of the Reels Component such as Background colour, height, width etc.                                                                                                                                                                         |
| `onMenuItemClicked`      | no      |                  | Callback Function that is called when any of menu items is clicked (When Right Menu is used).                                                                                                                                                               |
| `onLikeClicked`  | no       |             | Callback Function that is called when like button is clicked (It automatically updates the count accordingly).                                                                                                                                                                                                 |
| `onDislikeClicked`  | no       |                  | Callback Function that is called when dislike button is clicked (It automatically updates the count accordingly).                                                                                                                                                              |
| `onCommentClicked`    | no       |                  | Callback Function that is called when comment button is clicked.                                                                                                                                                         |
| `onShareClicked` | no       |                  |Callback Function that is called when share button is clicked.                                                                                                                                                            |
| `onAvatarClicked`   | no       |                  | Callback Function that is called when Avatar is clicked.                                                                                 

## Interfaces
1. reels: 
   Array of Objects of type **ReelsType**.
```tsx
   type ReelsType = {
    id: number; // unique identifier
    reelInfo: {
        url: string; // Video url
        type: string; // Type of the video
        description?: string; // Description of the video
        postedBy?: {
            avatar: string; // Image Url of Avatar 
            name: string; // Name of the uploader
        };
        likes?: {
            count: number; // number of likes
        };
        dislikes?: {
            count: number; // number of dislikes
        };;
        comments?: {
            count: number; // number of comments
        };
        shares?: {
            count: number; // number of shares
        }; 
    }
    rightMenu?: { // Right Three dot menu
        options: Array<{ // each option
            id: number; // unique identifier
            label: string; // display label
            value: string; // actual value
        }>
    };
    bottomSection?: { // If Custom Component is used for Avatar, description etc instead of default
        component: JSX.Element; // Any HTML or JSX Element
    };
}
```
2. reelMetaInfo:
   Its optional, just in case custom styling is required.
   Its an Object of type **ReelMetaInfoType**.
```tsx
    type ReelMetaInfoType = {
        videoDimensions?: {
            height?: number; // height of the each reel container
            width?: number; // width of the each reel container
        },
        backGroundColor?: string; // background colour for desktop view
        borderRadius?: number; // border radius of each reel container
        likeActiveColor?: string; // like icon colour when clicked
        dislikeActiveColor?: string; // dislike icon color when clicked
    }
```

## License

ISC © [Trijit Goswami](https://github.com/Trijit957/react-reels)

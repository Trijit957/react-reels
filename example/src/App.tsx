import React from 'react'

import { Reels } from '@sayings/react-reels'
import '@sayings/react-reels/dist/index.css'

const reels = [
  {
    id: 1,
    reelInfo: {
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      type: 'video/mp4',
      description: 'Lorem ipsum dolor sit amet?',
      postedBy: {
        avatar: 'https://avatars.dicebear.com/api/big-smile/trijit.svg?mood[]=happy&background=%23efefef',
        name: 'Trijit Goswami'
      },
      likes: {
        count: 759878
      },
      dislikes: {
        count: 124
      },
      comments: {
        count: 10089.345
      },
      shares: {
        count: 299792458
      }
    },
    rightMenu: {
      options: [
        {
          id: 1,
          label: 'Option 1',
          value: 'option-1'
        },
        {
          id: 2,
          label: 'Option 2',
          value: 'option-2'
        },
        {
          id: 3,
          label: 'Option 3',
          value: 'option-3'
        }
      ]
    }
  },
  {
    id: 2,
    reelInfo: {
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      type: 'video/mp4',
      description: 'Lorem ipsum dolor sit amet?',
      postedBy: {
        avatar: 'https://avatars.dicebear.com/api/big-smile/sourav.svg?mood[]=happy&background=%23efefef',
        name: 'Sourav Halder'
      },
      likes: {
        count: 559878
      },
      dislikes: {
        count: 12
      },
      comments: {
        count: 10089.345
      },
      shares: {
        count: 299792458
      }
    },
    rightMenu: {
      options: [
        {
          id: 1,
          label: 'Option 1',
          value: 'option-1'
        },
        {
          id: 2,
          label: 'Option 2',
          value: 'option-2'
        },
        {
          id: 3,
          label: 'Option 3',
          value: 'option-3'
        }
      ]
    }
  },
  {
    id: 3,
    reelInfo: {
      url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      type: 'video/mp4',
      description: 'Lorem ipsum dolor sit amet?',
      postedBy: {
        avatar: 'https://avatars.dicebear.com/api/big-smile/sanjib.svg?mood[]=happy&background=%23efefef',
        name: 'Sanjib Kumar Mandal'
      },
      likes: {
        count: 123
      },
      dislikes: {
        count: 0
      },
      comments: {
        count: 14
      },
      shares: {
        count: 0
      }
    },
    rightMenu: {
      options: [
        {
          id: 1,
          label: 'Option 1',
          value: 'option-1'
        },
        {
          id: 2,
          label: 'Option 2',
          value: 'option-2'
        },
        {
          id: 3,
          label: 'Option 3',
          value: 'option-3'
        }
      ]
    }
  },

  
]

const reelMetaInfo = {
  videoDimensions: {
    height: 580,
    width: 330,
  },
  backGroundColor: '#000000',
  borderRadius: 10
}

const App = () => {
  return (
    <Reels
      reels={reels}
      reelMetaInfo={reelMetaInfo}
      onMenuItemClicked={(event) => console.log("From Parent", event)}
      onLikeClicked={(reel) => console.log("From Parent", reel)}
      onDislikeClicked={(reel) => console.log("From Parent", reel)}
      onCommentClicked={(reel) => console.log("From Parent", reel)}
      onShareClicked={(reel) => console.log("From Parent", reel)}
      onAvatarClicked={(reel) => console.log("From Parent", reel)}
    />
  )
}

export default App

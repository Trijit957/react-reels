/* React Library Import */
import React, { createRef, Fragment, RefObject, useEffect, useRef, useState } from 'react'

/* React Swiper Import */
import { Mousewheel } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';

/* React Menu Import */
import { Menu, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';

/* React Icons Import */
import { GiPauseButton } from 'react-icons/gi';
import { BsPlayFill, BsThreeDots } from 'react-icons/bs';
import { GiSpeaker, GiSpeakerOff } from 'react-icons/gi';
import { FaThumbsUp, FaThumbsDown } from 'react-icons/fa';
import { BiCommentDetail } from 'react-icons/bi';
import { IoIosShareAlt } from 'react-icons/io';
import { BsThreeDotsVertical } from 'react-icons/bs';

/* Style Sheet Import */
import styles from './index.module.css'

/* Custom Hook Import */
import useSizeMode, { sizeObj } from '../../hooks/size';
import { OptionType, ReelMetaInfoType, ReelsType } from './reels.type';
import useNumberFilter from '../../hooks/numberFilter';

/* Prop Type for Reels Component */
type ReelsPropType = {
  reels: Array<ReelsType>;
  reelMetaInfo?: ReelMetaInfoType;
  onMenuItemClicked?: (event: any) => any;
  onLikeClicked?: (reel: ReelsType) => any;
  onDislikeClicked?: (reel: ReelsType) => any;
  onCommentClicked?: (reel: ReelsType) => any;
  onShareClicked?: (reel: ReelsType) => any;
  onAvatarClicked?: (reel: ReelsType) => any;
}

/* Reels Functional Component Definition (returns the required jsx) */
const ReelsComponent: React.FC<ReelsPropType> = ({ reels, reelMetaInfo, onMenuItemClicked, onLikeClicked, onDislikeClicked, onCommentClicked, onShareClicked, onAvatarClicked }): JSX.Element =>  {

  /* Assigning the size mode according to screen (Custom Hook) */
  const sizeMode = useSizeMode();

  /* Collecting all the Video Element References from the DOM */
  const videoElementRefs = useRef<Array<RefObject<HTMLVideoElement>>>(reels.map(() => createRef<HTMLVideoElement>()));

  /* State Variables */
  const [currentVideoElementRef, setCurrentVideoElementRef] = useState<RefObject<HTMLVideoElement>>(videoElementRefs.current[0]); /* Ref. of Current Playing Video Element */
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(true); /* Video is playing or not */
  const [isAudioOn, setIsAudioOn] = useState<boolean>(false); /* Audio is on or not */
  const [reelData, setReelData] = useState<any>(reels.map(reel => (
    {
      id: reel.id,
      likes: {
        isTap: false,
        count: reel.reelInfo.likes?.count
      },
      dislikes: {
        isTap: false,
        count: reel.reelInfo.dislikes?.count
      }
    }
  )))


  /* Life Cycle Hook (In this case runs only once after load) */
  useEffect(() => {

    /* Playing the First video */
    isPlayingVideo ? currentVideoElementRef?.current?.play()
                   : currentVideoElementRef?.current?.pause()

    /* Pausing the rest of videos */
    let otherVideoElementRefs: Array<RefObject<HTMLVideoElement>> = videoElementRefs.current.filter((_, index: number) => index !== 0);
      otherVideoElementRefs.forEach((ref: RefObject<HTMLVideoElement>) => {
        ref.current?.pause();
    })



  }, []) // Dependency array should be blank in order to run useEffect only once


  /**
   * @param event 
   * Runs after Every Swipe of Video
   */
  const handleSlideChange = (event: any): void => {

    /* Current Video Ref. */
    let currentVideoElementRef: RefObject<HTMLVideoElement> | undefined = videoElementRefs.current.find((_, index: number) => index === event.realIndex);
    /* Other Video Refs. */
    let otherVideoElementRefs: Array<RefObject<HTMLVideoElement>> = videoElementRefs.current.filter((_, index: number) => index !== event.realIndex);

    /* Set the ref. of Current Video and required booleans */
    if(currentVideoElementRef) {
      setCurrentVideoElementRef(currentVideoElementRef);
      setIsPlayingVideo(true);
    }

    /* Play the current Video */
    currentVideoElementRef?.current?.play();
   
    /* Pausing other videos */
    otherVideoElementRefs.forEach((ref: RefObject<HTMLVideoElement>) => {
      ref.current?.pause();
    })

  }
  
  /**
   * Responsible for playing and pausing current video by clicking the play/pause button
   * @param isPlaying 
   */
  const handlePlayPauseVideo = (isPlaying: boolean): void => {  
    if(isPlaying) {
      setIsPlayingVideo(true);
      currentVideoElementRef?.current?.play();
    } else {
      setIsPlayingVideo(false);
      currentVideoElementRef?.current?.pause();
    }

  }


  /**
   * Responsible for playing and pausing the current video by clicking on the video itself
   */
  const handleClickOnVideo = (): void => {
    isPlayingVideo ? handlePlayPauseVideo(false) 
                   : handlePlayPauseVideo(true);
  }


  /**
   * Responsible for on/off audio by clicking the Audio on/off button
   * @param event 
   * @param isOn 
   */
  const handleAudio = (event: any, isOn: boolean) => {
    /* Preventing the click event to propagate to video element */
    event.stopPropagation();    
    let otherVideoElementRefs: Array<RefObject<HTMLVideoElement>> = videoElementRefs.current.filter((_, index: number) => index !== event.realIndex);
    if(isOn) {
      setIsAudioOn(true);
      currentVideoElementRef!.current!.muted = false;
    } else {
      setIsAudioOn(false);
      currentVideoElementRef!.current!.muted = true;
    }

    otherVideoElementRefs.forEach((ref: RefObject<HTMLVideoElement>) => {
      ref.current!.muted = !isOn;
    })
  }

  /**
   * Fire when any of Menu Item is clicked
   * @param event 
   */
  const handleMenuItemClicked = (event: any) => {
   if(onMenuItemClicked) onMenuItemClicked(event);
  }


  /**
   * Fire when like icon is clicked 
   * @param reel 
   */
  const handleLikeClick = (reel: ReelsType) => {
    let reelDataDeepCopy = [...reelData];

    reelDataDeepCopy.forEach((_reel: any) => {
        if(_reel.id === reel.id) {
          if(!_reel.likes.isTap) {
            _reel.likes.count += 1
            _reel.likes.isTap = true;
            if(_reel.dislikes.isTap) {
              _reel.dislikes.isTap = false
              _reel.dislikes.count -= 1
            }
          } else {
            _reel.likes.count -= 1
            _reel.likes.isTap = false;
          }
        }
    })

    setReelData(reelDataDeepCopy)

   if(onLikeClicked) onLikeClicked(reel)
    
  }


  /**
   * Fire When dislike icon is clicked
   * @param reel 
   */
  const handleDislikeClick = (reel: ReelsType) => {
    let reelDataDeepCopy = [...reelData];

    reelDataDeepCopy.forEach((_reel: any) => {
        if(_reel.id === reel.id) {
          if(!_reel.dislikes.isTap) {
            _reel.dislikes.count += 1
            _reel.dislikes.isTap = true;
            if(_reel.likes.isTap) {
              _reel.likes.isTap = false
              _reel.likes.count -= 1
            }
          } else {
            _reel.dislikes.count -= 1
            _reel.dislikes.isTap = false;
          }
        }
    })

    setReelData(reelDataDeepCopy)

    if(onDislikeClicked) onDislikeClicked(reel)
    
  }


  /**
   * Fire when comment icon is cliked
   * @param reel 
   */
  const handleCommentClick = (reel: ReelsType) => {
    if(onCommentClicked) onCommentClicked(reel)
  }


  /**
   * Fire when share icon is clicked
   * @param reel 
   */
  const handleShareClick = (reel: ReelsType) => {
    if(onShareClicked) onShareClicked(reel)
  }


  /**
   * Fire when the Avatar is clicked
   * @param reel 
   */
  const handleAvatarClicked = (reel: ReelsType) => {
    if(onAvatarClicked) onAvatarClicked(reel)
  }

  return (
    <Fragment>
       <Swiper
          style={{ height: '100vh', backgroundColor: reelMetaInfo?.backGroundColor || '#000000' }}
          direction={'vertical'}
          mousewheel={true}
         // spaceBetween={10}
          modules={[Mousewheel]}
          slidesPerView={sizeMode === sizeObj.extraSmallScreen ? 1 : 1.1}
          onSlideChange={(event) => handleSlideChange(event)}
        >
          {
            reels.map((reel: ReelsType, index: number) => {
              return (
                <SwiperSlide key={reel.id}>

                {/* Background of the Reels */}
                <div 
                  style={{ backgroundColor: reelMetaInfo?.backGroundColor || '#000000' }}
                  className={styles.background}
                >

                  {/* Wrapper of the video element */}
                  <div 
                    style={{
                      height: sizeMode === sizeObj.extraSmallScreen ? '100%' : `${reelMetaInfo?.videoDimensions?.height}px` || '580px',
                      width: sizeMode === sizeObj.extraSmallScreen ? '100%' : `${reelMetaInfo?.videoDimensions?.width}px` || '330px',
                      borderRadius: sizeMode === sizeObj.extraSmallScreen ? '0px' : (`${reelMetaInfo?.borderRadius}px` || '10px')
                    }}
                    className={styles.videoWrapper}
                  >
                    {
                      /* Play/Pause buttons (Only for Desktop Screens) */ 
                      sizeMode !== sizeObj.extraSmallScreen && (               
                        
                            isPlayingVideo ? (
                              <GiPauseButton
                                size={25}
                                className={styles.pauseIcon}
                                onClick={() => handlePlayPauseVideo(false)}
                              />
                            ) : (
                              <BsPlayFill
                                size={27}
                                className={styles.playIcon}
                                onClick={() => handlePlayPauseVideo(true)}
                              />
                            )
                        
                      )
                      /* Play/Pause buttons (Only for Desktop Screens) */
                    }

                    {
                      /* Audio On/Off buttons (Only for Desktop Screens) */
                        isAudioOn ? (
                                <GiSpeaker
                                  size={27}
                                  className={styles.speakerOnIcon}
                                  onClick={(e) => handleAudio(e, false)}
                                />
                              ) : (
                                <GiSpeakerOff
                                  size={27}
                                  className={styles.speakerOffIcon}
                                  onClick={(e) => handleAudio(e, true)}
                                />
                              )
                        /* Audio On/Off buttons (Only for Desktop Screens) */
                    }

                    

                    {
                      /* Middle play/pause Icon */
                        isPlayingVideo ? (
                          <BsPlayFill 
                            size={55}
                            className={styles.bigPlayIcon}
                          />
                        ) : (
                            <GiPauseButton
                              size={50}
                              className={styles.bigPauseIcon}
                            />
                        )
                      /* Middle play/pause Icon */
                    } 

                    {/* Video Element */}
                    <video 
                        style={{ borderRadius: sizeMode === sizeObj.extraSmallScreen ? '0px' : (`${reelMetaInfo?.borderRadius}px` || '10px') }}
                        className={styles.video}
                        ref={videoElementRefs.current[index]}
                        controls={false} // Default control options off
                        muted // audio off by default
                        autoPlay // auto play video is on by default
                        playsInline // needed for Safari browser
                        loop // starting the video again when ended
                        onClick={handleClickOnVideo} 
                      >
                        <source src={reel.reelInfo.url} type={reel.reelInfo.type} /> 
                    </video>
                    {/* Video Element */}
                    
                    {/* Right Side Options */}
                    <div className={sizeMode === sizeObj.extraSmallScreen ? styles.sideBarIconsForSmallScreen : styles.sideBarIcons}>
                      
                      {/* Three Dot Menu Icon */}
                      {
                        reel.rightMenu ? (
                          <div>
                            <Menu
                              menuButton={
                                <span>
                                {
                                  sizeMode === sizeObj.extraSmallScreen ? (
                                    <BsThreeDots size={25} />
                                  ) : (
                                    <BsThreeDotsVertical size={25} />
                                  )
                                } 
                                </span>
                              }
                              onItemClick={(e) => handleMenuItemClicked(e)}
                            >
                              {
                                reel.rightMenu.options.map((option: OptionType) => {
                                  return (<MenuItem key={option.id} value={option.value}>{ option.label }</MenuItem>)
                                })
                              }
                            </Menu> 
                          </div>
                        ) : (<div></div>)
                      }
                      {/* Three Dot Menu Icon */}

                      {/* Like Icon */}
                      {
                        reel.reelInfo.likes && (
                          <div onClick={() => handleLikeClick(reel)}>
                            <FaThumbsUp size={25} color={reelData[index].likes.isTap ? (reelMetaInfo?.likeActiveColor || '#3da6ff') : '#ffffff' } />
                            <span className={styles.likeText}>{ useNumberFilter(reelData[index].likes.count) !== '0' ? useNumberFilter(reelData[index].likes.count) : 'Like' }</span>
                          </div>
                        )
                      }
                      {/* Like Icon */}

                      {/* Dislike Icon */}
                      {
                        reel.reelInfo.dislikes && (
                          <div onClick={() => handleDislikeClick(reel)}>
                            <FaThumbsDown size={25} color={reelData[index].dislikes.isTap ? (reelMetaInfo?.dislikeActiveColor || '#3da6ff' ) : 'white' } />
                            <span className={styles.dislikeText}>{ useNumberFilter(reelData[index].dislikes.count) !== '0' ? useNumberFilter(reelData[index].dislikes.count) : 'Dislike' }</span>
                          </div>
                        )
                      }
                      {/* Dislike Icon */}

                      {/* Comment Icon */}
                      {
                        reel.reelInfo.comments && (
                          <div onClick={() => handleCommentClick(reel)}>
                            <BiCommentDetail size={25} />
                            <span className={styles.commentText}>{ useNumberFilter(reel.reelInfo.comments.count) !== '0' ? useNumberFilter(reel.reelInfo.comments.count) : 'Comment' }</span>
                          </div>
                        )
                      }
                      {/* Comment Icon */}

                      {/* Share Icon */}
                      {
                        reel.reelInfo.shares && (
                          <div onClick={() => handleShareClick(reel)}>
                            <IoIosShareAlt size={25} />
                            <span className={styles.shareText}>{ useNumberFilter(reel.reelInfo.shares.count) !== '0' ? useNumberFilter(reel.reelInfo.shares.count) : 'Share' }</span>
                          </div>
                        )
                      }
                      {/* Share Icon */}

                    </div>
                    {/* Right Side Options */}

                    {/* Bottom Side */}
                    {
                      reel.bottomSection ? (
                        <div style={{ position: 'absolute', bottom: '0px' }}>
                          { reel.bottomSection.component }
                        </div>
                      ) : (
                    
                        <div className={styles.bottomBar}>
                          { reel.reelInfo.description && (
                             <div>
                               <label>{ reel.reelInfo.description }</label>
                             </div>
                          )}
                          
                          {
                            reel.reelInfo.postedBy && (
                              <div onClick={() => handleAvatarClicked(reel)}>
                                <img 
                                  src={reel.reelInfo.postedBy.avatar} 
                                  alt={"profile-image"} 
                                />
                                <label>{ reel.reelInfo.postedBy.name }</label>
                              </div>
                            )
                          }
                        </div>

                      )
                    }
                    {/* Bottom Side */}
                    
                  </div>
                  {/* Wrapper of the video element */}

                </div>
                {/* Background of the Reels */}

                </SwiperSlide>
              )
            })
          }
    
       </Swiper>
    </Fragment>
  )
}

export default ReelsComponent



/* React Library Import */
import React, { createRef, Fragment, RefObject, useEffect, useRef, useState } from 'react'

/* React Swiper Import */
import { Mousewheel } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.min.css';

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
import styles from './index.css'

/* Custom Hook Import */
import useSizeMode, { sizeObj } from '../../hooks/size';

const videos = [
  {
    id: 0,
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  },
  {
    id: 1,
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  },
  {
    id: 2,
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  },
  {
    id: 3,
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  },
  {
    id: 4,
    url: 'http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4'
  }
]

/* Reels Functional Component Definition (returns the required jsx) */
const ReelsComponent: React.FC = (): JSX.Element =>  {

  /* Assigning the size mode according to screen (Custom Hook) */
  const sizeMode = useSizeMode();

  /* Collecting all the Video Element References from the DOM */
  const videoElementRefs = useRef<Array<RefObject<HTMLVideoElement>>>(videos.map(() => createRef<HTMLVideoElement>()));

  /* State Variables */
  const [currentVideoElementRef, setCurrentVideoElementRef] = useState<RefObject<HTMLVideoElement>>(videoElementRefs.current[0]); /* Ref. of Current Playing Video Element */
  const [isPlayingVideo, setIsPlayingVideo] = useState<boolean>(true); /* Video is playing or not */
  const [isAudioOn, setIsAudioOn] = useState<boolean>(false); /* Audio is on or not */


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
      setIsAudioOn(isAudioOn);
    }

    /* Play the current Video and set the requierd boolean for audio */
    currentVideoElementRef?.current?.play();
    currentVideoElementRef!.current!.muted = isAudioOn;

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
    if(isOn) {
      setIsAudioOn(true);
      currentVideoElementRef!.current!.muted = false;
    } else {
      setIsAudioOn(false);
      currentVideoElementRef!.current!.muted = true;
    }
  }

  /**
   * Fire when any of Menu Item is clicked
   * @param event 
   */
  const handleMenuItemClicked = (event: any) => {
    console.log(event);
  }

  return (
    <Fragment>
       <Swiper
          style={{ height: `${window.innerHeight}px`, backgroundColor: '#000000' }}
          direction={'vertical'}
          mousewheel={true}
          modules={[Mousewheel]}
          slidesPerView={sizeMode === sizeObj.extraSmallScreen ? 1 : 1.1}
          onSlideChange={(event) => handleSlideChange(event)}
        >
          {
            videos.map((video, index: number) => {
              return (
                <SwiperSlide key={video.id}>

                {/* Background of the Reels */}
                <div 
                  style={{ backgroundColor: '#000000' }}
                  className={styles.background}
                >

                  {/* Wrapper of the video element */}
                  <div 
                    style={{
                      height: sizeMode === sizeObj.extraSmallScreen ? '100%' : '580px',
                      width: sizeMode === sizeObj.extraSmallScreen ? '100%' : '330px',
                      borderRadius: '10px'
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
                        style={{ borderRadius: '10px' }}
                        className={styles.video}
                        ref={videoElementRefs.current[index]}
                        controls={false} // Default control options off
                        muted // audio off by default
                        autoPlay // auto play video is on by default
                        playsInline // needed for Safari browser
                        loop // starting the video again when ended
                        onClick={handleClickOnVideo} 
                      >
                        <source src={video.url} type="video/mp4" /> 
                    </video>
                    {/* Video Element */}
                    
                    {/* Right Side Options */}
                    <div className={sizeMode === sizeObj.extraSmallScreen ? styles.sideBarIconsForSmallScreen : styles.sideBarIcons}>
                      
                      {/* Three Dot Menu Icon */}
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
                            <MenuItem value="Cut">Cut</MenuItem>
                            <MenuItem value="Copy">Copy</MenuItem>
                            <MenuItem value="Paste">Paste</MenuItem>
                          </Menu> 
                      </div>
                      {/* Three Dot Menu Icon */}

                      {/* Like Icon */}
                      <div>
                        <FaThumbsUp size={25} />
                        <span className={styles.likeText}>Like</span>
                      </div>
                      {/* Like Icon */}

                      {/* Dislike Icon */}
                      <div>
                        <FaThumbsDown size={25} />
                        <span className={styles.dislikeText}>Dislike</span>
                      </div>
                      {/* Dislike Icon */}

                      {/* Comment Icon */}
                      <div>
                        <BiCommentDetail size={25} />
                        <span className={styles.commentText}>Comment</span>
                      </div>
                      {/* Comment Icon */}

                      {/* Share Icon */}
                      <div>
                        <IoIosShareAlt size={25} />
                        <span className={styles.shareText}>Share</span>
                      </div>
                      {/* Share Icon */}

                    </div>
                    {/* Right Side Options */}

                    {/* Bottom Side */}
                    <div className={styles.bottomBar}>
                      <div>
                        <label>Lorem ipsum dolor sit amet?</label>
                      </div>

                      <div>
                        <img 
                          src={"https://images.pexels.com/photos/11293709/pexels-photo-11293709.jpeg?auto=compress&cs=tinysrgb&w=800"} 
                          alt={"profile-image"} 
                        />
                        <label>CS with Trijit</label>
                      </div>
                    </div>
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



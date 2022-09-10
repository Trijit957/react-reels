import React, { Fragment } from 'react'
import { Mousewheel } from 'swiper';
import { Swiper, SwiperSlide, useSwiper  } from 'swiper/react';
import 'swiper/swiper.min.css';

import './ReelsComponent.css'

//SwiperCore.use([Keyboard, Mousewheel]);

function ReelsComponent() {

 // const swiper = useSwiper();

  return (
    <Fragment>
       <Swiper
          style={{border: '1px solid red', height: '800px'}}
          direction={'vertical'}
          mousewheel={true}
          modules={[Mousewheel]}
          spaceBetween={50}
          slidesPerView={1}
          onSlideChange={() => console.log('slide change')}
          //scrollbar={{ draggable: true }}
          // onSwiper={(swiper) => {
          //   swiper.mousewheel.enabled = true
          // }}
        >
        <SwiperSlide>Slide 1</SwiperSlide>
        <SwiperSlide>Slide 2</SwiperSlide>
        <SwiperSlide>Slide 3</SwiperSlide>
        <SwiperSlide>Slide 4</SwiperSlide>
        <SlideNextButton />

      </Swiper>
    </Fragment>
  )
}

export default ReelsComponent


export function SlideNextButton() {
  const swiper = useSwiper();

  return (
    <button onClick={() => swiper.slideNext()}>Slide to the next slide</button>
  );
}
import { useState, useEffect, useLayoutEffect } from 'react'
import { screenWidthObjType, sizeObjType } from './size.type'

export const sizeObj: sizeObjType = {
    largeScreen: 4,
    mediumScreen: 3,
    smallScreen: 2,
    extraSmallScreen: 1
}

const screenWidthObj: screenWidthObjType = {
    w1: 1200,
    w2: 992,
    w3: 768
}

function useSizeMode(): number {

  const [sizeMode, setSizeMode] = useState<number>(0)

  useLayoutEffect((): void => {

    const currentSizeMode = getSizeMode(window.innerWidth)
    setSizeMode(currentSizeMode!)

  }, [])

  useEffect((): () => void => {
   
      window.addEventListener('resize', handleResize)

      return (): void => {
          window.removeEventListener('resize', handleResize)
      }
  }, [])

  function handleResize(): void {
    const currentSizeMode = getSizeMode(window.innerWidth)
    setSizeMode(currentSizeMode!)
  }

  return sizeMode

}

function getSizeMode(screenWidth: number): number {
    if(screenWidth >= screenWidthObj.w1) {
      return sizeObj.largeScreen  
    } 

    if(screenWidth < screenWidthObj.w1 && screenWidth >= screenWidthObj.w2) {
        return sizeObj.mediumScreen
    }

    if(screenWidth < screenWidthObj.w2 && screenWidth >= screenWidthObj.w3) {
        return sizeObj.smallScreen
    }

    if(screenWidth < screenWidthObj.w3) {
        return sizeObj.extraSmallScreen
    }

    return 0;
}

export default useSizeMode
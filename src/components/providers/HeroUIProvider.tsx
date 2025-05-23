"use client";

import { HeroUIProvider } from '@heroui/react'
// import React from 'react'


type HeroProp = {
    children: React.ReactNode
}

const HeroProvider = ({children}: HeroProp) => {
  return (
   <HeroUIProvider aria-label='hero_ui_provider'>
    {children}
   </HeroUIProvider>
  )
}

export default HeroProvider
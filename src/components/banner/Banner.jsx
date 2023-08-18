import { Box, Typography, styled } from '@mui/material'
import React from 'react'

const Image = styled(Box)`
 background : url(https://images.pexels.com/photos/1714208/pexels-photo-1714208.jpeg
 ) center/55%  #000;
 width:100%;
 height:60vh;
 display:flex;
 align-items:center;
 justify-content: center;
 flex-direction:column;
`

const Heading = styled(Typography)`
 color: black;
 font-size : 70px;
 line-height:1;
 background:rgba(255,255,255, 0.6);
 border-radius: 15px;
 padding: 5px;
`

const SubHeading = styled(Typography)`
 font-size:20px;
 font-weight:300;
 padding:5px;
 color:white;
`

const Banner = () => {
  return (
    <Image>
      <Heading>BLOG</Heading>
      <SubHeading>ARYA</SubHeading>
    </Image>
  )
}

export default Banner

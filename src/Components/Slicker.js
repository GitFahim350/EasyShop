import React from 'react'
import styled from 'styled-components'


const Img = styled.img`
    width: 100%;
    z-index: -1;
    mask-image: linear-gradient(to bottom, rgba(0, 0, 0, 1), rgba(0, 0, 0, 0));
 `
const Slicker = () => {
    return (

        <div className='container' style={{ height: "500px",maxWidth:"1500px"}} >
            <Img src="https://m.media-amazon.com/images/I/61-8rBAD68L._SX3000_.jpg" style={{ width: "100%" }} alt="" />
        </div>


    )
}

export default Slicker
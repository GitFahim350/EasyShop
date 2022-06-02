import React from 'react'
import styled from 'styled-components'
import { useStateValue } from '../Stateprovider';

const Item = styled.div`
    width:100% ;
    display:flex ;
    flex-direction:column ;
    align-items:center ;
    padding:20px ;
    background-color:white ;
    margin:20px ;
    box-shadow: 10px 10px 5px #aaaaaa;
   
`


const Product = (props) => {
    const [{  }, dispatch] = useStateValue();

     const addToBasket = (props) => {
      
       dispatch({
         type: "ADD_TO_BASKET",
         item: {
           id: props.id,
           title: props.title,
           image: props.image,
           price: props.price,
           rating: props.rating,
         },
       });
     };
    return (
        <Item>
           <div>
               <p>{props.title}</p>

               <strong>${props.price}</strong>
           </div>

           <div style={{display:"flex",alignItems:"center",flexDirection:"column",justifyContent:'space-between'}}>
                <img src={props.image} alt="" style={{maxWidth:"200px"}} /><br/>
                <button style={{backgroundColor:"gold",width:"120px"}} onClick={()=>addToBasket(props)} >Add to cart</button>
           </div>
               

        </Item>
    )
}

export default Product
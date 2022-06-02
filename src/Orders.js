import axios from 'axios'
import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useStateValue } from './Stateprovider'
const Item = styled.div`
    
    display:flex ;
    margin-left:20px;
    background-color:white ;
    padding:20px ;
    width:70vw ;
    border-bottom:1px solid gray ;
`
const Orders = () => {
    const [products, setProducts] = useState([])
    const [{ user }, dispatch] = useStateValue()
    const [orderNum, setOrdernum] = useState(1)
    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res2 = await axios.get("http://localhost:7000/api/find/" + user.uid)
                console.log("Res2 data is", res2.data)
                setProducts(res2.data)
            }
            catch {
                console.log("Error occured")
            }

        };
        makeRequest();
    }, [])
    return (
        user&&<div  style={{ backgroundColor:"#e7f6fa", display: "flex", flexDirection: "column", alignItems: "center", marginTop: "20px" }}>
            <h3>Your Orders</h3>
            {
                

                products?.map((prod) => (

                    

                    <div>
                    <h3>Order Number {prod._id}</h3>
                    <br />
                    <br />
                    {prod.products?.map((i) => (
                        
                            <Item>
                                <img src={i?.image} alt="Object" style={{ width: "200px" }} />
                                <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-around", marginLeft: "20px" }}>
                                    <div>
                                        <p>{i?.title}</p>
                                        <div style={{ display: "flex" }}>
                                            {Array(i?.rating)
                                                .fill()
                                                .map((_, i) => (
                                                    <p>🌟</p>
                                                ))}
                                        </div>

                                        <strong>${i?.price}</strong>
                                    </div>


                                </div>
                            </Item>
                       


                    ))
                    }
                    </div>






                ))
            }
        </div>
    )
}

export default Orders
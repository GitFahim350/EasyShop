import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { useStateValue } from './Stateprovider'
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from './Reducer';
import FlipMove from 'react-flip-move'

import StripeCheckout from "react-stripe-checkout"
import { useNavigate } from 'react-router-dom';

import axios from "axios"

const Left = styled.div`
    display:flex ;
    flex-direction:column ;
    position:relative ;
    
`

const Right = styled.div`
      display: flex;
        flex-direction: column;
        justify-content: space-between;
        width: 300px;
        height: 150px;
        padding: 20px;
        background-color: #f3f3f3;
        border: 1px solid #dddddd;
        border-radius: 3px;
`

const Item = styled.div`
    margin-top:20px ;
    display:flex ;
    margin-left:20px;
    border-bottom:2px solid gray ;
    padding-bottom:10px ;
    margin-bottom:10px ;
`
const Subtotalgift = styled.div`
     display: flex;
  align-items: center;
`
const SubtotalgiftInput = styled.input`
margin-right: 5px;
`
const SubtotalgiftButton = styled.button`
    background: #f0c14b;
  border-radius: 2px;
  width: 100%;
  height: 30px;
  border: 1px solid;
  margin-top: 10px;
  border-color: #a88734 #9c7e31 #846a29;
  color: #111;
`
const Checkout = () => {
    const KEY = "pk_test_51KiEf9CQ3BVs6KTdAAV2XliuczD99I71hjgalITJvGEwNj0nIpalBdgDns27F3QBz71hUQmPnSSb4k0Lh4kwiJTd00YpVadVwX";
    const [{ basket, user }, dispatch] = useStateValue()
    const [stripeToken, setstripeToken] = useState(null)
    const history = useNavigate()

    const handledltClick = (prodid) => {
        //console.log("Clicked button is", prodid)
        dispatch({
            type: "REMOVE_FROM_BASKET",
            item: {
                id: prodid
            },
        });
    }
    const onToken = (token) => {
        setstripeToken(token);
    };


    useEffect(() => {
        const makeRequest = async () => {
            try {
                const res2 = await axios.post("http://localhost:7000/api/createorder", {
                    userId: user.uid,
                    products: basket
                })
            }
            catch (err) {
                console.log("Error occured", err)
            }
        };
        stripeToken && makeRequest();

    }, [stripeToken])


    useEffect(() => {

        const makeRequest = async () => {
            try {
                const res = await axios.post("http://localhost:7000/api/payment", {
                    tokenId: stripeToken.id,
                    amount: getBasketTotal(basket) * 100,
                })
                dispatch({
                    type: "EMPTY_BASKET",
                });
                //history.push('/')

                history('/orders')
                console.log("Res data", res.data)
            }
            catch {
                console.log("Error occured")
            }
        };
        stripeToken && makeRequest();

    }, [stripeToken, getBasketTotal(basket)])


    // 

    return (

        <div style={{}}>
            <h2 style={{marginLeft:"10px"}}>Your Checkout List</h2>

            <div className='row'>
                {/* {console.log("Inside the basket", basket)} */}


                <Left className='col-md-8' style={{width:"90%",backgroundColor:"white",padding:"20px"}}>

                    <FlipMove >
                        {basket.map((i) => (
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
                                    <button style={{ width: "170px", backgroundColor: "gold" }} onClick={() => handledltClick(i.id)}>Remove from the cart</button>


                                </div>
                            </Item>

                        ))

                        }
                    </FlipMove>
                </Left>
                <Right className='col-md-4'>
                    <CurrencyFormat
                        renderText={(value) => (
                            <>
                                <p>

                                    Subtotal ({basket.length} items): <strong>{value}</strong>
                                </p>
                                <Subtotalgift>
                                    <SubtotalgiftInput type="checkbox" /> This order contains a gift
                                </Subtotalgift>
                            </>
                        )}
                        decimalScale={2}
                        value={getBasketTotal(basket)} // Part of the homework
                        displayType={"text"}
                        thousandSeparator={true}
                        prefix={"$"}
                    />
                    {user ? <StripeCheckout
                        name="Amazon"
                        image="https://banner2.cleanpng.com/20180721/tbz/kisspng-amazon-com-brand-logo-e-commerce-customer-international-volunteering-5b534dc6015e31.6273062615321860540056.jpg"
                        billingAddress
                        shippingAddress
                        description={`Your total amount is $${getBasketTotal(basket)}`}
                        amount={getBasketTotal(basket) * 100}
                        token={onToken}
                        stripeKey={KEY}
                    >
                        <SubtotalgiftButton >Proceed to Checkout</SubtotalgiftButton>
                    </StripeCheckout> : <SubtotalgiftButton onClick={() => { history('/signin') }}>Proceed to Checkout</SubtotalgiftButton>}

                </Right>
            </div>
        </div>
    )
}

export default Checkout
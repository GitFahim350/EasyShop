import React, { useEffect, useState,useHistory } from 'react'
import styled from 'styled-components'
import Checkout from './Checkout'
import Header from './Components/Header'
import FlipMove from 'react-flip-move'
import { useStateValue } from './Stateprovider'
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js'
import { getBasketTotal } from './Reducer'
import CurrencyFormat from 'react-currency-format'
import axios from 'axios'

const Delivery = styled.div`
    display:flex ;
    width:100%;
`
const Item = styled.div`
    margin-top:20px ;
    display:flex ;
    margin-left:20px;
`
const Title = styled.div`
 
 flex:2 ;
 padding:10px ;
 
`
const Details = styled.div`
    
    flex:8 ;
    padding:10px ;
    
`
const Subtotalgift = styled.div`
     display: flex;
  align-items: center;
`
const SubtotalgiftInput = styled.input`
margin-right: 5px;
`

const Payment = () => {
    const [{ basket }, dispatch] = useStateValue()
    const history = useHistory();
    const stripe = useStripe();
    const elements = useElements();
    const [disabled,setDisabled]=useState(true)
    const [processing,setProcessing]=useState(false)
    const [succeeded,setSucceeded]=useState(false)
    const [error,setError]=useState(null)
    const [clientSecret,setClientSecret]=useState(true)
    
    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket])
    
    const handleSubmit=async(e)=>{
        //do all the fancy stripe stuff....
        e.preventdefault()
        setProcessing(true)
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            // paymentIntent = payment confirmation


            setSucceeded(true);
            setError(null)
            setProcessing(false)

            dispatch({
                type: 'EMPTY_BASKET'
            })

            history.replace('/orders')
        })

    }
    const handleChange=(e)=>{
        e.preventdefault()
        setDisabled(e.empty)
        setError(e.error?e.error.message:"")
    }
    const handledltClick = (prodid) => {
        console.log("Clicked button is", prodid)
        dispatch({
            type: "REMOVE_FROM_BASKET",
            item: {
                id: prodid
            },
        });
    }
    return (
        <div style={{ width: "100vw" }}>

            <Delivery>
                <Title>
                    <h3>Delivery address</h3>
                </Title>
                <Details>
                    <p>test.gmail.com</p>
                    <p>120 React Lane</p>
                    <p>Los angels city</p>
                </Details>

            </Delivery>
            <Delivery>
                <Title>
                    <h3>Review Items and delivery</h3>
                </Title>

                <Details>
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
                </Details>

            </Delivery>
            <Delivery>
                <Title>
                    Payment
                </Title>
                <Details>
                    <form onSubmit={{handleSubmit}}>
                        <CardElement onChange={{handleChange}}/>
                        <CurrencyFormat
                            renderText={(value) => (
                                <>
                                    <p>
                                        {/* Part of the homework */}
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
                        <button disabled={processing||disabled||succeeded}>{processing?<span>processing</span>:<span>Buy now</span>}</button>
                        {error&&<div>{error} </div>}
                    </form>

                </Details>
            </Delivery>

        </div>
    )
}

export default Payment
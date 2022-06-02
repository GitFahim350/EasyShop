import React from 'react'
import styled from 'styled-components'
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useStateValue } from '../Stateprovider';
import { Link } from 'react-router-dom';
const Appbar = styled.div`

    position:sticky ;
    display:flex ;
    background-color:black ;
    height:70px;
    align-items:center ;
    width:100vw ;
    z-index:100 ;
    overflow:hidden ;
    padding:10px ;
    
`

const Img = styled.img`
    width: 100px;
    object-fit:contain ;

`
const Middle = styled.div`
    flex: 3;
    display:flex ;
    align-items:center ;
    margin-left:20px ;
`
const Input = styled.input`
    width:100% ;
    height:40px;
    outline:none ;
`
const Navbar = styled.div`
    display:flex ;
    flex: 3;
    display:flex ;
    align-items:center ;
    justify-content:space-around ;
    color:white ;
`
function Header() {
    const [{ basket, user }, dispatch] = useStateValue()

    return (
        <Appbar>
            <Link to="/">
                <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <Img src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="" />
                </div>
            </Link>


            <Middle>
                <Input></Input>
                <div style={{ height: '40px', padding: "5px", display: "flex", justifyContent: "center", alignItems: "center", backgroundColor: "gold" }}>
                    <SearchIcon style={{ color: "white" }} />
                </div>

            </Middle>


            <Navbar>
                <div style={{ fontSize: "13px", cursor: "pointer" }}>

                    {user ? <>
                        <span>Hello {user.email},</span>
                        {console.log("User email>>>",user)}
                        <br />
                        <span onClick={() => {
                            dispatch({
                                type: "REMOVE_USER",
                                user: null
                            })
                        }}>Sign out</span>
                    </> :
                        <span>Hello,<Link to="/signin" style={{ color: "white" }}>Sign in</Link></span>}

                    <br />
                    <span>Account&Lists</span>


                </div>
                <Link to="/orders">
                    <div style={{ fontSize: "13px" }}>
                        <span style={{ color: "white" }}>Returns</span><br />
                        <span style={{ color: "white" }}>&Orders</span>
                    </div>
                </Link>

                <Link to="/checkout">
                    <div style={{ fontSize: "13px" }}>
                        <ShoppingCartIcon style={{color:"white"}}/>
                        <span style={{ color: "white" }}>{basket.length}</span><br />
                        <span style={{ color: "white" }}>Account&Lists</span>
                    </div>
                </Link>

            </Navbar>

        </Appbar>
    )
}

export default Header
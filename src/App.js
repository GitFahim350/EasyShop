import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Header from './Components/Header';
import Slicker from './Components/Slicker';
import Products from './Components/Products';
import Checkout from "./Checkout";
import Payment from "./Payment";
import { loadStripe } from "@stripe/stripe-js"
import { Elements } from "@stripe/react-stripe-js"
import SignIn from "./SignINSIGNUP/Signin";
import SignUp from "./SignINSIGNUP/Signup";
import Orders from "./Orders";
import { useEffect } from "react";
import { useStateValue } from "./Stateprovider";



const promise = loadStripe("pk_test_51KiEf9CQ3BVs6KTdAAV2XliuczD99I71hjgalITJvGEwNj0nIpalBdgDns27F3QBz71hUQmPnSSb4k0Lh4kwiJTd00YpVadVwX")
function App() {
  const [{ basket, user }, dispatch] = useStateValue()
  useEffect(() => {
    localStorage.setItem("user",JSON.stringify(user));
    console.log("Hello user is called");
  }, [user]);

  
  useEffect(() => {
    localStorage.setItem("basket", JSON.stringify(basket));
    console.log("Hello basket is called");
  }, [basket]);


  return (

    <div  style={{ overflow: "hidden",backgroundColor:"#e7f6fa" }}>
      <Routes>
        <Route path="/" element={
          <div>
            <Header />
            <Slicker />
            <Products />
          </div>
        } />
        <Route path="/checkout" element={<div><Header/><Checkout /></div>} />
        <Route path="/signin" element={<SignIn/>} />
        <Route path="/signup" element={<SignUp/>} />
        <Route path="/orders" element={<div><Header/><Orders/></div>} />
        <Route path="/payment" element={
        <Elements stripe={promise}>
          <Header />
          <Payment />
        </Elements>
        } />
      </Routes>
    </div>

  );
}

export default App;

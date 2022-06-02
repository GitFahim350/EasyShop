export const initialState={
     //user:localStorage.getItem("user")||null,
     //user:null,
     user:JSON.parse(localStorage.getItem("user"))||null,
     basket:JSON.parse(localStorage.getItem("basket"))||[]
     //user:JSON.parse(localStorage.getItem("user")) || null
     
     //basket:[]
   
}
export const getBasketTotal = (basket) => 
  basket?.reduce((amount, item) => item.price + amount, 0);


const reducer=(state,action)=>{
    
    switch(action.type){
        case "ADD_TO_BASKET":
            return {
                ...state,
                basket:[...state.basket,action.item]
            };
        case "EMPTY_BASKET":
            return{
                ...state,
                basket:[]
            };
        case "REMOVE_FROM_BASKET":
                const index = state.basket.findIndex(
                  (basketItem) => basketItem.id === action.item.id
                );
                console.log("Found index is",index)
                let newBasket = [...state.basket];
          
                if (index >= 0) {
                  newBasket.splice(index, 1);
          
                } else {
                  console.warn(
                    `Cant remove product (id: ${action.id}) as its not in basket!`
                  )
                };
                return {
                    ...state,
                    basket:newBasket
                }
        case "SET_USER":
            return{
                ...state,
                user:{email:action.user.email,uid:action.user.uid}
            }
        case "REMOVE_USER":
            return{
                ...state,
                user:null
              }

        default:
            return state    
    }
}
export default reducer



















// export const initialState = {
//     basket: [],
//     user: null
// }

// const reducer = (state, action) => {
    
//     switch (action.type) {
//         case "ADD_TO_BASKET":
//             return {
//                 ...state,
//                 basket: [...state.basket, action.item]
//             };
//         case "EMPTY_BASKET":
//             return {
//                 ...state,
//                 basket: []
//             }
//         case "REMOVE_FROM_BASKET":
//             const index = state.basket.findIndex(
//                 (basketItem) => basketItem.id === action.id
//             );
//             let newbasket = [...state.basket];
//             if (index >= 0) {
//                 newbasket.splice(index, 1);

//             } else {
//                 console.warn(
//                     `Cant remove product (id: ${action.id}) as its not in basket!`
//                 )
//             }

//             return {
//                 ...state,
//                 basket: newbasket
//             }
//         case "SET_USER":
//             return {
//                 ...state,
//                 user: action.user
//             }

//         default:
//             return state;
//     }
// }
// export default reducer;

import { cartActions } from './cart-slice';
import { uiActions } from './ui-slice';
export const fetchCartData = () =>{
    return async (dispatch)  =>{
        const fetchData = async () => {
            const respnse = await fetch(
                'https://react-http-fe464-default-rtdb.firebaseio.com/cart.json'
                );

            if(!respnse.ok){
                throw new Error('Could not fetch cart data!!');
                
            }
            const data = await Response.json();
            return data;
        };

        try{
            const cartData = await fetchData();
            dispatch(
                cartActions.replaceCart({
                    items: cartData.items || [],
                    totalQuantity : cartData.totalQuantity,
                })
            );
        }catch(error){
            dispatch(
                uiActions.showNotification({
                status : 'error',
                title : 'Error!...',
                message : 'Fetching cart data failed!',
              })
            );
        }
    }
}

export const sendCartData = (cart) => {
    return  async (dispatch) => {
        dispatch(
            uiActions.showNotification({
                status : 'pending',
                title : 'Sendig!...',
                message : 'Sendig cart data!',
            })
        );

        const sendRequest = async () => {
            const respnse = await fetch(
                "https://react-http-fe464-default-rtdb.firebaseio.com/cart.json",
                {
                    method: 'PUT',
                    body: JSON.stringify({
                        itmes : cart.items, 
                        totalQuantity : cart.totalQuantity,
                    }),
                }
            );
        
            if(!respnse.ok){
                throw new Error('Sendign cart data failed');
            }
        };
       
        try{
            await sendRequest();

            dispatch(
                uiActions.showNotification({
                    status : 'success',
                    title : 'Success!...',
                    message : 'Sent cart data successfully!',
                })
            );
        }catch(error){
            dispatch(uiActions.showNotification({
                status : 'error',
                title : 'Error!...',
                message : 'Sending cart data failed!',
              })
            );
        }
    };
};
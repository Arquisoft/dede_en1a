import { FormEvent, useContext, useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { CartContext } from "../../context/CartContext";
import postData from "../../helpers/postData";
import useForm from "../../hooks/useForm";
import {Customer, Order} from "../../shared/shareddtypes";

const initialState = {
    name: '',
    lastName: '',
    email: '',
    address: ''
}

const notify = (msj: string) => toast(msj);

const Form = () => {

    const {cartItems, dispatch } = useContext(CartContext);
    const {name, email, lastName, address, resetValues } = useForm<Customer>(initialState);
    const [showToast, setShowToast ] = useState(false);

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setShowToast(true);

        const orderDetails = cartItems.map(({_id, image, ...item}) => item);

        if(orderDetails.length > 0){

            const order: Order = {
                customer: {
                    name, email, lastName, address
                },
                items: orderDetails
            }

            const fetchApi = await postData(order);

            if(!fetchApi.ok){
                notify('An error has occured, try again');
            }else{
                notify('Order placed correctly!');

                resetValues();

                dispatch({
                    payload: [],
                    type: 'CLEAR'
                });

            }
        }else {
            notify('We cannot place an empty order');
        }

        setTimeout(() => setShowToast(false),5000);
    }


    return (
        <div className='col-md-7 col-lg-8'>
            <h4 className='mb-3'>Checkout</h4>
            <form autoComplete='off' onSubmit={ handleSubmit }>
                <div className="row g-3">
                    <div className="col-sm-6">
                        <label htmlFor="name" className='form-label'>Name: {localStorage.getItem("name")}</label>
                    </div>
                    <div className="col-12">
                        <label htmlFor="address" className='form-label'>Address: {localStorage.getItem("address")}</label>
                    </div>
                </div>
                <br />
                <button className='w-100 btn btn-primary' type='submit'>Place order</button>
                {
                    showToast && <Toaster
                        toastOptions={{
                            position: 'top-right',
                            duration: 2000,
                        }}/>
                }
            </form>
        </div>
    )
}

export default Form;
import React, { FormEvent, useContext, useState, useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";
import { CartContext } from "../../context/CartContext";
import postData from "../../helpers/postData";
import {ContactData, OrderAdd} from "../../shared/shareddtypes";
import axios from "axios";
import {useSession} from "@inrupt/solid-ui-react";
import {SolidNameComponent} from "../solid/SolidNameComponent";


const notify = (msj: string) => toast(msj);

function encrypt(webId: string): string {
    return encodeURIComponent(webId)
}

type Props = {
    setNewAddress: (address: string[]) => void,
	shipping : {
		price: number,
		distance : number
	}
}

const Form = (props: Props) => {

    const {setNewAddress, shipping} = props
    const {cartItems, dispatch } = useContext(CartContext);
    const [showToast, setShowToast ] = useState(false);
    const [contactData, setContactData] = useState<ContactData[]>([]);

    const {session} = useSession()

    useEffect(() => {
        if(session.info.webId) {
            axios.get((process.env.RESTAPI_URI || "http://localhost:5000") + "/solid/fetch/" + encrypt(session.info.webId)).then(
                response => {
                        localStorage.setItem("fn", response.data.fn)
                        setContactData(response.data.addresses)
                }
            )
        }
    }, [session.info.webId])

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        let selected = e.target.value
        if(selected.length === 0) {
            setNewAddress([])
            localStorage.removeItem("address")
        } else {
            setNewAddress(selected.split("/"))
            localStorage.setItem("address", selected.split("/").join(""))
        }
    }


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setShowToast(true);

        const orderDetails = cartItems.map(({_id, image, ...item}) => item);

        if(orderDetails.length > 0){

            const order: OrderAdd = {
                address: localStorage.getItem("address") + "",
                name: localStorage.getItem("fn") + "",
                webId: session.info.webId + "",
                products: cartItems,
                shippingPrice: parseFloat(shipping.price.toFixed(2)),
                totalPrice: parseFloat(localStorage.getItem("totalPrice") + "") + parseFloat(shipping.price.toFixed(2)),
            }
			console.log("order: " + order.shippingPrice)
            const fetchApi = await postData(order);

            if(!fetchApi.ok){
                notify('An error has occurred, try again');
            }else{
                notify('Order placed correctly!');

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
                        <label htmlFor="name" id="name" className='form-label'>
                            Name: <SolidNameComponent/>
                        </label>
                    </div>
                    <div>
                        <select name="addressDropdown" id="addressDropdown" onChange={(e) => handleChange(e)}>
                            <option value="">-- Select an address --</option>
                            {contactData?.map((contact, index) => (
                                <option key={index} value={contact.country + "/" + contact.region + "/" + contact.locality + "/" + contact.street_address}>
                                    {contact.country} / {contact.region} / {contact.locality} / {contact.street_address} / {contact.postal_code}
                                </option>))}
                        </select>
                    </div>
                </div>
                <br />
                <button className='w-100 btn btn-primary' type='submit' onSubmit={handleSubmit}>Place order</button>
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
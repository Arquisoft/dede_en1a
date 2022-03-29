import { FormEvent, useContext, useState, useEffect, ChangeEvent } from "react";
import toast, { Toaster } from "react-hot-toast";
import { CartContext } from "../../context/CartContext";
import postData from "../../helpers/postData";
import useForm from "../../hooks/useForm";
import {ContactData, Customer, Order} from "../../shared/shareddtypes";
import axios from "axios";

const initialState = {
    name: '',
    lastName: '',
    email: '',
    address: ''
}

const notify = (msj: string) => toast(msj);

type Props = {
    setNewAddress: (address: string) => void
}

const Form = (props: Props) => {

    const {setNewAddress} = props
    const {cartItems, dispatch } = useContext(CartContext);
    const {name, email, lastName, address, resetValues } = useForm<Customer>(initialState);
    const [showToast, setShowToast ] = useState(false);
    const [contactData, setContactData] = useState<ContactData[]>();
    const [validValue, setValidValue] = useState(false);


    useEffect(() => {
        axios.get("http://localhost:5000/solid/fetch/" + localStorage.getItem("webID")).then(
            response => {
                localStorage.setItem("fn", response.data[0].fn)
                setContactData(response.data)
            }
        )
    }, [address])

    const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
        let selected = e.target.value
        if(selected.length === 0) {
            setValidValue(false)
            setNewAddress("")
            localStorage.removeItem("address")
        } else {
            setValidValue(true)
            setNewAddress(selected)
            localStorage.setItem("address", selected.split("/").join(""))
        }
    }


    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();

        setShowToast(true);

        const orderDetails = cartItems.map(({_id, image, ...item}) => item);

        if(orderDetails.length > 0){

            const order: Order = {
                customer: {
                    name, email, lastName, address
                },
                order_details: orderDetails
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
                    <div>
                        <select name="addressDropdown" id="addressDropdown" onChange={(e) => handleChange(e)}>
                            <option value="">-- Select an address --</option>
                            {contactData?.map((contact, index) => (
                                <option key={index} value={` ${contact.country} ${contact.region} ${contact.locality}`}>
                                    {contact.country} / {contact.region} / {contact.locality} / {contact.street_address} / {contact.postal_code}
                                </option>))}
                        </select>
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
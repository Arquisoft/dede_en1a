import "./OrderItem.scss"
import {Product} from "../../shared/shareddtypes";

type OrderCardItem = {
    orderItem: Product;
    amount: Number;
};

function OrderCardItem(ord : OrderCardItem): JSX.Element{

    return(
        <>
            <div className="product-cart-container">
                <img className="product-image" src={ord.orderItem.image}/>
                <div className="product-cart-description-container">
                    <div className="row1">
                        <div className="product-name">{ord.orderItem.name}</div>
                        <div className="product-amount">x{ord.amount}</div>
                        <div className="price">{ord.orderItem.price + "€"}</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderCardItem;
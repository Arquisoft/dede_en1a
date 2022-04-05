import "./OrderItem.scss"
import {Product} from "../../shared/shareddtypes";

type OrderCardItem = {
    product: Product;
    amount: Number;
};

function OrderCardItem(ord : OrderCardItem): JSX.Element{

    return(
        <>
            <div className="product-cart-container">
                <img className="product-image" src={ord.product.image}/>
                <div className="product-cart-description-container">
                    <div className="row1">
                        <div className="product-name">{ord.product.name}</div>
                        <div className="product-amount">x{ord.amount}</div>
                        <div className="price">{ord.product.price + "€"}</div>
                    </div>
                </div>
            </div>
        </>
    );
}

export default OrderCardItem;
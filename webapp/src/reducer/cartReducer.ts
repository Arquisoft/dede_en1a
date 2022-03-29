import {CartActionReducer, CartItem} from "../shared/shareddtypes";

const cartReducer = (state: CartItem[], action: CartActionReducer) => {

    switch (action.type) {
        case 'ADD':
            const existProduct = state.find(item => item._id === action.payload._id);
            if (existProduct) {
                return state.map(item => {
                    if (item._id === action.payload._id) {
                        return {
                            ...item,
                            amount: item.amount + 1
                        }
                    }
                    return item;
                })
            } else {
                const {_id, name, image, price} = action.payload;
                return [...state, {_id, name, image, price, amount: 1}];
            }
        case 'REMOVE':
            return state.reduce((acum, item) => {
                if (item._id === action.payload) {
                    if (item.amount === 1) return acum;
                    else return [...acum, {...item, amount: item.amount - 1}]
                }
                return [...acum, item];
            }, [] as CartItem[]);
        case 'REMOVE-ALL':
            return state.filter(item => item._id !== action.payload);
        case 'CLEAR':
            return [];
        default:
            return state;
    }
}

export default cartReducer;
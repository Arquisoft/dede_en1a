import React from 'react'
import '../DetailsView.css'
import {Product} from '../../../shared/shareddtypes';

type Props = {
  item: Product;
};

const ProductInfo: React.FC<Props> = ({item}) => (
    <div>
      <h1 className="product-name">{item.name}</h1>
      <p className="product-desc">{item.description}</p>
      <h3 className="product-price">Price: ${item.price}</h3>
    </div>
  );

export default ProductInfo;
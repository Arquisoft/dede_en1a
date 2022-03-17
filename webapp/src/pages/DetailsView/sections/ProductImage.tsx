import React from 'react'
import '../DetailsView.css'
import {Product} from '../../../shared/shareddtypes';

type Props = {
  item: Product;
};


const ProductImage: React.FC<Props> = ({item}) => {

  let imgPath = "../../../../images/".concat(item.image).concat(".jpg");

  return(
    <img src={imgPath} height="150" width ="300" className="center_image"/>
  )
}

export default ProductImage;
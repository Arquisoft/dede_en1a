import React from 'react'
import '../DetailsView.css'
import {Product} from '../../../shared/shareddtypes';

type Props = {
  item: Product;
};


const ProductImage: React.FC<Props> = ({item}) => {


  return(
    <img src={item.image} height={250} width={300} alt={item.name} style={{justifyContent:"center", margin:"auto", alignItems:"center", display:"block"}}/>
  )
}

export default ProductImage;
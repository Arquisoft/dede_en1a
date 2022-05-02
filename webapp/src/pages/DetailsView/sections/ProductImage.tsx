import React from 'react'
import '../DetailsView.css'
import {Product} from '../../../shared/shareddtypes';

type Props = {
  item: Product;
};


const ProductImage: React.FC<Props> = ({item}) => {

  const apiEndPoint = process.env.REACT_APP_API_URI

  return(
    <img src={item.image} height={250} width={300} alt={item.name} style={{justifyContent:"center", margin:"auto", alignItems:"center", display:"block"}}/>
  )
}

export default ProductImage;
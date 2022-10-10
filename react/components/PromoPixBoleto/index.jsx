import axios from 'axios'

import useProduct from 'vtex.product-context/useProduct'

import { FormattedCurrency } from 'vtex.format-currency'

import './promopixboleto.css';

const PromoPixBoleto = () => {

  const productContext = useProduct ()
  // console.log('productContext', productContext)

  axios.get('/api/rnb/pvt/calculatorconfiguration/0031814d-3099-4cf0-a0bf-eda026ecf232')
  .then(function (response) {
    const percentualDesconto = (response.data.percentualDiscountValue);
    console.log(percentualDesconto);
  })
  

  const {product} = useProduct ( )
  const valorDesconto = (product?.priceRange.sellingPrice.highPrice) / 100 * 10;
  const valorFinal = (product?.priceRange.sellingPrice.highPrice) - valorDesconto


  return (
    <>
      <div className="precoPixBoleto"><FormattedCurrency value={valorFinal} /><span className="precoAvista">à vista</span></div>
    </>
  )
}
  
export default PromoPixBoleto
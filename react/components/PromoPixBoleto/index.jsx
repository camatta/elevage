import useProduct from 'vtex.product-context/useProduct'

import { FormattedCurrency } from 'vtex.format-currency'

import './promopixboleto.css';

const PromoPixBoleto = () => {

  const productContext = useProduct ()
  // console.log('productContext', productContext)


  const {product} = useProduct ( )
  const valorDesconto = (product?.priceRange.sellingPrice.highPrice) / 100 * 10;
  const valorFinal = (product?.priceRange.sellingPrice.highPrice) - valorDesconto


  return (
    <>
      <div>
      {(() => {
        if (valorFinal == 0) {
          return (
            <div></div>
          )
        } else {
          return (
            <div className={"precoPixBoleto " + valorFinal}><FormattedCurrency value={valorFinal} /><span className="precoAvista">à vista</span></div>
          )
        }
      })()}
    </div>
    </>
  )
}
  
export default PromoPixBoleto
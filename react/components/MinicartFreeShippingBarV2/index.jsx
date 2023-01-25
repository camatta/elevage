import React, { useEffect, useCallback, useState } from 'react'
import { useQuery } from 'react-apollo'

import { useOrderForm } from 'vtex.order-manager/OrderForm'
import { useRuntime } from 'vtex.render-runtime'
import { FormattedCurrency } from 'vtex.format-currency'
import { useRenderSession } from 'vtex.session-client'

import styles from './MinicartFreeshipping.css'
import AppSettings from './minicartbarSettings.graphql'

const MinimumFreightValue = ({
  settings,
}) => {
  const { binding } = useRuntime()
  const { session } = useRenderSession()
  const [shippingFreePercentage, setShippingFreePercentage] = useState(0)
  const [differenceBetwenValues, setDifferenceBetwenValues] = useState(0)
  const [freeShippingAmount, setFreeShippingAmount] = useState(0)
  const [freeShippingIndex, setFreeShippingIndex] = useState(0)
  const {
    orderForm: { totalizers },
  } = useOrderForm()

  const getChannel = async (salesChannel) => {
    settings.freeShippingTradePolicies.map(({freeShippingAmount, tradePolicy}, index) => {
      if (salesChannel === tradePolicy) {
        setFreeShippingAmount(freeShippingAmount)
        setFreeShippingIndex(index)
      }
    })
  }

  useEffect(() => {
    if (settings.bindingBounded) {
      const findAmountForBinding = settings.settings?.find(
        item => item.bindingId === binding?.id
      )?.freeShippingTradePolicies[freeShippingIndex].freeShippingAmount

      if (findAmountForBinding) setFreeShippingAmount(findAmountForBinding)
    } else {
      if (session?.namespaces) {
        getChannel(session?.namespaces?.store?.channel?.value)
      }
    }
  }, [binding, session])

  const handleUpdateMinicartValue = useCallback(
    val => {
      setShippingFreePercentage(Math.round(val / freeShippingAmount))
      setDifferenceBetwenValues(freeShippingAmount - val / 100)
    },
    [freeShippingAmount]
  )

  const getValues = (idValue) =>
    totalizers?.find(({ id }) => id === idValue)?.value ?? 0

  const finalValue = getValues('Items') + getValues('Discounts')

  useEffect(() => {
    handleUpdateMinicartValue(finalValue)
  }, [handleUpdateMinicartValue, finalValue])

  return (
    <div className={styles.freigthScaleContainer}>
      {differenceBetwenValues === freeShippingAmount ? (
        <div className={styles.text0}>
          Frete grátis a partir de:
          <FormattedCurrency value={Math.max(0, differenceBetwenValues)} />! <a href="/regras-de-promocao">Consulte</a>
        </div>
      ) : (
        <>
          {differenceBetwenValues > 0 ? (
            <p className={`${styles.sliderText} ${styles.text1}`}>
              <span className={styles.text3}>Faltam </span>

              <FormattedCurrency
                value={Math.max(0, differenceBetwenValues)}
              />

              <span className={styles.text3}> para <strong>frete grátis!</strong> <a href="/regras-de-promocao">Consulte</a></span>
            </p>
          ) : (
            <p className={`${styles.sliderText} ${styles.text2}`}>
              <svg
                width="18"
                height="18"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 512 512"
                fill="#2EA8BC"
              >
                <path d="M256 512c141.4 0 256-114.6 256-256S397.4 0 256 0S0 114.6 0 256S114.6 512 256 512zM369 209L241 337c-9.4 9.4-24.6 9.4-33.9 0l-64-64c-9.4-9.4-9.4-24.6 0-33.9s24.6-9.4 33.9 0l47 47L335 175c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9z"/>
              </svg>
              <span>Compra elegível para <strong>frete grátis!</strong> <a href="/regras-de-promocao">Consulte</a></span>
            </p>
          )}

          <div className={styles.sliderContainer}>
            <div
              className={styles.barContainer}
              style={{
                width: `${
                  shippingFreePercentage < 100 ? shippingFreePercentage : 100
                }%`,
              }}
            />
          </div>
        </>
      )}
    </div>
  )
}

const MinicartFreeShippingBarV2 = () => {
  const { data } = useQuery(AppSettings, { ssr: false })
  const { binding } = useRuntime()

  if (!data?.appSettings?.message) return null
  const settings = JSON.parse(data.appSettings.message)

  if (!settings.bindingBounded && !settings.freeShippingTradePolicies[0].freeShippingAmount) {
    console.warn('No Free Shipping amount set')

    return null
  }

  const isAmountSetForBinding = settings.settings?.find(
    item => item.bindingId === binding?.id
  )?.freeShippingTradePolicies[0].freeShippingAmount

  if (settings.bindingBounded && !isAmountSetForBinding) {
    console.warn('No Free Shipping amounts for multi binding store set')

    return null
  }

  return <MinimumFreightValue settings={settings} />
}

export default MinicartFreeShippingBarV2

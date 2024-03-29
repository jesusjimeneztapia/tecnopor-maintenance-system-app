import { useEffect } from 'react'
import { useIndicators } from '../store/indicators'
import useBeforeRenderPage from './useBeforeRenderPage'

export default function useLoadIndicators({ indicators, message, date }) {
  const { component, title } = useBeforeRenderPage({
    message,
    title: 'Indicadores',
  })
  const [setDate, setIndicators, workOrders, selectedDate] = useIndicators(
    (state) => [
      state.setDate,
      state.setIndicators,
      state.indicators.workOrders,
      state.date,
    ]
  )

  useEffect(() => {
    if (indicators != null) {
      setIndicators(indicators)
      setDate(date)
    }
  }, [indicators, date, setIndicators, setDate])

  return { component, title, workOrders, selectedDate }
}

import { useState } from 'react'

type TooltipHook = {
  tooltipVisible: boolean
  showTooltip: () => void
  hideTooltip: () => void
}

export const useTooltip = (): TooltipHook => {
  const [tooltipVisible, setTooltipVisible] = useState<boolean>(false)

  const showTooltip = () => {
    setTooltipVisible(true)
  }

  const hideTooltip = () => {
    setTooltipVisible(false)
  }

  return {
    tooltipVisible,
    showTooltip,
    hideTooltip,
  }
}

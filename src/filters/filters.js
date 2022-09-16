const ToTemperatureType = function(val) {
  if (val === 'LC') {
    return '冷藏'
  } else if (val === 'CW') {
    return '常温'
  } else {
    return '恒温'
  }
}

const TobearingType = function(val) {
  if (val === 'QX') {
    return '轻型'
  } else if (val === 'ZX') {
    return '重型'
  } else {
    return '中型'
  }
}

const ToUseType = function(val) {
  if (val === 'RKHCQ') {
    return '入库缓存区'
  } else if (val === 'CKHCQ') {
    return '出库缓存区'
  } else if (val === 'CCQ') {
    return '储存区'
  } else if (val === 'FJQ') {
    return '分拣区'
  } else {
    return '质检区'
  }
}

const ToStatus = function(val) {
  if (val === 0) {
    return '停用'
  } else {
    return '启用'
  }
}
export { ToTemperatureType, TobearingType, ToUseType, ToStatus }

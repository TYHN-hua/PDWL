// 设备状态 常量
export default {
  // 盘点单
  status: [
    {
      id: 1,
      value: '新建'
    },
    {
      id: 2,
      value: '一盘中'
    },
    {
      id: 3,
      value: '一盘完成'
    },
    {
      id: 4,
      value: '复盘中'
    },
    {
      id: 5,
      value: '复盘完成'
    },
    {
      id: 6,
      value: '已取消'
    }
  ],
  reason: [
    {
      id: 'GH',
      value: '规划'
    },
    {
      id: 'HZ',
      value: '货主'
    },
    {
      id: 'CY',
      value: '差异'
    }
  ],
  dimension: [
    {
      id: 'KW',
      value: '库位'
    },
    {
      id: 'HP',
      value: '货品'
    }
  ],
  type: [
    {
      id: 'SJPD',
      value: '随机盘点'
    },
    {
      id: 'JHPD',
      value: '计划盘点'
    }
  ],
  // 损益单
  idSource: [
    {
      id: 'PD',
      value: '盘点'
    },
    {
      id: 'SJ',
      value: '上架'
    },
    {
      id: 'JH',
      value: '拣货'
    },
    {
      id: 'SY',
      value: '损益'
    },
    {
      id: 'CK',
      value: '出库'
    }
  ],
  statusfn: [
    {
      id: 1,
      value: '新建'
    },
    {
      id: 2,
      value: '已调整'
    },
    {
      id: 3,
      value: '已取消'
    }
  ],
  // 库存
  wayFn: [
    {
      id: 'frozen',
      value: '冻结'
    },
    {
      id: 'unfreeze',
      value: '解冻'
    },
    {
      id: '-',
      value: '-'
    },
    {
      id: '+',
      value: '+'
    }
  ],
  statusFn: [
    { id: 1, value: '待分配' },
    { id: 2, value: '盘点中' },
    { id: 3, value: '盘点已完成' },
    { id: 4, value: '已生成损益' },
    { id: 5, value: '完成盘点' }
  ],
  checkNumFn: [
    { id: 1, value: '一盘' },
    { id: 2, value: '复盘' }
  ]
}

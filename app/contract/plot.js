module.exports = {
    createPlotRequest: {
        // mobile: { type: 'string', required: !true, description: '手机号', example: '18801731528', format: /^1[34578]\d{9}$/, },
        geojson: {
            type: 'string',
            required: true,
            description: 'geojson',
            example: '',
        },
        address: {
            type: 'string',
            required: !true,
            description: '地址（可修改）',
            example: '',
        },
        rightPerson: {
            type: 'string',
            required: !true,
            description:
                '所属人（这个应该是不能改的只能交易后去更改，暂无，先做静态）',
            example: '',
        },
        rightPersonName: {
            type: 'string',
            required: !true,
            description: '所有人的昵称',
            example: '',
        },
        rightPersonAvatar: {
            type: 'string',
            required: !true,
            description: '所有人的头像',
            example: '',
        },
        price: {
            type: 'string',
            required: !true,
            description: '价格（可修改）',
            example: '',
        },
        area: {
            type: 'string',
            required: !true,
            description: '面积（划地块的时候自动计算）',
            example: '',
        },
        level: {
            type: 'string',
            required: !true,
            description: '地块等级 (只对内，分级牵涉到6~7，可修改，前端不展示)',
            example: '',
        },
        income: {
            type: 'string',
            required: !true,
            description: '收益（这个应该是有公式算出来的，暂无先做静态）',
            example: '',
        },
        extraBonus: {
            type: 'string',
            required: !true,
            description: '获得额外激励奖励/可获奖励（可修改）',
            example: '',
        },
        saleState: {
            type: 'string',
            required: !true,
            description: '销售状态，可以更改销售状态，并配置对应颜色',
            example: '',
        },
        pictures: {
            type: 'array',
            itemType: 'string',
            required: !true,
            description: '地块图片（可修改）',
            example: [],
        },
    },
};

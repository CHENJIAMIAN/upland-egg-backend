/* 
地块控制台可修改的信息：
add1 address 地址（可修改）
add2 rightPerson 所属人（这个应该是不能改的只能交易后去更改，暂无，先做静态）
    所有人的昵称和头像
add3 price 价格（可修改）
add4 area 面积（划地块的时候自动计算）
add5 level 地块等级 (只对内，分级牵涉到6~7，可修改，前端不展示)
6 income 收益（这个应该是有公式算出来的，暂无先做静态）
7 extraBonus 获得额外激励奖励/可获奖励（可修改）
add8 saleState 销售状态，可以更改销售状态，并配置对应颜色
add9 pictrues[] 地块图片（可修改）
*/
module.exports = (app) => {
    const mongoose = app.mongoose;
    const PlotSchema = new mongoose.Schema({
        address: { type: String, required: true },
        rightPerson: { type: String, required: true },
        rightPersonName: { type: String, required: true },
        rightPersonAvatar: { type: String, required: true },
        price: { type: String, required: true },
        area: { type: String, required: true },
        level: { type: String, required: true },
        income: { type: String, required: true },
        extraBonus: { type: String, required: true },
        saleState: { type: String, required: true },
        pictrues: { type: [], required: true },
    });
    return mongoose.model('Plot', PlotSchema);
};

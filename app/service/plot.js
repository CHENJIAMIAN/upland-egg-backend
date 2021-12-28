const Service = require('egg').Service;

class PlotService extends Service {
    /**
     * 创建地块
     * @param {*} payload
     */
    async create(payload) {
        const { ctx, service } = this;
        return ctx.model.Plot.create(payload);
    }

    /**
     * 删除地块
     * @param {*} _id
     */
    async destroy(_id) {
        const { ctx, service } = this;
        const plot = await ctx.service.plot.find(_id);
        if (!plot) {
            ctx.throw(404, 'plot not found');
        }
        return ctx.model.Plot.findByIdAndRemove(_id);
    }

    /**
     * 修改地块
     * @param {*} _id
     * @param {*} payload
     */
    async update(_id, payload) {
        const { ctx, service } = this;
        const plot = await ctx.service.plot.find(_id);
        if (!plot) {
            ctx.throw(404, 'plot not found');
        }
        return ctx.model.Plot.findByIdAndUpdate(_id, payload);
        // return ctx.model.Plot.findByIdAndUpdate(_id, { $set: payload })
    }

    /**
     * 为地块插入图片
     * @param {*} _id
     * @param {*} payload
     */
    async updatePicture(_id, payload) {
        const { ctx, service } = this;
        const plot = await ctx.service.plot.find(_id);
        if (!plot) {
            ctx.throw(404, 'plot not found');
        }
        return ctx.model.Plot.findByIdAndUpdate(_id, { $push: { pictures: payload } });
        // return ctx.model.Plot.findByIdAndUpdate(_id, { $set: payload })
    }

    /**
     * 查看单个地块
     */
    async show(_id) {
        const plot = await this.ctx.service.plot.find(_id);
        if (!plot) {
            this.ctx.throw(404, 'plot not found');
        }
        return this.ctx.model.Plot.findById(_id).populate('role');
    }

    /**
     * 查看地块列表
     * @param {*} payload
     */
    async index(payload) {
        const { currentPage, pageSize, isPaging, search } = payload;
        let res = [];
        let count = 0;
        let skip = (Number(currentPage) - 1) * Number(pageSize || 10);
        if (isPaging) {
            if (search) {
                res = await this.ctx.model.Plot.find({
                    mobile: { $regex: search },
                })
                    .populate('role')
                    .skip(skip)
                    .limit(Number(pageSize))
                    .sort({ createdAt: -1 })
                    .exec();
                count = res.length;
            } else {
                res = await this.ctx.model.Plot.find({})
                    .populate('role')
                    .skip(skip)
                    .limit(Number(pageSize))
                    .sort({ createdAt: -1 })
                    .exec();
                count = await this.ctx.model.Plot.count({}).exec();
            }
        } else {
            if (search) {
                res = await this.ctx.model.Plot.find({
                    mobile: { $regex: search },
                })
                    .populate('role')
                    .sort({ createdAt: -1 })
                    .exec();
                count = res.length;
            } else {
                res = await this.ctx.model.Plot.find({})
                    .populate('role')
                    .sort({ createdAt: -1 })
                    .exec();
                count = await this.ctx.model.Plot.count({}).exec();
            }
        }
        // 整理数据源 -> Ant Design Pro
        let data = res.map((e, i) => {
            const jsonObject = Object.assign({}, e._doc);
            jsonObject.createdAt = this.ctx.helper.formatTime(e.createdAt);
            return jsonObject;
        });

        return {
            count: count,
            list: data,
            pageSize: Number(pageSize),
            currentPage: Number(currentPage),
        };
    }

    /**
     * 删除多个地块
     * @param {*} payload
     */
    async removes(payload) {
        return this.ctx.model.Plot.remove({ _id: { $in: payload } });
    }

    /**
     * 根据手机号查找
     * @param {*} mobile
     */
    async findByMobile(mobile) {
        return this.ctx.model.Plot.findOne({ mobile: mobile });
    }

    /**
     * 查找地块
     * @param {*} id
     */
    async find(id) {
        return this.ctx.model.Plot.findById(id);
    }

    /**
     * 更新地块信息
     * @param {*} id
     * @param {*} values
     */
    async findByIdAndUpdate(id, values) {
        return this.ctx.model.Plot.findByIdAndUpdate(id, values);
    }
}

module.exports = PlotService;

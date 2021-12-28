const Controller = require('egg').Controller
/**
 * @Controller 地块管理
 */
class PlotController extends Controller {
  constructor(ctx) {
    super(ctx)
  }

  /**
   * @summary 创建地块
   * @description 创建地块
   * @router post /api/plot
   * @request body createPlotRequest *body
   * @response 200 baseResponse 创建成功
   */
  async create() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(ctx.rule.createPlotRequest)
    // 组装参数
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    const res = await service.plot.create(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }


  /**
   * @summary 删除单个地块
   * @description 删除单个地块
   * @router delete /api/plot/{id}
   * @request path string *id eg:1 地块ID
   * @response 200 baseResponse 创建成功
   */
  async destroy() {
    const { ctx, service } = this
    // 校验参数
    const { id } = ctx.params
    // 调用 Service 进行业务处理
    await service.plot.destroy(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }

  /**
   * @summary 修改地块
   * @description 获取地块信息
   * @router put /api/plot/{id}
   * @request path string *id eg:1 地块ID
   * @request body createPlotRequest *body
   * @response 200 baseResponse 创建成功
   */
  async update() {
    const { ctx, service } = this
    // 校验参数
    ctx.validate(ctx.rule.createPlotRequest)
    // 组装参数
    const { id } = ctx.params
    const payload = ctx.request.body || {}
    // 调用 Service 进行业务处理
    await service.plot.update(id, payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }
 
  /**
   * @summary 获取单个地块
   * @description 获取地块信息
   * @router get /api/plot/{id}
   * @request path string *id
   * @response 200 baseResponse 创建成功
   */
  async show() {
    const { ctx, service } = this
    // 组装参数
    const { id } = ctx.params
    // 调用 Service 进行业务处理
    const res = await service.plot.show(id)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  
  /**
   * @summary 获取所有地块(分页/模糊)
   * @description 获取地块信息
   * @router get /api/plot
   * @request query integer *currentPage eg:1 当前页
   * @request query integer *pageSize eg:10 单页数量
   * @request query string search eg: 搜索字符串
   * @request query boolean isPaging eg:true 是否需要翻页
   * @response 200 baseResponse 创建成功
   */
  async index() {
    const { ctx, service } = this
    // 组装参数
    const payload = ctx.query
    // 调用 Service 进行业务处理
    const res = await service.plot.index(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx, res})
  }

  /**
   * @summary 删除所选地块
   * @description 获取地块信息
   * @router delete /api/plot/{id}
   * @request path string *id
   * @response 200 baseResponse 创建成功
   */
  async removes() {
    const { ctx, service } = this
    // 组装参数
    // const payload = ctx.queries.id
    const { id } = ctx.request.body
    const payload = id.split(',') || []
    // 调用 Service 进行业务处理
    const result = await service.plot.removes(payload)
    // 设置响应内容和响应状态码
    ctx.helper.success({ctx})
  }
}


module.exports = PlotController
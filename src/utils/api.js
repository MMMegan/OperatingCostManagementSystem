import {service} from './request'
/*
* @param username
* @param userPassword
* if error
* return "用户名或密码不合法"
* success return 用户信息
* */
export const login = params => {
    return service.post('/login', params)
}

export const logout = params => {
    return service.post('/logout', params)
}
/*
* @param username
* @param password
* if error
* return "用户名或密码不合法"
* success return 用户信息
* */    
export const register = params => {
    return service.post('/register', params)
}

/*
*  @param username
*  成功返回信息，不成功返回0
* */
export const updateUsername = params => {
    return service.post('/user/update/username', params)
}
/*
*  @param oldPassword,newPassword
*  成功返回信息，不成功返回0
* */
export const updatePassword = params => {
    return service.post('/user/update/password', params)
}
/*
*  @param  telephone
*  成功返回信息，不成功返回0
* */
export const updateTelephone= params => {
    return service.post('/user/update/telephone', params)
}
/*
*  @param username
*  成功返回用户信息
* */
export const getUser = params => {
    return service.post('/user/get', params)
}
/*
*  @param username
*  成功列出用户列表
* */
export const listUser = params=>{
    return service.post('/user/list',params)
}
/*
*  @param username
*  成功删除用户
* */
export const deleteUser = params=>{
    return service.post('/user/delete',params)
}
/*
*  @param username
*  成功更改用户权限
* */
export const changePermission = params=>{
    return service.post('/user/update/permission',params)
}
/*
*  场地site
* /
/*
*  @param siteId
* */
export const getSiteById = params => {
    return service.post('/site/get', params)
}
/*
* @param pageParam
*  成功获取场地列表
* */
export const getTotalNumsite = params=>{
    return service.post('site/list',params)
}
/*
*  成功根据场馆获取场地
* */
export const getTotalsite = params=>{
    return service.post('site/listByStadium',params)
}
/*
*  @param site
*  成功创建场地
* */
export const createSite = params=>{
    return service.post('site/create',params)
}
/*
*  @param siteId
*  成功删除场地
* */
export const deleteSiteById = params=>{
    return service.post('site/delete',params)
}
/*
*  @param updateParam
*  成功更新场地信息
* */
export const updateSite = params=>{
    return service.post('site/update',params)
}
/*
* 场馆 stadium
* */
/*
*  成功创建场馆
* */

export const createStadium = params =>{
    return service.post('/stadium/create',params)
}
/*
*  成功获取场馆列表
* */
export const getStadium = params => {
    return service.post('/stadium/list', params)
}
/*
*  成功获取场馆信息
* */
export const getStadiumById = params => {
    return service.post('/stadium/get', params)
}
/*
*  成功删除场馆
* */
export const deleteStadium = params =>{
    return service.post('/stadium/delete',params)
}
/*
*  成功更新场馆
* */
export const updateStadium = params =>{
    return service.post('/stadium/update',params)
}

/*
*新闻 news
* */
/*
*  @param title,content,image
*  成功返回用户信息
* */
export const publishNews = params => {
    return service.post('/news/publish', params)
}

/*
*  @param newsId
* */
export const deleteNews = params => {
    return service.post('/news/delete', params)
}
/*
*  @param newsId,title,content,image
* */
export const updateNews = params => {
    return service.post('/news/update', params)
}
/*
*  @param  pageNum,pageSize
* */
export const listNews = params => {
    return service.post('/news/list', params)
}
/*
*  @param  newsId
* */
export const getNews = params => {
    return service.post('/news/get', params)
}
/*
*  @param  pageNum,pageSize
* */
export const getcatalogNews = params => {
    return service.post('/news/getcatalog', params)
}

/* order*/

/*
*  @param  siteId,siteName,rent,startTime,endTime
* 创建订单
* */
export const createOrder = params => {
    return service.post('/order/create', params)
}

/*
*  @param   orderId, auditStatus
* 审核通过或不通过
* */
export const auditOrder = params => {
    return service.post('/order/audit', params)
}
/*
*  @param   orderId
* 管理员取消订单
* 未用到
* */
export const cancelOrder = params => {
    return service.post('/order/cancel', params)
}

/*
*  @param   orderId
* 普通用户取消订单
* */
export const userCancelOrder = params => {
    return service.post('/order/user/cancel', params)
}
/*
*  @param   orderId
* 普通用户修改订单
* */
export const userUpdateOrder = params => {
    return service.post('/order/user/update', params)
}

/*
*  @param   status,{pageNum,pageSize}
* 管理员根据订单状态查看订单
* */
export const listOrder = params => {
    return service.post('/order/list', params)
}
/*
*  @param  status,{pageNum,pageSize}
* 管理员按用户列出订单
* */
export const siteListOrderByUser = params => {
    return service.post('/order/user/list', params)
}
/*
*  @param  orderId
* 管理员按用户列出订单
* */

export const getOrder = params => {
    return service.post('/order/get', params)
}

/*comments*/
/*
*  @param  pageParams
* 根据场地获取所有评论
* */
export const getComments = params => {
    return service.post('/site/comment/getcomments', params)
}
/*
*  @param  pageParams
* 根据获取所有评论
* */
export const getCommentsList = params=>{
    return service.post('/site/comment/listNewComments',params)
}
/*
*  @param  CommentPublishParam
* 发表评论
* */
export const publishComment = params =>{
    return service.post('/site/comment/publish',params)
}
/*
*  @param  CommentVO
* 删除评论
* */
export const deleteComment = params =>{
    return service.post('/site/comment/delete',params)
}
/*
*  @param  CommentVO
* @param AuditOption
* 审核评论
* */
export const auditComment = params =>{
    return service.post('/site/comment/audit',params)
}




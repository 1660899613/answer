let baseUrl = ''

let domain = 'sra.weikebaba.com' 
let staticUrl = 'https://'+ domain +'/Uploads/singleSale/static' // 静态文件服务器域名
let imgUrl = 'https://'+ domain +'/' // 图片域名
let echatUrl = 'https://tfb.30ie.com' // 客服系统域名

// 开发环境
if(process.env.NODE_ENV === 'development'){
    baseUrl = 'https://'+ domain +'/index.php'
}
// 生产环境
if(process.env.NODE_ENV === 'production'){
    baseUrl = 'https://'+ domain +'/index.php'
}

export default {
	baseUrl,
	staticUrl,
	imgUrl,
	echatUrl
}
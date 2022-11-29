const request =  require('request');//
const iconv = require('iconv-lite');//设置编码格式
const Cheerio = require('cheerio');

//封装成函数
const requestPromise = (url) =>{
	return new Promise((resolve, reject) =>{
		//先取消原有的编码格式
		request(url, {encoding:null},function (error, response, body) {
			if(response.statusCode == 200){
				//如果原网页编码格式有问题，可以转成ubt8格式的，该括号内utf-8为原网页编码格式（演示使用）
				const bufs = iconv.decode(body, 'utf-8');
				const html = bufs.toString('utf-8');//转成utf-8
				// console.log(html);
				resolve(html);
			}
			else{
				reject(error);
			}
		});
	})
}
const url = 'https://blog.csdn.net/shelter123456/article/details/126039009';  //.news_list_ulbox ul li div div div:nth-child(1) em a
requestPromise(url).then(res => {

	console.log("🐱‍🏍 => 🚀 file: index.js 🚀 line 26 🚀 requestPromise 🚀 res", res);

	const $ = Cheerio.load(res);//成功后用cheerio加载
	$('.news_list_ulbox ul li div div div:nth-child(1) em a').each((i, item) => {
		console.log($(item).text());
        console.log('https://www.chinanews.com.cn/'+$(item).attr('href'))
	});
});

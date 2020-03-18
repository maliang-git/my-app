// import urlConfig from './config.js'
const urlConfig = 'http://127.0.0.1:3002'
const request = {}
const headers = {}

request.globalRequest = (url, method, data, power) => {
	/*     权限判断 因为有的接口请求头可能需要添加的参数不一样，所以这里做了区分
	    1 == 不通过access_token校验的接口
	    2 == 文件下载接口列表
	    3 == 验证码登录 */

	switch (power) {
		case 1:
			headers['Authorization'] = 'Basic a3N1ZGk6a3N1ZGk='
			break;
		case 2:
			headers['Authorization'] = 'Basic a3N1ZGlfcGM6a3N1ZGlfcGM='
			break;
		case 3:
			responseType = 'blob'
			break;
		default:
			headers["Content-Type"] =  'application/json;charset=UTF-8';
			// headers["content-type"] = "application/x-www-form-urlencoded";
			// headers['TENANT-ID'] = this.$store.getters.userInfo.tenant_id
			break;
	}

	return uni.request({
		url: urlConfig + url,
		method,
		data: {
			loginName: "",
			phone: "",
			passWord: "",
			confirmPaw: ""
		},
		dataType: 'json',
		header: headers,
	}).then(res => {
		return res[1]
	}).catch(parmas => {
		switch (parmas.code) {
			case 401:
				uni.clearStorageSync()
				break
			default:
				uni.showToast({
					title: parmas.message,
					icon: 'none'
				})
				return Promise.reject()
				break
		}
	})
}
request.globalRequest('/user-center/register','POST')
export default request

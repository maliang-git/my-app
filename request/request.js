// import urlConfig from './config.js'
const urlConfig = {
    baseUrl: "http://172.16.75.33:3002"
};
const request = {};
const headers = {};

// method 请求类型 *大写r
// url 请求地址
// data 参数
// power 请求头 传入格式：示例 {headers:{'Content-Type':'application/json;charset=UTF-8'}}
// domain 请求域名
export default request.globalRequest = (method, url, data, domain, power) => {
    headers["Content-Type"] = "application/json;charset=UTF-8";
    headers["request-origin"] = "WAP";
	
	// 设置用户token
	uni.getStorage({
	    key: 'userInfo',
	    success: function (res) {
			headers["user-token"] = res.data.token;
	    }
	});
	
    if (power && power.headers) {
        Object.keys(power.headers).forEach(key => {
            headers[key] = power.headers[key];
        });
    }
    if (domain) {
        url = urlConfig[domain] + url;
    } else {
        url = urlConfig.baseUrl + url;
    }

    return uni
        .request({
            url,
            method,
            data,
            dataType: "json",
            header: headers
        })
        .then(res => {
            if (res[1] && res[1].statusCode == 200) {
                if (res[1].data.code === 5223) {
                    console.log("未登录");
                    uni.showToast({
                        title: "请重新登录",
                        icon: "none"
                    });
                    uni.removeStorage({
                        key: "userInfo"
                    });
                    redirect("/pages/login/login");
                }
                return res[1].data;
            } else {
                throw res;
            }
        })
        .catch(parmas => {
            switch (parmas.code) {
                case 401:
                    uni.clearStorageSync();
                    break;
                default:
                    uni.showToast({
                        title: parmas.message,
                        icon: "none"
                    });
                    return Promise.reject(parmas);
                    break;
            }
        });
};

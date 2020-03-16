<template>
	<view class="login_content">
		登陆页
		<button class="tui-btn1 login_btn" open-type="getUserInfo" type="primary" size="small" @getuserinfo="getUserinfo">
			微信授权登录
		</button>
	</view>
</template>

<script>
	export default {
		data() {
			const imgUrl = this.$config.imgUrl;
			return {
				imgUrl : imgUrl,
				pageType: false,
			}
		},
		methods: {
			// 时间格式化
			timeStr(time){
				return `${time.getFullYear()}-${time.getMonth()+1}-${time.getDate()} ${time.getHours()}:${time.getMinutes()}:${time.getSeconds()}.${time.getMilliseconds()}`
			},
			loginMd(){
				let res = {}
				let _nowDate = new Date();
				res.event_name="p_loginButton"
				res.login_type="微信授权登录"
				res.position="页面"
				res.current_time = this.timeStr(_nowDate)
				this.$getOptions(res)
			},
			getUserinfo(res){
				console.log(res);
				if (res.detail.errMsg === 'getUserInfo:ok') {
					let encryptedData = res.detail.encryptedData;
					let iv = res.detail.iv;
					// this.$store.commit('SET_USERINFO', res.detail.userInfo);
					let _this = this;
                    
					// 小程序登录
					uni.login({
					  success(resLogin) {
					    console.log(resLogin);
						if (resLogin.errMsg === "login:ok") {
							_this.wechatLogin(resLogin.code,encryptedData,iv);
						}
					  }
					});
				}
			},
			wechatLogin(wxCode,encryptedData,iv){
				// 微信授权登录
				let set_data ={
					"code": wxCode,
					"encryptedData": encryptedData,
					"iv": iv
				}
				uni.showLoading({
				    title: '登录中..',
					mask: true
				});
				this.$http.post(user.wechatNewLogin,set_data,{header:{'dggHeader' : this.$dggSensors.dggHeader}}).then(res=>{
					console.log(res);
					uni.hideLoading();
					if (res.code == 200) {
						uni.setStorageSync("token",res.data.token);
						uni.setStorageSync("userInfo", res.data.userInfo);
						uni.setStorageSync("tokenExpire",res.data.tokenExpire);
						this.$store.commit('SET_USERINFO', res.data.userInfo);
						uni.setStorageSync("openId",res.data.userInfo.openId);
						this.$http.get(carts.get_cart_count).then(res => {
							if (res.code == 200) {
								if (res.data.cartCount > 0) {
									uni.setTabBarBadge({
										index: 2,
										text: String(res.data.cartCount)
									});
								}
							}
						});
						// 返回
						if(this.$store.state.xdyParams.xdyUrl){
							this.$store.commit('SET_WEB_VIEW_URL', `${this.$store.state.xdyParams.xdyUrl}?token=${res.data.token}&platform=xdy&memberId=${res.data.userInfo.id}&userName=${res.data.userInfo.nickName}&userToken=${res.data.userInfo.userId}`);
							uni.navigateTo({
								url: '/pages/webView/webView'
							});
						} else {
							// 如果用户是点击加入购物车或者立即购买进来
							if(this.$store.state.reLoginParams.type == 'goods'){
								let pages = getCurrentPages()
								let page = pages.find(item => item.route == 'pages/productDetails/productDetails')
								if(this.$store.state.reLoginParams.methods == 'addCarts'){
									uni.navigateBack({ delta: 2 });
								}
								try{ page.$vm[this.$store.state.reLoginParams.methods]() }catch(e){}
								this.$store.commit('SET_RE_LOGIN_PARAMS', {})
							} else if(this.$store.state.reLoginParams.type == 'my'){
								let pages = getCurrentPages()
								uni.navigateTo({
									url: this.$store.state.reLoginParams.methods
								})
								this.$store.commit('SET_RE_LOGIN_PARAMS', {})
							} else {
								uni.navigateBack({
									delta: 2
								});
							}
						}
						// 登录埋点
						var setDggInfo = {
							is_vip: '',
							vip_level: '',
							dgg_user_id: res.data.userInfo.userId,
							dgg_user_name: res.data.userInfo.nickName,
							user_tag: ''
						}
						this.$dggSensors.dggLogin(setDggInfo);
						this.loginMd();
					}else if(res.code == 506){
						uni.showToast({
							title: res.message,
							icon: 'none'
						})
						setTimeout(() => {
							uni.navigateTo({
								url:'/pages/login/wxLogin'
							})
						}, 1000)
					}else{
						uni.showToast({
						    title: res.message,
							icon: 'none',
						    duration: 2000
						});
					}
				});
			},
			//路由跳转 手机登录
			goTomoblieLogin:function(){
				uni.navigateTo({
					url:'/pages/login/moblieLogin'
				})
			},
			//路由跳转  密码登录
			goTopaswordLogin:function(){
				uni.navigateTo({
					url:'/pages/login/passwordLogin'
				})
			}
		}
	}
</script>


<style>
</style>

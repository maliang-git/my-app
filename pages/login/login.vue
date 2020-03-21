<template>
    <view class="container">
        <image
            class="user_head"
            src="../../static/defullt_img.png"
            mode=""
        ></image>
        <view class="input_box">
            <uni-icons
                class="icon"
                type="phone"
                size="28"
                color="#555555"
            ></uni-icons>
            <input
                type="number"
                placeholder="请输入手机号"
                v-model="formData.phone"
                maxlength="11"
            />
        </view>
        <view class="input_box">
            <uni-icons
                class="icon"
                type="locked"
                size="28"
                color="#555555"
            ></uni-icons>
            <input
                placeholder="请输入密码"
                v-model="formData.passWord"
                :password="pawIsShow"
                maxlength="20"
            />
        </view>
        <button class="sumit_btn" style="width:100%;" @click="regHandel">
            立即登录
        </button>
        <view class="regin">
            <navigator
                open-type="reLaunch"
                class="reg-btn"
                url="/pages/login/reg"
                hover-class="none"
                >注册账号</navigator
            >
        </view>
    </view>
</template>

<script>
import uniIcons from "@/components/uni-icons/uni-icons.vue";
import api from "@/api/index.js";
export default {
    components: {
        uniIcons
    },
    data() {
        return {
            formData: {
                phone: "18142566233",
                passWord: "123456"
            },
            pawIsShow: false,
            confirmPawIsShow: false
        };
    },
    methods: {
        regHandel() {
            if (!/^(1)[2,3,4,5,6,7,8,9][0-9]{9}$/.test(this.formData.phone)) {
                uni.showToast({
                    title: "手机号有误",
                    icon: "none"
                });
                return;
            }
            if (
                this.formData.passWord === "" ||
                this.formData.passWord.length < 5
            ) {
                uni.showToast({
                    title: "请输入5位以上的密码",
                    icon: "none"
                });
                return;
            }
            uni.showLoading({
                mask: true
            });
            this.$http("POST", api.userApi.login, this.formData)
                .then(res => {
                    uni.hideLoading();
                    if (res.code === 200) {
                        uni.setStorage({
                            key: "userInfo",
                            data: res.data
                        });
                        uni.showToast({
                            title: res.msg,
                            icon: "none"
                        });
                        uni.reLaunch({
                            url: "/pages/index/index"
                        });
                    } else {
                        uni.showToast({
                            title: res.msg,
                            icon: "none"
                        });
                    }
                })
                .catch(error => {
                    uni.hideLoading();
                });
        }
    }
};
</script>

<style scoped lang="less">
@import "../../common/less/public.less";

.container {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
    height: calc(100vh - 44px);
    margin: 0 auto;
    padding: 0 24px;
    overflow: hidden;
    box-sizing: border-box;
    padding-top: 120upx;
    .user_head {
        width: 180upx;
        height: 180upx;
        margin-bottom: 80upx;
        border-radius: 50%;
        overflow: hidden;
    }

    > .input_box {
        width: 100%;
        position: relative;
        overflow: hidden;
        margin-bottom: 20px;

        .icon {
            position: absolute;
            left: 0;
            bottom: 4upx;
        }

        input {
            width: 100%;
            border-bottom: 2upx solid #eeeeee;
            padding: 12upx 0;
            padding-left: 60upx;
        }
    }

    .sumit_btn {
        background-color: @themeColor;
        color: #ffffff;
        margin-top: 40upx;
    }

    .regin {
        position: fixed;
        bottom: 40upx;
        left: 0;
        width: 100%;
        display: flex;
        justify-content: center;

        .reg-btn {
            padding: 20upx 0;
            font-size: 32upx;
            font-family: PingFang SC;
            font-weight: 500;
            color: #878787;
        }
    }
}
</style>

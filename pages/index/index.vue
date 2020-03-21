<template>
    <view class="content">
        <scroll-view :scroll-top="0" scroll-y="true" class="scroll-Y">
            <!-- <text class="tips">暂无聊天信息</text> -->
            <view
                class="scroll-view-item user-item"
                v-for="(item, index) in 10"
                :key="index"
                @click="goChat"
            >
                <view class="head-portrait">
                    <min-badge class="badge" :count="100"></min-badge>
                    <image
                        class="user_head"
                        src="../../static/defullt_img.png"
                        mode=""
                    ></image>
                </view>
                <view class="name-msg">
                    <view class="name-time">
                        <text class="name">小馬哥</text>
                        <text class="time">13:02</text>
                    </view>
                    <text class="msg">你在说什么？</text>
                </view>
            </view>
        </scroll-view>
    </view>
</template>

<script>
import minBadge from "@/components/min-badge/min-badge";
export default {
    components: {
        minBadge
    },
    data() {
        return {
            title: "Hello"
        };
    },
    onLoad() {
        // 未登录拦截
        uni.getStorage({
            key: "userInfo",
            success: function(res) {
                if (!res.data.token) {
                    uni.reLaunch({
                        url: "/pages/login/login"
                    });
                }
            },
            fail: function() {
                uni.reLaunch({
                    url: "/pages/login/login"
                });
            }
        });
    },
    methods: {
        goChat() {
            uni.navigateTo({
                url: "/chat/window/window"
            });
        }
    }
};
</script>

<style scoped lang="less">
.content {
    .tips {
        display: block;
        width: 100%;
        text-align: center;
        font-size: 32rpx;
        color: #999999;
        height: 100rpx;
        line-height: 100rpx;
    }
    .user-item {
        display: flex;
        padding: 18rpx 0 0 30rpx;
        box-sizing: border-box;
        &:active {
            background-color: #eeeeee;
        }
        .head-portrait {
            position: relative;
            width: 120rpx;
            height: 120rpx;
            margin-right: 20rpx;
            background-color: #eeeeee;
            border-radius: 6rpx;
            > image {
                width: 100%;
                height: 100%;
            }
            .badge {
                position: absolute;
                right: 0;
                top: 0;
            }
        }
        .name-msg {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: space-around;
            padding-bottom: 18rpx;
            border-bottom: 1rpx solid #eeeeee;
            height: 138rpx;
            box-sizing: border-box;
            padding-right: 30rpx;
            .name-time {
                display: flex;
                justify-content: space-between;
                .name {
                    font-size: 38rpx;
                    color: #333333;
                }
                .time {
                    font-size: 30rpx;
                    color: #999999;
                }
            }
            .msg {
                font-size: 30rpx;
                color: #999999;
            }
        }
    }
}
</style>

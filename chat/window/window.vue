<template>
    <view class="content">
        <scroll-view :scroll-top="0" scroll-y="true" class="scroll-Y">
            <view class="scroll-view-item user-item have-time">
                <text class="time">16:31</text>
                <view class="head-portrait">
                    <image
                        class="user_head"
                        src="../../static/defullt_img.png"
                        mode=""
                    ></image>
                </view>
                <view class="name-msg">
                    <text class="msg"
                        >你在说什么？你在说什么？你在说你在说什么？你在说什么？你在说你在说什么？你在说什么？你在说你在说什么？你在说什么？你在说</text
                    >
                </view>
            </view>
            <view class="scroll-view-item user-item my-msg">
                <view class="head-portrait">
                    <image
                        class="user_head"
                        src="../../static/defullt_img.png"
                        mode=""
                    ></image>
                </view>
                <view class="name-msg">
                    <text class="msg"
                        >你在说什么？你在说什么？你在说你在说什么？你在说什么？你在说你在说什么？你在说什么？你在说你在说什么？你在说什么？你在说</text
                    >
                </view>
            </view>
            <view class="scroll-view-item user-item my-msg have-time">
                <text class="time">16:31</text>
                <view class="head-portrait">
                    <image
                        class="user_head"
                        src="../../static/defullt_img.png"
                        mode=""
                    ></image>
                </view>
                <view class="name-msg">
                    <view class="msg"
                        ><image
                            src="../../static/defullt_img.png"
                            mode="aspectFit"
                        ></image
                    ></view>
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
            title: "window"
        };
    },
    onLoad() {},
    methods: {}
};
</script>

<style scoped lang="less">
@import "../../common/less/public.less";
.content {
    width: 100%;
    height: 100vh;
    background-color: #eeeeee;
    .scroll-Y {
        height: 100%;
        .have-time {
            position: relative;
            margin-top: 80rpx;
            > .time {
                width: 100%;
                display: block;
                position: absolute;
                top: -40rpx;
                left: 0;
                text-align: center;
                font-size: 30rpx;
                color: #999999;
            }
        }
        .user-item {
            width: 100%;
            padding: 20rpx 30rpx 0 30rpx;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            padding-right: 160rpx;
            box-sizing: border-box;
            .head-portrait {
                position: relative;
                width: 100rpx;
                height: 100rpx;
                background-color: #eeeeee;
                border-radius: 6rpx;
                > image {
                    width: 100%;
                    height: 100%;
                }
            }
            .name-msg {
                flex: 0.94;
                position: relative;
                display: flex;
                align-items: center;
                justify-content: flex-start;
                > .msg {
                    background-color: #ffffff;
                    padding: 8rpx 16rpx;
                    font-size: 32rpx;
                    border-radius: 8rpx;
                    word-break: break-all;
                    max-width: 400rpx;
                    image {
                        max-width: 100%;
                    }
                    &::before {
                        content: "";
                        width: 20rpx;
                        height: 20rpx;
                        transform: rotate(-45deg);
                        background-color: #fff;
                        position: absolute;
                        left: -10rpx;
                        top: 40rpx;
                    }
                }
            }
        }
        .my-msg {
            flex-flow: row-reverse;
            padding-right: 30rpx;
            padding-left: 160rpx;
            box-sizing: border-box;
            .name-msg {
                justify-content: flex-end;
                .msg {
                    background-color: @themeColor;
                    &::before {
                        display: none;
                    }
                    &::after {
                        content: "";
                        width: 20rpx;
                        height: 20rpx;
                        transform: rotate(-45deg);
                        background-color: @themeColor;
                        position: absolute;
                        right: -10rpx;
                        top: 40rpx;
                    }
                }
            }
        }
    }
}
</style>

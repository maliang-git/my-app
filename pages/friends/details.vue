<template>
    <view class="content">
        <view class="details-top">
            <view class="user-info">
                <view class="user-head">
                    <image src="../../static/defullt_img.png" mode=""></image>
                </view>
                <view class="user-other">
                    <view class="user-name"
                        ><text>小马哥</text
                        ><uni-icons
                            type="person-filled"
                            color="rgb(0, 122, 255)"
                            size="18"
                        ></uni-icons
                    ></view>
                    <view class="line-item">昵称：<text>小马哥</text></view>
                    <view class="line-item">账号：<text>小马哥</text></view>
                    <view class="line-item">地区：<text>四川 成都</text></view>
                </view>
            </view>
            <fn-item title="备注和标签"></fn-item>
            <fn-item title="朋友权限"></fn-item>
        </view>
        <view class="moudle-item">
            <fn-item title="圈圈" height="140" noBorder>
                <view class="img-list">
                    <image src="../../static/defullt_img.png" mode=""></image>
                    <image src="../../static/defullt_img.png" mode=""></image>
                    <image src="../../static/defullt_img.png" mode=""></image>
                    <image src="../../static/defullt_img.png" mode=""></image>
                </view>
            </fn-item>
            <fn-item title="更多信息"></fn-item>
        </view>
        <view class="moudle-item moudle-btn">
            <my-btn title="发送消息" icon-type="chatbubble"></my-btn>
            <my-btn title="添加好友" icon-type="plus"></my-btn>
        </view>
    </view>
</template>

<script>
import uniIcons from "@/components/uni-icons/uni-icons.vue";
import fnItem from "@/components/my-components/fn-item.vue";
import myBtn from "@/components/my-components/my-btn.vue";
export default {
    components: { uniIcons, fnItem, myBtn },
    data() {
        return {};
    },
    onLoad() {},
    methods: {},
};
</script>

<style scoped lang="less">
.content {
    height: 100vh;
    background-color: rgb(248, 248, 248);
    .details-top {
        width: 100%;
        padding: 44rpx 0 0 0;
        box-sizing: border-box;
        background-color: #fff;
        .user-info {
            width: 100%;
            padding: 0rpx 0 48rpx 10rpx;
            box-sizing: border-box;
            display: flex;
            padding-left: 44rpx;
            box-sizing: border-box;

            > .user-head {
                width: 150rpx;
                height: 150rpx;
                border-radius: 10rpx;
                overflow: hidden;
                margin-right: 20rpx;
                image {
                    max-width: 100%;
                    max-height: 100%;
                }
            }
            .user-other {
                flex: 1;
                .user-name {
                    margin-bottom: 6rpx;
                    margin-top: -6rpx;
                    text {
                        font-size: 38rpx;
                        color: #333;
                        margin-right: 8rpx;
                    }
                }
                .line-item {
                    font-size: 28rpx;
                    color: #888;
                    margin-bottom: 4rpx;
                }
            }
        }
    }
    .moudle-item {
        background-color: #fff;
        margin-top: 20rpx;
        .img-list {
            flex: 1;
            display: flex;
            align-items: flex-start;
            justify-content: flex-end;
            flex-wrap: wrap;
            overflow: hidden;
            padding: 0 20rpx;
            box-sizing: border-box;
            image {
                max-width: 100rpx;
                max-height: 100rpx;
                margin-left: 10rpx;
            }
        }
    }
    .moudle-btn > view:not(:first-child) {
        border-top: 1rpx solid #eeeeee;
    }
}
</style>

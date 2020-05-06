<template>
    <view class="content">
        <scroll-view :scroll-top="0" scroll-y="true" class="scroll-Y">
            <view class="search-box">
                <view>
                    <icon class="uni-icon" type="search" size="18" />
                    <input
                        class="uni-input"
                        confirm-type="search"
                        placeholder="用户名/手机号"
                        @confirm="searchUser"
                    />
                </view>
            </view>
        </scroll-view>
    </view>
</template>

<script>
import uniIcons from "@/components/uni-icons/uni-icons.vue";
export default {
    components: { uniIcons },
    data() {
        return {};
    },
    onLoad() {},
    methods: {
        searchUser(){
            this.pageJump()
        },
        pageJump() {
            uni.navigateTo({
                url: "/pages/friends/details",
            });
        },
    },
};
</script>

<style scoped lang="less">
.content {
    .search-box {
        width: 100%;
        background-color: rgb(248, 248, 248);
        padding: 20rpx;
        box-sizing: border-box;
        > view {
            position: relative;
            width: 100%;
            height: 88rpx;
            background-color: #fff;
            .uni-icon {
                position: absolute;
                left: 20rpx;
                top: 50%;
                transform: translateY(-50%);
                border-radius: 4rpx;
            }
            .uni-input {
                height: 44px;
                font-size: 28rpx;
                padding-left: 64rpx;
            }
        }
    }
}
</style>

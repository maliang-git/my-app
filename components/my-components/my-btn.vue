<template>
    <view class="my-btn-item" :style="{ height: height + 'rpx' }">
        <uni-icons
            v-if="iconType && iconType != ''"
            :type="iconType"
            :color="iconColor"
            :size="iconSize"
        ></uni-icons>
        <text>{{ title }}</text>
    </view>
</template>

<script>
import uniIcons from "@/components/uni-icons/uni-icons.vue";
export default {
    components: { uniIcons },
    props: {
        iconType: {
            type: String,
            default: "",
        },
        iconColor: {
            type: String,
            default: "#1296db",
        },
        iconSize: {
            type: String,
            default: "18",
        },
        title: {
            type: String,
            default: "",
        },
        height: {
            type: String,
            default: "100",
        },
    },
    computed: {},
};
</script>

<style lang="less" scoped>
.my-btn-item {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 24rpx;
    box-sizing: border-box;
    &:active {
        background-color: #eeeeee;
    }
    > text {
        color: #1296db;
        margin-left: 10rpx;
    }
}
</style>

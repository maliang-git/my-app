<template>
    <view
        class="fn-item"
        :style="{ height: height + 'rpx' }"
        :class="noBorder ? 'no-border' : ''"
    >
        <text>{{ title }}</text>
        <slot></slot>
        <uni-icons type="arrowright" color="#999" size="18"></uni-icons>
    </view>
</template>

<script>
import uniIcons from "@/components/uni-icons/uni-icons.vue";
export default {
    components: { uniIcons },
    props: {
        title: {
            type: String,
            default: "",
        },
        height: {
            type: String,
            default: "100",
        },
        noBorder: {
            type: Boolean,
            default: false,
        },
    },
    computed: {},
};
</script>

<style lang="less" scoped>
.fn-item {
    position: relative;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-right: 24rpx;
    padding-left: 44rpx;
    box-sizing: border-box;
    &::after {
        position: absolute;
        top: 0;
        bottom: 0;
        content: "";
        width: calc(~"100% - 44rpx");
        border-top: 1rpx solid #eeeeee;
    }
    &:active {
        background-color: #eeeeee;
    }
    text {
        font-size: 34rpx;
    }
}
.no-border {
    &::after {
        position: absolute;
        top: 0;
        bottom: 0;
        content: "";
        width: calc(~"100% - 44rpx");
        border-top: 0rpx solid #eeeeee;
    }
}
</style>

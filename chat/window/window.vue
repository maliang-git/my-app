<template>
    <view class="content">
        <scroll-view :scroll-top="scrollTop"
                     scroll-y="true"
                     class="scroll-Y"
                     id="scrollview"
                     style="height: 100%;">
            <view id="msglistview">
                <view v-for="(item,index) in chatDetaileList"
                      :key="index"
                      class="scroll-view-item user-item have-time"
                      :class="item.send_user._id ===  currentChatUser._id? '' : 'my-msg'"
                      v-if="item.send_user._id ===  currentChatUser._id || item.is_send">
                    <text class="time">{{ $time(new Date(item.create_time),"yyyy-MM-dd hh:mm:ss") }}</text>
                    <view class="head-portrait">
                        <image class="user_head"
                               src="../../static/defullt_img.png"
                               mode=""></image>
                    </view>
                    <view class="name-msg">
                        <text class="msg">{{ item.content }}</text>
                    </view>
                </view>
            </view>
            <!--    <view class="scroll-view-item user-item my-msg">
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
            </view> -->
        </scroll-view>
        <view class="input-content">
            <view class="send-voice">
                <uni-icons type="mic-filled"
                           size="30"></uni-icons>
            </view>
            <view class="send-msg">
                <input class="uni-input"
                       type="text"
                       v-model="messge"
                       @confirm="sendMessge"
                       confirm-type="send" />
            </view>
            <view class="other-btn">
                <view>
                    <uni-icons type="contact-filled"
                               size="30"></uni-icons>
                </view>
                <view>
                    <uni-icons type="plusempty"
                               size="30"></uni-icons>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
import minBadge from "@/components/min-badge/min-badge";
export default {
    name: 'window',
    components: {
        minBadge
    },
    data() {
        return {
            title: "window",
            scrollTop: 0,
            chatDetaileList: [],
            currentChatUser: {}, // 对方
            send_user: {}, // 我方
            messge: '',
            roomInfo: {}
        };
    },
    mounted() {
        this.getChatList()
        this.getRoomInfo()
        // 监听房间信息回调
        this.$store.state.socketInfo.on('return_room_info', (roomInfo) => {
            this.roomInfo = roomInfo
            console.log('房间信息', roomInfo)
        })
        // 监听获取消息列表
        this.$store.state.socketInfo.on('return_msg_list', (msgList) => {
            console.log('消息列表', msgList)
            this.chatDetaileList = msgList
            setTimeout(this.scrollToBottom)
        })
        // 监听接收消息回调
        this.$store.state.socketInfo.on('receive_msg', (msgItem) => {
            console.log('接收消息', msgItem)
            this.chatDetaileList.push(msgItem)
            if (msgItem.send_user._id === this.send_user._id) {
                setTimeout(this.scrollToBottom)
            }
        })
    },
    onLoad() {
        this.send_user = uni.getStorageSync('userInfo')
        this.currentChatUser = uni.getStorageSync('currentChatUser')
    },
    methods: {
        // 获取当前房间信息
        getRoomInfo() {
            this.$store.state.socketInfo.emit('get_room_info', {
                to_user: this.currentChatUser._id,
                send_user: this.send_user._id,
            });
        },
        // 滚动至聊天底部
        scrollToBottom(t) {
            let that = this
            let query = uni.createSelectorQuery()
            query.select('#scrollview').boundingClientRect()
            query.select('#msglistview').boundingClientRect()
            query.exec((res) => {
                if (res[1].height > res[0].height) {
                    that.scrollTop = res[1].height - res[0].height + 144
                }
            })
        },
        // 获取消息列表
        getChatList() {
            this.$store.state.socketInfo.emit('get_msg_list', {
                send_user: this.send_user._id,
                to_user: this.currentChatUser._id,
            });
        },
        // 发送消息
        sendMessge() {
            this.$store.state.socketInfo.emit('send_messge', {
                to_user: this.currentChatUser._id,
                send_user: this.send_user._id,
                messge: this.messge
            });
            this.messge = ''
        }
    },
    destroyed() {
        this.$store.state.socketInfo.emit('update_room_msg_read', {
            userId: this.send_user._id,
            roomId: this.roomInfo._id,
        });
    }
};
</script>

<style scoped lang="less">
@import "../../common/less/public.less";

.content {
    position: relative;
    width: 100%;
    height: calc(100vh - 44px);
    background-color: #eeeeee;

    .scroll-Y {
        height: 100%;
        padding-bottom: 110rpx;
        box-sizing: border-box;

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

    .input-content {
        width: 100%;
        height: 100rpx;
        position: fixed;
        left: 0;
        bottom: 0;
        background-color: #eeeeee;
        box-shadow: 1px 1px 1px 1px rgba(0, 0, 0, 0.5);
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 16rpx;
        box-sizing: border-box;

        .send-msg {
        }

        .send-msg {
            flex: 1;
            height: 80rpx;
            margin: 0 20rpx;

            .uni-input {
                width: 100%;
                height: 100%;
                background-color: #fff;
            }
        }

        .other-btn {
            display: flex;
        }
    }
}
</style>

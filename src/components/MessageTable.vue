<template>
    <div>
        {{ messages }}
    </div>
</template>
<script>
import { ALL_MESSAGES } from '../constants/message-query'
import { SUBSCRIPTION_MESSAGE } from '../constants/message-subscription'
// import CREATE_MESSAGE from '../constants/message-mutations'
// import SUBSCRIPTION_MESSAGE from '../constants/message-subscription'
// import gql from 'graphql-tag'

export default {
    name: "MessageTable",
    data: () => ({
        // メッセージ配列
        messages: [],
        // message送信データの初期値
        message: ''
    }),
    apollo: {
        // すべてのメッセージ取得
        messages: ALL_MESSAGES,
        $subscribe: {
            messages: {
                query: SUBSCRIPTION_MESSAGE,
                result (data) {
                    this.messages = data.data.Message.data
                }
            }
        }
    },
}
</script>
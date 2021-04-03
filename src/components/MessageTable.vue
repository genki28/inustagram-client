<template>
    <div>
        {{ messages }}
    </div>
</template>
<script>
import ALL_MESSAGE from '../constants/message-query'
import CREATE_MESSAGE from '../constants/message-mutations'
import SUBSCRIPTION_MESSAGE from '../constants/message-subscription'

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
        messages: gql`
            query messages {
                id
                sendUser
                receiveUser
                message
            }
        `,
        subscribeToMore: {
            Message: gql`
                subscription {
                    mutation

                    data {
                        id
                        sendUser
                        receiveUser
                        message
                    }
                }
            `
        }
    },
}
</script>
<template>
    <div>
        <table>
            <thead>
                <tr>
                    <th>メッセージ</th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="(message, index) in messages" :key="index">
                    <td>{{ message.id }}</td>
                    <td>{{ message.message }}</td>
                    <td>{{ message.sendUser }}さん</td>
                    <td>{{ message.receiveUser }}さん</td>
                </tr>
            </tbody>
        </table>
        <input type="text" name="message" v-model="sendMessage" />
        <button @click="createMessage">送信</button>
    </div>
</template>
<script>
import { ALL_MESSAGES } from '../constants/message-query'
import { SUBSCRIPTION_MESSAGE } from '../constants/message-subscription'
import { CREATE_MESSAGE } from '../constants/message-mutations'
// import CREATE_MESSAGE from '../constants/message-mutations'
// import SUBSCRIPTION_MESSAGE from '../constants/message-subscription'
// import gql from 'graphql-tag'

export default {
    name: "MessageTable",
    data: () => ({
        // メッセージ配列
        messages: [],
        // message送信データの初期値
        // message: ''
        sendMessage: ''
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
    methods: {
        createMessage() {
            this.$apollo.mutate({
                mutation: CREATE_MESSAGE,
                variables: {
                    message: this.sendMessage,
                    sendUser: 1,
                    receiveUser: 2
                }
            }).then((data) => {
                console.log(data)
            }).catch((error) => {
                console.error(error)
            })
        }
    }
}
</script>
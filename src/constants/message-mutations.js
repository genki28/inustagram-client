import gql from 'graphql-tag'

export const CREATE_MESSAGE = gql`
    mutation($message: String, $sendUser: Int, $receiveUser: Int) {
        createMessage(message: $message, sendUser: $sendUser, receiveUser: $receiveUser) {
            success
            responseMessage
            data {
                id
                sendUser
                receiveUser
                message
            }
        }
    }
`
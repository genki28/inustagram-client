import gql from 'graphql-tag'

export const CREATE_MESSAGE = gql`
    mutation($message: String, $sendUser: Number, $receiveUser: Int) {
        createMessage(message: $message, sendUser: $sendUser, receiveUser: $$receiveUser) {
            id
            sendUser
            receiveUser
            message
        }
    }
`
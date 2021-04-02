import gql from 'graphql-tag'

export const SUBSCRIPTION_MESSAGE = gql`
    Message {
        mutation

        data {
            id
            sendUser
            receiveUser
            message
        }
    }
`
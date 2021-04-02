import gql from 'graphql-tag'

export const ALL_MESSAGES = gql`
    query messages {
        id
        sendUser
        receiveUser
        message
    }
`
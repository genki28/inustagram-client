import gql from 'graphql-tag'

export const ALL_MESSAGES = gql`
    query messages {
        messages {
            id
            sendUser
            receiveUser
            message
        }
    }
`
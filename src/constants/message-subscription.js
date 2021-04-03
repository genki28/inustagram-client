import gql from 'graphql-tag'

export const SUBSCRIPTION_MESSAGE = gql`
    subscription {
    Message {
        mutation
        
        data {
        id
        message
        }
    }
    }
`
import gql from 'graphql-tag'

export const ALL_ANIMES = gql`
    query animes {
        id
        title
        hero
    }
`
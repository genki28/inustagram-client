import gql from 'graphql-tag'

export const ALL_ANIMES = gql`
    query animes {
        animes {
            id
            title
            hero
        }
    }
`
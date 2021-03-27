import gql from 'graphql-tag'

// animeの新規追加
export const CREATE_ANIME = gql`
    mutation($title: String, $hero: String) {
        createAnime(title: $title, hero: $hero) {
            id
            title
            hero
        }
    }
`

export const UPDATE_ANIME = gql`
    mutation($animeId: ID!, $title: String, $hero: String) {
        updateAnime(animeId: $animeId, title: $title, hero: $hero) {
            success
            message
            anime {
                id
                title
                hero
            }
        }
    }
`
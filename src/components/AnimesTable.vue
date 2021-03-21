<template>
    <v-container>
        <!-- ツールバー -->
        <v-toolbar flat color="grey lighten-2">
            <v-toolbar-title>アニメ一覧</v-toolbar-title>
        </v-toolbar>

        <!-- データテーブル -->
        <v-data-table
            :headers="headers"
            :items="animes"
            no-data-text="アニメが登録されていません。"
            class="elevation-1"
        >
            <template slot="items" slot-scope="props">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.title }}</td>
                <td>{{ props.item.hero }}</td>
            </template>
        </v-data-table>
    </v-container>
</template>

<script>
    import { ALL_ANIMES } from "../constants/animes-query"
    // import gql from 'graphql-tag'

    export default {
        name: "AnimesTable",
        data: () => ({
            // アニメ情報
            animes: [],
            headers: [
                { text: 'ID', value: 'id' },
                { text: 'タイトル', value: 'title' },
                { text: '主人公', value: 'hero' },
            ],
            // データテーブルの初期ソート
        }),
        apollo: {
            // すべての顧客情報の取得
            animes: ALL_ANIMES
        }
    }
</script>
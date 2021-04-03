<template>
    <v-container>
        <!--入力フォーム-->
        <v-dialog v-model="dialog" max-width="500px">
            <v-card>
                <v-container>
                    <h2 v-if="isCreate">アニメを追加する</h2>
                    <h2 v-if="!isCreate">アニメを更新する</h2>
                    <v-form ref="form" v-model="valid" lazy-validation>
                        <!-- タイトル -->
                        <v-text-field
                            v-model="anime.title"
                            :counter="20"
                            label="タイトル"
                            required
                        ></v-text-field>

                        <!-- 主人公 -->
                        <v-text-field
                            v-model="anime.hero"
                            :rules="nameRules"
                            :counter="20"
                            label="名前"
                            required
                        ></v-text-field>
                    </v-form>

                    <!-- 追加ボタン -->
                    <v-btn
                        v-if="isCreate"
                        :disabled="!valid"
                        @click="createAnime"
                    >
                        追加
                    </v-btn>

                    <!-- 更新ボタン -->
                    <v-btn 
                        v-if="!isCreate"
                        :disabled="!valid"
                        @click="updateAnime"
                    >
                        更新
                    </v-btn>
                    <v-btn @click="clear">
                        クリア
                    </v-btn>
                </v-container>
            </v-card>
        </v-dialog>


        <!-- ツールバー -->
        <v-toolbar flat color="grey lighten-2">
            <v-toolbar-title>アニメ一覧</v-toolbar-title>
            <v-spacer></v-spacer>
            <v-btn color="primary" dark class="mb-2" @click="showDialogNew">新規追加</v-btn>
        </v-toolbar>

        <!-- データテーブル -->
        <!-- <v-data-table
            :headers="headers"
            :items="animes"
            :loading="progress"
            :pagination.sync="pagination"
            no-data-text="アニメが登録されていません。"
            class="elevation-1"
        >
            <v-progress-linear slot="progress" color="blue" indeterminate></v-progress-linear>
            <template slot="items" slot-scope="props">
                <td>{{ props.item.id }}</td>
                <td>{{ props.item.title }}</td>
                <td>{{ props.item.hero }}</td>
                <td class="justify-end layout px-0">
                    <v-btn
                        color="success"
                        small
                        outline
                        flat
                        @click="showDialogUpdate(props.item.id, props.item.title, props.item.hero)"
                    >
                        <v-icon small>
                            edit
                        </v-icon>
                    </v-btn>
                </td>
            </template>
        </v-data-table> -->
        <table>
            <div v-for="anime in animes" :key="anime.id">
                <td>{{ anime.title }}</td>
                <td>{{ anime.hero }}</td>
                <td>{{ anime.id }}</td>
                <td @click="showDialogUpdate(anime.id, anime.title, anime.hero)">更新</td>
                <td @click="deleteAnime(anime.id)">削除</td>
            </div>
            <td></td>
        </table>
    </v-container>
</template>

<script>
import { ALL_ANIMES } from "../constants/animes-query"
import { CREATE_ANIME, UPDATE_ANIME, DELETE_ANIME } from "../constants/animes-mutations"
import gql from 'graphql-tag'

    export default {
        name: "AnimesTable",
        data: () => ({
            // アニメ情報
            animes: [],
            headers: [
                { text: 'ID', value: 'id' },
                { text: 'タイトル', value: 'title' },
                { text: '主人公', value: 'hero' },
                { text: 'ボタン', value: 'action', sortable: false}
            ],
            // データテーブルの初期ソート
            anime: {
                title: '',
                hero: '',
            },
            // バリデーション
            valid: true,
            nameRules: [
                v => !!v || '名前は必須項目です',
                v => (v && v.length <= 20) || '名前は20文字以内で入力してください'
            ],
            // ローディングの表示フラグ
            progress: false,
            // ダイアログの表示フラグ
            dialog: false,
            // 新規・更新フラグ
            isCreate: true,
        }),
        apollo: {
            // すべての顧客情報の取得
            animes: ALL_ANIMES
        },
        methods: {
            createAnime: function () {
                if (this.$refs.form.validate()) {
                    this.progress = true
                    this.$apollo.mutate({
                        mutation: CREATE_ANIME,
                        variables: {
                            title: this.anime.title,
                            hero: this.anime.hero
                        }
                    }).then((data) => {
                        // console.log(data.data.createAnime)
                        this.animes = data.data.createAnime
                        // this.$apollo.queries.animes.fetchMore({
                        //     updateQuery: (previousResult, {fetchMoreResult}) => {
                        //         console.log(fetchMoreResult.animes)
                        //         return {
                        //             animes: fetchMoreResult.animes
                        //         }
                        //     }
                        // })
                        this.dialog = false
                        this.progress = false
                    }).catch((error) => {
                        console.error(error)
                    })
                }
            },
            updateAnime: function() {
                this.progress = true
                this.$apollo.mutate({
                    mutation: UPDATE_ANIME,
                    variables: {
                        animeId: this.anime.id,
                        title: this.anime.title,
                        hero: this.anime.hero,
                    }
                }).then((data) => {
                    this.animes = data.data.updateAnime.anime
                    this.dialog = false
                    this.progress = false
                }).catch((error) => {
                    console.log(JSON.stringify(error, null, 2))
                    console.error(error)
                })
            },
            deleteAnime: function(id) {
                // console.log(id)
                this.progress = true
                this.$apollo.mutate({
                    mutation: DELETE_ANIME,
                    variables: {
                        animeId: id
                    }
                }).then((data) => {
                    // console.log(data)
                    this.animes = data.data.deleteAnime.anime
                    this.dialog = false
                    this.progress = false
                }).catch((error) => {
                    console.log(JSON.stringify(error, null, 2))
                    console.log(error)
                })
            },
            // フォームのクリア
            clear: function() {
                // this.$refs.form.reset()
            },
            // 新規追加ダイアログの表示
            showDialogNew: function () {
                this.clear() // 何をクリアしている???
                this.isCreate = true
                this.dialog = true
            },
            showDialogUpdate: function(id, title, hero) {
                this.anime.id = id
                this.anime.title = title
                this.anime.hero = hero
                this.isCreate = false
                this.dialog = true
            }
        }
    }
</script>
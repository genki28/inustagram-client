import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import { ApolloClient } from 'apollo-client';

import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';
import { split } from "apollo-link";
import { WebSocketLink } from "apollo-link-ws";
import { getMainDefinition } from "apollo-utilities";

Vue.config.productionTip = false
Vue.use(VueApollo)

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql',
  // 将来的に入れる認証
  // headers: {
  //   authorization: `Bearer xxxxx`
  // }
})

// subscriptionで使われるwebsocket通信のエンドポイントを指定
const wsLink = new WebSocketLink({
  uri: "ws://localhost:4000/graphql",
  options: {
    reconnect: true,
    // // 将来的に入れる認証
    // headers: {
    //   authorization: `Bearer xxxxx`
    // }
  }
})

const cache = new InMemoryCache()

// GraphQLのエンドポイントの向き先をクエリの種別で分離する
// ここに参考あります→https://www.apollographql.com/docs/link/composition/#directional-composition
const link = split(
  ({ query }) => {
    // クエリから種別を取得
    const definition = getMainDefinition(query)
    return (
      definition.kind === "OperationDefinition" && 
      definition.operation === "subscription"
    );
  },
  wsLink,
  httpLink
)

const apolloClient = new ApolloClient({
  link,
  cache,
  connectToDevTools: true
})

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

new Vue({
  el: '#app',
  vuetify,
  apolloProvider,
  apollo: {

  },
  render: h => h(App)
}).$mount('#app')

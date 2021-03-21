import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import { ApolloClient } from 'apollo-client';
import { createHttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import VueApollo from 'vue-apollo';

Vue.config.productionTip = false
Vue.use(VueApollo)

// HTTP connection to the API
const httpLink = createHttpLink({
  uri: 'http://localhost:4000/graphql'
})

const cache = new InMemoryCache()

const apolloClient = new ApolloClient({
  link: httpLink,
  cache,
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

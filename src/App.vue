<template>
  <v-app>
    <AnimesTable />
  </v-app>
</template>

<script>
import AnimesTable from '@/components/AnimesTable'
import gql from 'graphql-tag'

export default {
  name: 'App',

  components: {
    AnimesTable
  },

  apollo: {
    books: gql`
      query books {
          books {
            title
            author
          }
    }`
  },

  data: () => ({
    //
  }),
};
</script>

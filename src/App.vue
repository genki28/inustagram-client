<template>
  <v-app>
    <!-- <AnimesTable /> -->
    <MessageTable />
  </v-app>
</template>

<script>
import MessageTable from '@/components/MessageTable'
// import AnimesTable from '@/components/AnimesTable'

export default {
  name: 'App',

  components: {
    // AnimesTable
    MessageTable
  },
  data: () => ({
    //
  }),
};
</script>

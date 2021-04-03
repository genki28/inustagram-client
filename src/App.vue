<template>
  <v-app>
    <MessageTable />
  </v-app>
</template>

<script>
import MessageTable from '@/components/MessageTable'

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

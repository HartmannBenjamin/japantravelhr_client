<template>
  <v-virtual-scroll
      :items="logs"
      height="305"
      item-height="64"
  >
    <template v-slot:default="{ item }">
      <v-list-item :key="item.id" class="logs-content mt-2">
        <v-list-item-avatar size="27" class="mr-3">
          <img :src="item.user.image_url" alt="profile picture">
        </v-list-item-avatar>

        <v-list-item-content>
          {{ item.user.name }} ({{ item.user.email }})
        </v-list-item-content>

        <v-list-item-content>
          {{ item.message }}
        </v-list-item-content>

        <v-list-item-content>
            {{ getDate(item.created_at) }}
        </v-list-item-content>
      </v-list-item>

      <v-divider class="mt-2"></v-divider>
    </template>
  </v-virtual-scroll>
</template>

<script>
  import { formatDate } from "@/services/Functions";

  export default {
    props: {
      logs: {
        type: Array,
        required: true,
      }
    },
    methods: {
      getDate: formatDate
    }
  }
</script>

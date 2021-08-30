<template>
  <v-virtual-scroll
      :items="logs"
      height="242"
      item-height="64"
  >
    <template v-slot:default="{ item }">

      <v-divider></v-divider>
      <div class="mt-0 mt-xl-2">
        <v-list-item :key="item.id" class="logs-content">
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
      </div>
    </template>
  </v-virtual-scroll>
</template>

<script>
import {formatDate} from '@/services/Functions';

export default {
  props: {
    logs: {
      type: Array,
      required: true,
    },
  },
  methods: {
    getDate: formatDate,
  },
};
</script>

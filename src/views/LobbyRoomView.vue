<template>
  <div class="flex flex-col flex-1 items-center justify-center">
    <BaseCard class="flex flex-col gap-4">
      <input v-model="userName" type="text" placeholder="Your name" class="p-2 rounded" />
      <input v-model="roomName" type="text" placeholder="Room name" class="p-2 rounded" />
      <button class="bg-teal-500 hover:bg-teal-600 rounded p-2 text-center" @click="createRoom()">Create a room</button>
    </BaseCard>
  </div>
</template>
<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import RoomService from "../services/room.service.js";

import BaseCard from "../components/BaseCard.vue";

const router = useRouter();

const userName = ref("");
const roomName = ref("");

const createRoom = () => {
  const id = RoomService.createRoom(roomName.value, userName.value);
  router.push(`/rooms/${id}`);
};
</script>

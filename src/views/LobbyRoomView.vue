<template>
  <div class="flex flex-col flex-1 items-center justify-center">
    <BaseCard class="flex flex-col gap-4">
      <input type="text" placeholder="Your name" class="p-2 rounded" />
      <button class="bg-teal-500 hover:bg-teal-600 rounded p-2 text-center" @click="createRoom()">Create a room</button>
    </BaseCard>
  </div>
</template>
<script setup>
import { useRouter } from "vue-router";
import gun from "../services/gun.service.js";

import BaseCard from "../components/BaseCard.vue";

const router = useRouter();

const createRoom = () => {
  const id = crypto.randomUUID();
  gun.get(`rooms`).get(id).put({ id: id, name: "New room" });

  router.push(`/rooms/${id}`);
};
</script>

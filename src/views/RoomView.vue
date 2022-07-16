<template>
  <div class="flex flex-col flex-1 items-center justify-center gap-4">
    <BaseCard v-show="roomStore.room.showVotingBoard === false" class="flex flex-col gap-4">
      <input type="text" placeholder="Ticket" class="p-2 rounded" />
      <button class="bg-teal-500 hover:bg-teal-600 rounded p-2 text-center" @click="roomStore.startVote()">
        Start vote
      </button>
    </BaseCard>
    <BaseCard v-show="roomStore.room.showVotingBoard" class="flex flex-col gap-4">
      <div class="flex flex-row gap-4">
        <template v-for="(value, index) in cards" :key="`card_${index}`">
          <button class="bg-teal-500 hover:bg-teal-600 rounded p-2 text-center" @click="votes.push(value)">
            {{ value }}
          </button>
        </template>
      </div>
      <div class="flex justify-center">
        <button class="bg-teal-500 hover:bg-teal-600 rounded p-2 text-center" @click="roomStore.endVote()">
          End vote
        </button>
      </div>
    </BaseCard>
    <BaseCard v-show="roomStore.room.showResults" class="flex flex-col gap-4 text-center">
      Results
      <br />
      {{ votes }}
    </BaseCard>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import { useRoomStore } from "../stores/room.store.js";

import BaseCard from "../components/BaseCard.vue";

const route = useRoute();
const id = route.params.id;

const roomStore = useRoomStore();

const cards = ["XS", "S", "M", "L", "XL", "🪓", "☕️"];

const votes = ref([]);

onMounted(async () => {
  roomStore.getRoom(id);
});

onUnmounted(() => {
  roomStore.reset();
});
</script>

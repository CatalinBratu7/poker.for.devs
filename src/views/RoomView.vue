<template>
  <div class="flex flex-col flex-1 items-center justify-center gap-4">
    <BaseCard v-if="!isVoting" class="flex flex-col gap-4">
      <input type="text" placeholder="Ticket" class="p-2 rounded" />
      <button
        class="bg-teal-500 hover:bg-teal-600 rounded p-2 text-center"
        @click="
          isVoting = true;
          showResults = false;
          votes = [];
        "
      >
        Start vote
      </button>
    </BaseCard>
    <BaseCard v-if="isVoting" class="flex flex-col gap-4">
      <div class="flex flex-row gap-4">
        <template v-for="(value, index) in cards" :key="`card_${index}`">
          <button class="bg-teal-500 hover:bg-teal-600 rounded p-2 text-center" @click="votes.push(value)">
            {{ value }}
          </button>
        </template>
      </div>
      <div class="flex justify-center">
        <button
          class="bg-teal-500 hover:bg-teal-600 rounded p-2 text-center"
          @click="
            showResults = true;
            isVoting = false;
          "
        >
          End vote
        </button>
      </div>
    </BaseCard>
    <BaseCard v-if="showResults" class="flex flex-col gap-4 text-center">
      Results
      <br />
      {{ votes }}
    </BaseCard>
  </div>
</template>

<script setup>
import { onMounted, onUnmounted, ref } from "vue";
import { useRoute } from "vue-router";
import gun from "../services/gun.service.js";

import BaseCard from "../components/BaseCard.vue";

const route = useRoute();
const id = route.params.id;

const isVoting = ref(false);
const showResults = ref(false);

const cards = ["XS", "S", "M", "L", "XL", "🪓", "☕️"];

const votes = ref([]);

onMounted(async () => {
  gun
    .get("rooms")
    .get(id.toString())
    .on((data) => {
      console.log(data);
    });

  gun
    .get("rooms")
    .get(id.toString())
    .get("users")
    .map()
    .on((data) => {
      console.log(data);
    });
});

onUnmounted(() => {
  gun.get("rooms").get(id.toString()).off();
  gun.get("rooms").get(id.toString()).get("users").off();
});
</script>

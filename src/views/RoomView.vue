<template>[Building]</template>

<script setup>
import { onMounted, onUnmounted } from "vue";
import { useRoute } from "vue-router";
import gun from "../services/gun.service.js";

const route = useRoute();
const id = route.params.id;

onMounted(async () => {
  gun
    .get("rooms")
    .get(id.toString())
    .on((data) => {
      console.log(data);
    });
});

onUnmounted(() => {
  gun.get("rooms").get(id.toString()).off();
});
</script>

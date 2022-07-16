import { defineStore } from "pinia";

export const useRoomStore = defineStore("room", {
  state: () => ({
    room: {},
  }),
});

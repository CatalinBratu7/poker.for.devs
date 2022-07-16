import { defineStore } from "pinia";
import gun from "../services/gun.service";

export const useRoomStore = defineStore("room", {
  state: () => ({
    room: {},
    users: [],
  }),
  actions: {
    startVote() {
      gun.get("rooms").get(this.room.id).get("showVotingBoard").put(true);
      gun.get("rooms").get(this.room.id).get("showResults").put(false);
    },
    endVote() {
      gun.get("rooms").get(this.room.id).get("showVotingBoard").put(false);
      gun.get("rooms").get(this.room.id).get("showResults").put(true);
    },
    reset() {
      const id = this.room.id;

      this.$reset();

      if (id) {
        gun.get("rooms").get(id.toString()).off();
        gun.get("rooms").get(id.toString()).get("users").map().off();
      }
    },
  },
});

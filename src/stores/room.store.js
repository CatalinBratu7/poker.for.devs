import { defineStore } from "pinia";
import gun from "../services/gun.service";

export const useRoomStore = defineStore("room", {
  state: () => ({
    room: {},
    users: [],
  }),
  actions: {
    getRoom(id) {
      gun
        .get("rooms")
        .get(id.toString())
        .on((room) => {
          this.room = room;
        });

      gun
        .get("rooms")
        .get(id.toString())
        .get("users")
        .map()
        .on((user) => {
          const index = this.users.findIndex((u) => u.id === user.id);
          if (index === -1) {
            this.users.push(user);
          } else {
            this.users[index] = user;
          }
        });
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

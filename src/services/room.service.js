import { useRoomStore } from "../stores/room.store.js";
import gun from "./gun.service.js";

const roomStore = useRoomStore();

export const getRoom = (id) => {
  gun
    .get("rooms")
    .get(id)
    .on((room) => {
      roomStore.$patch({
        room,
      });
    });

  gun
    .get("rooms")
    .get(id.toString())
    .get("users")
    .map()
    .on((user) => {
      roomStore.$patch((state) => {
        const index = state.users.findIndex((u) => u.id === user.id);
        if (index === -1) {
          state.users.push(user);
        } else {
          state.users[index] = user;
        }
      });
    });
};

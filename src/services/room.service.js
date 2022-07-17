import { useRoomStore } from "../stores/room.store.js";
import gun from "./gun.service.js";

const roomStore = useRoomStore();

const getRoom = (id) => {
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

const createRoom = (roomName, administratorName) => {
  const roomId = crypto.randomUUID();

  gun.get(`rooms`).get(roomId).put({
    id: roomId,
    name: roomName,
    showVotingBoard: false,
    showResults: false,
  });

  const administrator = {
    id: crypto.randomUUID(),
    name: administratorName,
    admin: true,
  };

  gun.get(`rooms`).get(roomId).get(`users`).get(administrator.id).put(administrator);

  roomStore.$patch((state) => {
    state.userId = administrator.id;
  });

  return roomId;
};

export default {
  getRoom,
  createRoom,
};

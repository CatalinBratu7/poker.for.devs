import Gun from "gun";

const gun = Gun({ peers: ["https://gun-manhattan.herokuapp.com/gun", "https://gunjs.herokuapp.com/gun"] });

export default gun;

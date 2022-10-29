export const MAIN_ROOM = "W6S2"; // 主房间
export const RIGHT_ROOM = "W5S2"; // 右房间
export const ALL_ROOM_LIST = [MAIN_ROOM, RIGHT_ROOM] as const;
// export
export const SOURCES = Game.rooms[MAIN_ROOM].find(FIND_SOURCES);
export const SPAWN1 = Game.spawns.Spawn1;

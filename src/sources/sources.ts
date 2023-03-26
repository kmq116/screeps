export const MAIN_ROOM = "W12S8"; // 主房间
export const RIGHT_ROOM = null; // 右房间
export const ALL_ROOM_LIST = [MAIN_ROOM, RIGHT_ROOM].filter(Boolean) as string[];
// export
export const SOURCES = (() => {
  const sourceInRoom = Game.rooms[MAIN_ROOM]?.find(FIND_SOURCES);
  if (sourceInRoom && sourceInRoom.length) {
    return sourceInRoom;
  } else {
    console.log("主房间不存在或者房间内没有矿物资源");
    return [];
  }
})();

export const SPAWN1 = Game.spawns.Spawn1;

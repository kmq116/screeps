// 全部的 spawns
const myAllSpawns = Object.values(Game.spawns);
// 用第一个 spawn 作 主房间
const myMainSpawn = myAllSpawns[0];
// 所有房间的 name
const myRooms = myAllSpawns.map(spawn => spawn.room.name);
console.log(myRooms);

export const MAIN_ROOM = myMainSpawn.room.name; // 主房间
export const ALL_ROOM_LIST = myRooms;
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

import { ROLE, getRoleTotalNum } from "role/utils";
import { MAIN_ROOM } from "sources/sources";
import { creepConfig } from "../role/roleConfig";

function getCreepName(role: ROLE): string {
  return `${role}-${Game.time}`;
}

export function logByGameTick(content: string, tick = 3): void {
  if (Game.time % tick === 0) {
    console.log(content);
  }
}
export function spawnCreep(): void {
  const SPAWN1 = Object.values(Game.spawns)[0];
  const CREEP_NUMBER = getRoleTotalNum();
  if (_.sum(_.values(getRoleTotalNum())) === 0) {
    Game.notify("所有的 creep 都寄了，建议上线看看情况", 0);
  }
  const containers = Game.rooms[MAIN_ROOM].find<StructureContainer>(FIND_STRUCTURES, {
    filter: i => i.structureType === STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] > 0
  });
  const spawnRoles = [ROLE.harvester, ROLE.carrier, ROLE.builder, ROLE.upgrader, ROLE.repairer, ROLE.attacker];
  const waitedSpawnRole = spawnRoles.find(role => CREEP_NUMBER[role] < creepConfig[ROLE.harvester].max);
  if (waitedSpawnRole) {
    logByGameTick(`${waitedSpawnRole}: ${CREEP_NUMBER[waitedSpawnRole]}`);
    const spawnFn = () => {
      SPAWN1.spawn({
        body: creepConfig[waitedSpawnRole].body,
        name: getCreepName(waitedSpawnRole),
        opt: {
          memory: {
            role: waitedSpawnRole,
            room: MAIN_ROOM,
            working: false
          }
        }
      });
    };
    // 不等于收集者的时候，无脑生产
    if (waitedSpawnRole === ROLE.harvester) {
      spawnFn();
    } else if (containers.length >= 1) {
      spawnFn();
    }
  } else {
    console.log("不需要生产，creep 配置是足够的");
    const existEnergy = Game.rooms[MAIN_ROOM].energyAvailable;
    const energyCapacity = Game.rooms[MAIN_ROOM].energyCapacityAvailable;
    console.log(existEnergy, energyCapacity);
    console.log("storage energy", Game.rooms[MAIN_ROOM].storage?.store?.energy);
    const Storage = Game.rooms[MAIN_ROOM].storage;
    if (
      containers.reduce((acc, cur) => {
        return acc + cur.store[RESOURCE_ENERGY];
      }, 0) > 3000 &&
      existEnergy === energyCapacity &&
      Storage &&
      Storage?.store?.energy > 1e5
    ) {
      // 能量满了，就创建升级的爬虫
      SPAWN1.spawn({
        body: creepConfig[ROLE.builder].body,
        name: getCreepName(ROLE.builder),
        opt: {
          memory: {
            role: ROLE.builder,
            room: MAIN_ROOM,
            working: false
          }
        }
      });
    }
  }
}

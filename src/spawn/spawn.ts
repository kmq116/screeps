import { MAIN_ROOM, SOURCES, SPAWN1 } from "sources/sources";
import { ROLE } from "role/utils";
import { creepConfig } from "../role/roleConfig";

// function generateCreep(spawn: StructureSpawn, role: ROLE): string | undefined {
//   const body = creepConfig[role].body;
//   const name = `${role}-${Game.time}`;
//   const result = spawn.spawnCreep(body, name, { memory: { role,room:MAIN_ROOM,working } });
//   if (result === OK) {
//     return name;
//   }
//   return undefined;
// }

function getCreepName(role: ROLE): string {
  return `${role}-${Game.time}`;
}

export function spawnCreep(): void {
  const harvesters = _.filter(Game.creeps, creep => creep.memory.role === ROLE.harvester);
  const upgraders = _.filter(Game.creeps, creep => creep.memory.role === ROLE.upgrader);
  const builders = _.filter(Game.creeps, creep => creep.memory.role === ROLE.builder);
  const repairers = _.filter(Game.creeps, creep => creep.memory.role === ROLE.repairer);
  const carriers = _.filter(Game.creeps, creep => creep.memory.role === ROLE.carrier);
  const containers = _.filter(Game.structures, s => s.structureType === STRUCTURE_CONTAINER);

  console.log(harvesters.length, "harvesters");
  console.log(upgraders.length, "upgraders");
  console.log(builders.length, "builders");
  console.log(repairers.length, "repairers");
  console.log(carriers.length, "carriers");

  //  只有容器数量大于 2 的时候才制造搬运的 否则不浪费能量去搬运
  if (carriers.length < creepConfig[ROLE.carrier].max && containers.length >= 2) {
    SPAWN1.spawnCreep(creepConfig[ROLE.carrier].body, getCreepName(ROLE.carrier), {
      memory: {
        role: ROLE.carrier,
        room: MAIN_ROOM,
        working: false
      }
    });
    // 容器数小于 2 的话一直生产采矿的
  } else if (harvesters.length < creepConfig[ROLE.harvester].max || containers.length <= 2) {
    const sourceId = SOURCES[0]?.id;
    const result = SPAWN1.spawnCreep(creepConfig[ROLE.harvester].body, getCreepName(ROLE.harvester), {
      memory: {
        role: ROLE.harvester,
        room: MAIN_ROOM,
        working: false,
        sourceId
      }
    });
    if (result === ERR_NOT_ENOUGH_ENERGY) {
      console.log("没有足够的能量 尝试孵化最小 harvester");
      SPAWN1.spawnCreep([WORK, CARRY, MOVE], getCreepName(ROLE.harvester), {
        memory: {
          role: ROLE.harvester,
          room: MAIN_ROOM,
          working: false,
          sourceId
        }
      });
    }
  } else if (upgraders.length < creepConfig[ROLE.upgrader].max) {
    SPAWN1.spawnCreep(creepConfig[ROLE.upgrader].body, getCreepName(ROLE.upgrader), {
      memory: { role: ROLE.upgrader, room: MAIN_ROOM, working: false }
    });
  } else if (builders.length < creepConfig[ROLE.builder].max) {
    SPAWN1.spawnCreep(creepConfig[ROLE.builder].body, getCreepName(ROLE.builder), {
      memory: { role: ROLE.builder, room: MAIN_ROOM, working: false }
    });
  } else if (repairers.length < creepConfig[ROLE.repairer].max) {
    SPAWN1.spawnCreep(creepConfig[ROLE.repairer].body, getCreepName(ROLE.repairer), {
      memory: { role: ROLE.repairer, room: MAIN_ROOM, working: false }
    });
  } else if (upgraders.length < 10) {
    SPAWN1.spawnCreep(creepConfig[ROLE.upgrader].body, getCreepName(ROLE.upgrader), {
      memory: { role: ROLE.upgrader, room: MAIN_ROOM, working: false }
    });
  }
}

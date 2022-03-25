import { ROLE } from "role/utils";
import { MAIN_ROOM, SOURCES, SPAWN1 } from "sources/sources";
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

export function spawnCreep() {
  const harvesters = _.filter(Game.creeps, creep => creep.memory.role === ROLE.harvester);
  const upgraders = _.filter(Game.creeps, creep => creep.memory.role === ROLE.upgrader);
  const builders = _.filter(Game.creeps, creep => creep.memory.role === ROLE.builder);
  const repairers = _.filter(Game.creeps, creep => creep.memory.role === ROLE.repairer);
  const carriers = _.filter(Game.creeps, creep => creep.memory.role === ROLE.carrier);
  if (carriers.length < creepConfig[ROLE.carrier].max) {
    SPAWN1.spawnCreep(creepConfig[ROLE.carrier].body, getCreepName(ROLE.carrier), {
      memory: {
        role: ROLE.carrier,
        room: MAIN_ROOM,
        working: false
      }
    });
  } else if (harvesters.length < creepConfig[ROLE.harvester].max) {
    const result = SPAWN1.spawnCreep(creepConfig[ROLE.harvester].body, getCreepName(ROLE.harvester), {
      memory: {
        role: ROLE.harvester,
        room: MAIN_ROOM,
        working: false,
        sourceId: SOURCES.length === 1 ? SOURCES[0].id : Math.random() > 0.5 ? SOURCES[0].id : SOURCES[1].id
      }
    });
    if (result === ERR_NOT_ENOUGH_ENERGY) {
      console.log("没有足够的能量 尝试孵化最小 harvester");
      const a = SPAWN1.spawnCreep([WORK, CARRY, MOVE], getCreepName(ROLE.harvester), {
        memory: {
          role: ROLE.harvester,
          room: MAIN_ROOM,
          working: false,
          sourceId: SOURCES.length === 1 ? SOURCES[0].id : Math.random() > 0.5 ? SOURCES[0].id : SOURCES[1].id
        }
      });
      console.log(a);
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
  }
}

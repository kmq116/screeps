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
  const creepsTotalOfTypes = _.reduce(
    Game.creeps,
    (acc, cur) => {
      console.log(cur.memory.role);
      return { ...acc, [cur.memory.role]: acc[cur.memory.role] + 1 };
    },
    {
      harvester: 0,
      upgrader: 0,
      builder: 0,
      repairer: 0,
      carrier: 0
    } as Record<ROLE, number>
  );

  if (creepsTotalOfTypes.carrier < creepConfig[ROLE.carrier].max) {
    SPAWN1.spawnCreep(creepConfig[ROLE.carrier].body, getCreepName(ROLE.carrier), {
      memory: {
        role: ROLE.carrier,
        room: MAIN_ROOM,
        working: false
      }
    });
  } else if (creepsTotalOfTypes.harvester < creepConfig[ROLE.harvester].max) {
    const result = SPAWN1.spawnCreep(creepConfig[ROLE.harvester].body, getCreepName(ROLE.harvester), {
      memory: {
        role: ROLE.harvester,
        room: MAIN_ROOM,
        working: false,
        sourceId: SOURCES.length === 1 ? SOURCES[0].id : Math.random() > 0.5 ? SOURCES[0].id : SOURCES[1].id
      }
    });
    if (result === ERR_NOT_ENOUGH_ENERGY) {
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
  } else if (creepsTotalOfTypes.upgrader < creepConfig[ROLE.upgrader].max) {
    SPAWN1.spawnCreep(creepConfig[ROLE.upgrader].body, getCreepName(ROLE.upgrader), {
      memory: { role: ROLE.upgrader, room: MAIN_ROOM, working: false }
    });
  } else if (creepsTotalOfTypes.builder < creepConfig[ROLE.builder].max) {
    SPAWN1.spawnCreep(creepConfig[ROLE.builder].body, getCreepName(ROLE.builder), {
      memory: { role: ROLE.builder, room: MAIN_ROOM, working: false }
    });
  } else if (creepsTotalOfTypes.repairer < creepConfig[ROLE.repairer].max) {
    SPAWN1.spawnCreep(creepConfig[ROLE.repairer].body, getCreepName(ROLE.repairer), {
      memory: { role: ROLE.repairer, room: MAIN_ROOM, working: false }
    });
  } else if (creepsTotalOfTypes.upgrader < 10) {
    SPAWN1.spawnCreep(creepConfig[ROLE.upgrader].body, getCreepName(ROLE.upgrader), {
      memory: { role: ROLE.upgrader, room: MAIN_ROOM, working: false }
    });
  }
}

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

const IS_SHOW_LOG = true;
export function spawnCreep(): void {
  const { harvester, upgrader, builder, repairer, carrier } = _.reduce(
    Game.creeps,
    (sum, creep) => {
      return { ...sum, [creep.memory.role]: sum[creep.memory.role] + 1 };
    },
    {
      harvester: 0,
      upgrader: 0,
      builder: 0,
      repairer: 0,
      carrier: 0
    }
  );
  const containers = Game.rooms[MAIN_ROOM].find(FIND_STRUCTURES, {
    filter: i => i.structureType === STRUCTURE_CONTAINER
    // && i.store[RESOURCE_ENERGY] > 0
  });
  if (Game.time % 2 === 0) {
    console.log(harvester, "harvesters");
    console.log(upgrader, "upgraders");
    console.log(builder, "builders");
    console.log(repairer, "repairers");
    console.log(carrier, "carriers");
    console.log(containers.length, "containers");
  }

  //  只有容器数量大于 2 的时候才制造搬运的 否则不浪费能量去搬运
  if (carrier < creepConfig[ROLE.carrier].max && containers.length >= 2) {
    SPAWN1.spawnCreep(creepConfig[ROLE.carrier].body, getCreepName(ROLE.carrier), {
      memory: {
        role: ROLE.carrier,
        room: MAIN_ROOM,
        working: false
      }
    });
    // 容器数小于 2 的话一直生产采矿的
  } else if (harvester < creepConfig[ROLE.harvester].max || containers.length < 2) {
    const sourceId = SOURCES[0]?.id;
    // const result = SPAWN1.spawnCreep(creepConfig[ROLE.harvester].body, getCreepName(ROLE.harvester), {
    //   memory: {
    //     role: ROLE.harvester,
    //     room: MAIN_ROOM,
    //     working: false,
    //     sourceId
    //   }
    // });
    // if (result === ERR_NOT_ENOUGH_ENERGY) {
    SPAWN1.spawnCreep([WORK, CARRY, MOVE], getCreepName(ROLE.harvester), {
      memory: {
        role: ROLE.harvester,
        room: MAIN_ROOM,
        working: false,
        sourceId
      }
    });

    // }
  } else if (upgrader < creepConfig[ROLE.upgrader].max) {
    SPAWN1.spawnCreep(creepConfig[ROLE.upgrader].body, getCreepName(ROLE.upgrader), {
      memory: { role: ROLE.upgrader, room: MAIN_ROOM, working: false }
    });
  } else if (builder < creepConfig[ROLE.builder].max) {
    SPAWN1.spawnCreep(creepConfig[ROLE.builder].body, getCreepName(ROLE.builder), {
      memory: { role: ROLE.builder, room: MAIN_ROOM, working: false }
    });
  } else if (repairer < creepConfig[ROLE.repairer].max) {
    SPAWN1.spawnCreep(creepConfig[ROLE.repairer].body, getCreepName(ROLE.repairer), {
      memory: { role: ROLE.repairer, room: MAIN_ROOM, working: false }
    });
  } else if (upgrader < 10) {
    SPAWN1.spawnCreep(creepConfig[ROLE.upgrader].body, getCreepName(ROLE.upgrader), {
      memory: { role: ROLE.upgrader, room: MAIN_ROOM, working: false }
    });
  }
}

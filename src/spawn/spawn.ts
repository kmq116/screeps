import { MAIN_ROOM, SOURCES, SPAWN1 } from "sources/sources";
import { ROLE, getRoleTotalNum } from "role/utils";
import { creepConfig } from "../role/roleConfig";

function getCreepName(role: ROLE): string {
  return `${role}-${Game.time}`;
}

function _spawn(
  spawn: StructureSpawn,
  options: {
    body: BodyPartConstant[];
    name: string;
    opt: {
      memory: {
        role: ROLE;
        room: string;
        working: boolean;
        sourceId?: string;
      };
    };
  }
) {
  const spawnResult = spawn.spawnCreep(options.body, options.name, options.opt);

  if (spawnResult === ERR_NOT_ENOUGH_ENERGY) {
    return spawn.spawnCreep(creepConfig[options.opt.memory.role].minBody, options.name, {
      memory: {
        role: options.opt.memory.role,
        room: options.opt.memory.room,
        working: false,
        sourceId: options.opt.memory.sourceId
      }
    });
  }
  return spawnResult;
}

export function spawnCreep(): void {
  const { harvester, upgrader, builder, repairer, carrier } = getRoleTotalNum();
  const containers = Game.rooms[MAIN_ROOM].find<StructureContainer>(FIND_STRUCTURES, {
    filter: i => i.structureType === STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] > 0
  });

  // 容器数小于 2 的话一直生产采矿的
  if (harvester < creepConfig[ROLE.harvester].max) {
    const sourceId = SOURCES[0]?.id;
    // SPAWN1.spawn
    SPAWN1.spawn({
      body: creepConfig[ROLE.harvester].body,
      name: getCreepName(ROLE.harvester),
      opt: {
        memory: {
          role: ROLE.harvester,
          room: MAIN_ROOM,
          working: false,
          sourceId
        }
      }
    });
  }
  //  只有容器数量大于 1 的时候才制造搬运的 否则不浪费能量去搬运
  else if (carrier < creepConfig[ROLE.carrier].max && containers.length >= 1) {
    SPAWN1.spawn({
      body: creepConfig[ROLE.carrier].body,
      name: getCreepName(ROLE.carrier),
      opt: {
        memory: {
          role: ROLE.carrier,
          room: MAIN_ROOM,
          working: false
        }
      }
    });
  } else if (upgrader < creepConfig[ROLE.upgrader].max) {
    SPAWN1.spawn({
      body: creepConfig[ROLE.upgrader].body,
      name: getCreepName(ROLE.upgrader),
      opt: {
        memory: {
          role: ROLE.upgrader,
          room: MAIN_ROOM,
          working: false
        }
      }
    });
  } else if (builder < creepConfig[ROLE.builder].max) {
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
  } else if (repairer < creepConfig[ROLE.repairer].max) {
    SPAWN1.spawn({
      body: creepConfig[ROLE.repairer].body,
      name: getCreepName(ROLE.repairer),
      opt: {
        memory: {
          role: ROLE.repairer,
          room: MAIN_ROOM,
          working: false
        }
      }
    });
  } else if (upgrader < 3) {
    SPAWN1.spawn({
      body: creepConfig[ROLE.upgrader].body,
      name: getCreepName(ROLE.upgrader),
      opt: {
        memory: {
          role: ROLE.upgrader,
          room: MAIN_ROOM,
          working: false
        }
      }
    });
  } else {
    if (
      containers.reduce((acc, cur) => {
        return acc + cur.store[RESOURCE_ENERGY];
      }, 0) > 3500
    ) {
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
    console.log("else");
  }
}

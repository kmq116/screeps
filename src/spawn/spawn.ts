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

  //  如果一个孵化能量不够，并且没有这个类型的 creep 最小化孵化一个
  if (spawnResult === ERR_NOT_ENOUGH_ENERGY && getRoleTotalNum()[options.opt.memory.role] < 1) {
    return spawn.spawnCreep([WORK, CARRY, MOVE], options.name, {
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

  //  只有容器数量大于 2 的时候才制造搬运的 否则不浪费能量去搬运
  if (carrier < creepConfig[ROLE.carrier].max && containers.length >= 1) {
    _spawn(SPAWN1, {
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

    // 容器数小于 2 的话一直生产采矿的
  } else if (harvester < creepConfig[ROLE.harvester].max || containers.length < 2) {
    const sourceId = SOURCES[0]?.id;
    _spawn(SPAWN1, {
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
  } else if (upgrader < creepConfig[ROLE.upgrader].max) {
    _spawn(SPAWN1, {
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
    _spawn(SPAWN1, {
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
    _spawn(SPAWN1, {
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
    _spawn(SPAWN1, {
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
      _spawn(SPAWN1, {
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
    }
    console.log("啥也不是");
  }
}

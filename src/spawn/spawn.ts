import { MAIN_ROOM, SOURCES, SPAWN1 } from "sources/sources";
import { ROLE, getRoleTotalNum } from "role/utils";
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
  const { harvester, upgrader, builder, repairer, carrier } = getRoleTotalNum();
  const containers = Game.rooms[MAIN_ROOM].find<StructureContainer>(FIND_STRUCTURES, {
    filter: i => i.structureType === STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] > 0
  });
  if (carrier < 1) {
    console.log("刚需 carrier 小于 1 了");
    SPAWN1.spawn({
      body: creepConfig[ROLE.carrier].minBody,
      name: getCreepName(ROLE.carrier),
      opt: {
        memory: {
          role: ROLE.carrier,
          room: MAIN_ROOM,
          working: false
        }
      }
    });
    return;
  }

  if (harvester < 2) {
    console.log("刚需 harvester 小于 2 了");
    const sourceId = SOURCES[0]?.id;
    SPAWN1.spawn({
      body: creepConfig[ROLE.harvester].minBody,
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
    return;
  }

  // 容器数小于 2 的话一直生产采矿的
  if (harvester < creepConfig[ROLE.harvester].max) {
    logByGameTick(`harvester: ${harvester}`);
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
    logByGameTick(`carrier: ${carrier}`);
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
    logByGameTick(`upgrader: ${upgrader}`);
    console.log("升级");

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
    logByGameTick(`builder: ${builder}`);
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
    logByGameTick(`repairer: ${repairer}`);
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
    logByGameTick(`upgrader: ${upgrader}`);
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
    logByGameTick(`不知道干什么可以把村口大粪挑了 hhhh: 尝试生产 builder`);
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
  }
}

import { MAIN_ROOM, SOURCES } from "sources/sources";
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
  const SPAWN1 = Object.values(Game.spawns)[0];
  const { harvester, upgrader, builder, repairer, carrier } = getRoleTotalNum();
  const { explorerHarvester, explorerCarrier, reserveController } = getRoleTotalNum();
  if (_.sum(_.values(getRoleTotalNum())) === 0) {
    Game.notify("所有的 creep 都寄了，建议上线看看情况", 0);
  }
  const containers = Game.rooms[MAIN_ROOM].find<StructureContainer>(FIND_STRUCTURES, {
    filter: i => i.structureType === STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] > 0
  });

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
  } else if (explorerHarvester < creepConfig[ROLE.explorerHarvester].max) {
    SPAWN1.spawn({
      body: creepConfig[ROLE.explorerHarvester].body,
      name: getCreepName(ROLE.explorerHarvester),
      opt: {
        memory: {
          role: ROLE.explorerHarvester,
          room: "W5S2",
          working: false
        }
      }
    });
  } else if (explorerCarrier < creepConfig[ROLE.explorerCarrier].max) {
    SPAWN1.spawn({
      body: creepConfig[ROLE.explorerCarrier].body,
      name: getCreepName(ROLE.explorerCarrier),
      opt: {
        memory: {
          role: ROLE.explorerCarrier,
          room: "W5S2",
          working: false
        }
      }
    });
  } else if (reserveController < creepConfig[ROLE.reserveController].max) {
    SPAWN1.spawn({
      body: creepConfig[ROLE.reserveController].body,
      name: getCreepName(ROLE.reserveController),
      opt: {
        memory: {
          role: ROLE.reserveController,
          room: "W5S2",
          working: false,
          sourceId: "5bbcac9a9099fc012e635d27"
        }
      }
    });
  } else {
    const existEnergy = Game.rooms[MAIN_ROOM].energyAvailable;
    const energyCapacity = Game.rooms[MAIN_ROOM].energyCapacityAvailable;

    if (
      containers.reduce((acc, cur) => {
        return acc + cur.store[RESOURCE_ENERGY];
      }, 0) > 3000 &&
      existEnergy === energyCapacity &&
      _.sum(_.values(getRoleTotalNum())) + _.sum(_.values(getRoleTotalNum())) <= 30
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

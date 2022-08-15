import { MAIN_ROOM, SOURCES } from "./sources";
import { ROLE } from "role/utils";

/**
 * 均匀分配 sources id 到 creeps
 */
function averageHarvesterSourceId() {
  const harvesters = _.filter(Game.creeps, creep => creep.memory.role === ROLE.harvester);
  const sourceId = SOURCES.length > 1 ? SOURCES[1].id : SOURCES[0].id;
  harvesters.forEach((creep, index) => {
    if (index > harvesters.length / 2 - 1) {
      creep.memory.sourceId = sourceId;
    } else {
      creep.memory.sourceId = SOURCES[0].id;
    }
  });
}

function averageCarrierSourceId(): void {
  const targets: StructureContainer[] = Game.rooms[MAIN_ROOM].find<StructureContainer>(FIND_STRUCTURES, {
    filter: i => i.structureType === STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] > 0
  });

  const sourceId = targets.length > 1 ? targets[1]?.id : targets[0]?.id;
  const list = _.filter(Game.creeps, creep => creep.memory.role === ROLE.carrier);
  const list1 = _.filter(Game.creeps, creep => creep.memory.role === ROLE.builder);
  list.forEach((creep, index) => {
    if (index > list.length / 2 - 1) {
      creep.memory.sourceId = sourceId;
    } else {
      creep.memory.sourceId = targets[0]?.id;
    }
  });
  list1.forEach((creep, index) => {
    if (index > list.length / 2 - 1) {
      creep.memory.sourceId = sourceId;
    } else {
      creep.memory.sourceId = targets[0]?.id;
    }
  });
}
export function averageSourceId(): void {
  averageHarvesterSourceId();
  averageCarrierSourceId();
}

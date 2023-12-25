import { SOURCES } from "./sources";
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

export function averageSourceId(): void {
  averageHarvesterSourceId();
}

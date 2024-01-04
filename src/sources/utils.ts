import { ROLE } from "role/utils";
import { SOURCES } from "./sources";

/**
 * 均匀分配 sources id 到 creeps
 */
function averageHarvesterSourceId() {
  // 获取所有的 harvesters
  const harvesters = _.filter(Game.creeps, creep => creep.memory.role === ROLE.harvester);
  harvesters.forEach((creep, index) => {
    // 有多少个source 就给 creep 分配，如果已经分配过，就不再分配
    if (!creep.memory.sourceId) {
      creep.memory.sourceId = SOURCES[index].id || SOURCES[0].id;
    }
  });
}

export function averageSourceId(): void {
  averageHarvesterSourceId();
}

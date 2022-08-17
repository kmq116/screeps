import { log } from "console";
import { MAIN_ROOM } from "sources/sources";
import { carrier } from "./carrier";
import { creepConfigs } from "./creepConfig";
import { ROLE } from "./utils";

export const explorerCarrier = (
  sourceId?: string
): {
  target(creep: Creep): void;
  source(creep: Creep): void;
} => ({
  target(creep: Creep) {
    // 不在主房间 返回主房间
    if (creep.room.name !== MAIN_ROOM) {
      creep.moveTo(new RoomPosition(48, 24, MAIN_ROOM));
    } else {
      // carrier().target(creep);
      const container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: s => s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 0
      });
      if (container) {
        creep.creepTransfer(container, RESOURCE_ENERGY);
      }
    }
  },
  source(creep: Creep) {
    if (creep.room.name !== creep.memory.room) {
      creep.moveTo(new RoomPosition(32, 31, creep.memory.room));
      return;
    }
    const source = Game.getObjectById<Source>("5bbcac9a9099fc012e635d29");
    if (!source) {
      console.log("没有找到指定的 source");
      return;
    }
    const droppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
      filter: resource => resource.resourceType === RESOURCE_ENERGY
    });

    if (droppedEnergy) {
      if (creep.pickup(droppedEnergy) === ERR_NOT_IN_RANGE) {
        creep.moveTo(droppedEnergy);
      }
    }
  }
});

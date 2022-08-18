import { upgrader } from "./upgrader";

export const builder = (
  sourceId?: string
): {
  target(creep: Creep): void;
  source(creep: Creep): void;
} => ({
  target(creep: Creep) {
    const targets = creep.pos.findClosestByPath(FIND_CONSTRUCTION_SITES, {
      filter: s =>
        s.structureType === STRUCTURE_ROAD ||
        s.structureType === STRUCTURE_CONTAINER ||
        s.structureType === STRUCTURE_EXTENSION ||
        s.structureType === STRUCTURE_TOWER ||
        s.structureType === STRUCTURE_STORAGE ||
        s.structureType === STRUCTURE_WALL ||
        s.structureType === STRUCTURE_RAMPART
    });
    if (targets) {
      creep.creepBuild(targets);
    } else {
      // 没事干可以去升级控制器
      upgrader("").target(creep);
    }
  },
  source(creep: Creep) {
    if (sourceId) {
      const source = Game.getObjectById<StructureContainer>(sourceId);
      if (source) creep.creepWithdraw(source, RESOURCE_ENERGY);
    } else {
      const target = creep.room.find(FIND_STRUCTURES, {
        filter: structure => structure.structureType === STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0
      })[0];
      if (target) creep.creepWithdraw(target, RESOURCE_ENERGY);
    }
  }
});

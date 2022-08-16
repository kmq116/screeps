export const carrier = (
  sourceId?: string
): {
  target(creep: Creep): void;
  source(creep: Creep): void;
} => ({
  target(creep: Creep) {
    creep.say("📦");
    if (creep.isEnergyEmpty()) creep.memory.working = false;
    // 优先补满 spawn 和 extensions
    const spawnOrExtension = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: structure => {
        return (
          (structure.structureType === STRUCTURE_EXTENSION ||
            structure.structureType === STRUCTURE_SPAWN ||
            structure.structureType === STRUCTURE_TOWER) &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        );
      }
    });

    if (spawnOrExtension) {
      creep.creepTransfer(spawnOrExtension, RESOURCE_ENERGY);
    }
  },
  source(creep: Creep) {
    const target = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: structure => {
        return structure.structureType === STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 200;
      }
    });

    if (target) creep.creepWithdraw(target, RESOURCE_ENERGY);
  }
});

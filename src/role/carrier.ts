export const carrier = (
  sourceId?: string
): {
  target(creep: Creep): void;
  source(creep: Creep): void;
} => ({
  target(creep: Creep) {
    creep.say("📦");
    // 优先补满 spawn 和 extensions
    const spawnOrExtension = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: structure => {
        return (
          (structure.structureType === STRUCTURE_SPAWN ||
            structure.structureType === STRUCTURE_EXTENSION ||
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
    const structure = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: s => {
        return s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 50;
      }
    });
    const droppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
      filter: resource => resource.resourceType === RESOURCE_ENERGY
    });
    if (droppedEnergy && droppedEnergy.amount >= creep.store.getCapacity() / 2) {
      if (creep.pickup(droppedEnergy) === ERR_NOT_IN_RANGE) {
        creep.moveTo(droppedEnergy);
      }
      return;
    }
    if (structure) creep.creepWithdraw(structure, RESOURCE_ENERGY);
  }
});

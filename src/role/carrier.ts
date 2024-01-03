export const carrier = (): {
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
    } else {
      const storage = creep.pos.findClosestByPath(FIND_STRUCTURES, {
        filter: s => s.structureType === STRUCTURE_STORAGE
      });
      if (storage) {
        creep.creepTransfer(storage, RESOURCE_ENERGY);
      }
    }
  },
  source(creep: Creep) {
    const droppedEnergy = creep.pos.findClosestByRange(FIND_DROPPED_RESOURCES, {
      filter: resource => resource.resourceType === RESOURCE_ENERGY
    });
    if (droppedEnergy && droppedEnergy.amount >= creep.store.getCapacity() / 2) {
      if (creep.pickup(droppedEnergy) === ERR_NOT_IN_RANGE) {
        creep.moveTo(droppedEnergy);
      }
      return;
    }
    const container = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: s => {
        return s.structureType === STRUCTURE_CONTAINER && s.store[RESOURCE_ENERGY] > 1500;
      }
    });
    if (container) {
      creep.creepWithdraw(container, RESOURCE_ENERGY);
      return;
    }
    const storage = creep.pos.findClosestByPath(FIND_STRUCTURES, {
      filter: s => {
        return s.structureType === STRUCTURE_STORAGE && s.store[RESOURCE_ENERGY] > 50;
      }
    });
    if (storage) {
      creep.creepWithdraw(storage, RESOURCE_ENERGY);
      return;
    }
  }
});

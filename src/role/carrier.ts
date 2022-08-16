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
          (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
          structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
        );
      }
    });

    if (spawnOrExtension) {
      creep.creepTransfer(spawnOrExtension, RESOURCE_ENERGY);
    }
  },
  source(creep: Creep) {
    if (sourceId) {
      const source = Game.getObjectById<StructureContainer>(sourceId);
      if (source) {
        creep.creepWithdraw(source, RESOURCE_ENERGY);
      }
    } else {
      const targets = creep.room.find(FIND_STRUCTURES, {
        filter: structure => {
          return structure.structureType === STRUCTURE_CONTAINER && structure.store[RESOURCE_ENERGY] > 0;
        }
      });

      if (targets.length) creep.creepWithdraw(targets[0], RESOURCE_ENERGY);
    }
  }
});

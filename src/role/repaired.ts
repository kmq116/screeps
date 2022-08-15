export const repairer = (
  sourceId?: string
): {
  target(creep: Creep): void;
  source(creep: Creep): void;
} => ({
  target(creep: Creep) {
    const targets = creep.room.find(FIND_STRUCTURES, {
      filter: object => object.hits < object.hitsMax
    });

    targets.sort((a, b) => a.hits - b.hits);

    if (targets.length > 0) {
      if (creep.repair(targets[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(targets[0]);
      }
    }
  },
  source(creep: Creep) {
    const target = creep.room.find(FIND_STRUCTURES, {
      filter: structure => structure.structureType === STRUCTURE_CONTAINER
    })[0];
    if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
      creep.moveTo(target);
    }
  }
});

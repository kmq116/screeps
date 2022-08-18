export const repairer = (
  sourceId?: string
): {
  target(creep: Creep): void;
  source(creep: Creep): void;
} => ({
  target(creep: Creep) {
    const rampart = creep.room.find(FIND_STRUCTURES, {
      filter: structure => structure.structureType === STRUCTURE_RAMPART && structure.ticksToDecay < 20
    });
    if (rampart.length) {
      creep.creepRepair(rampart[0]);
      return;
    }
    const targets = creep.room.find(FIND_STRUCTURES, {
      filter: object => object.hits < object.hitsMax
    });
    targets.sort((a, b) => a.hits - b.hits);
    if (targets.length > 0) creep.creepRepair(targets[0]);
  },
  source(creep: Creep) {
    const target = creep.room.find(FIND_STRUCTURES, {
      filter: structure => structure.structureType === STRUCTURE_CONTAINER
    })[0];
    creep.creepWithdraw(target, RESOURCE_ENERGY);
  }
});

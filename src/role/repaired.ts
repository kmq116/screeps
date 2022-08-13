export const repaired = {
  run(creep: Creep): void {
    // 身上携带的能量不足时，就去搬运能量
    if (creep.shouldGetEnergy()) {
      const target = creep.room.find(FIND_STRUCTURES, {
        filter: structure => structure.structureType === STRUCTURE_CONTAINER
      })[0];
      if (creep.withdraw(target, RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(target);
      }
      // 能量满了就去升级
      if (creep.isEnergyFull()) creep.memory.working = true;
    } else if (creep.memory.working === true) {
      const targets = creep.room.find(FIND_STRUCTURES, {
        filter: object => object.hits < object.hitsMax
      });

      targets.sort((a, b) => a.hits - b.hits);

      if (targets.length > 0) {
        if (creep.repair(targets[0]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0]);
        }
      }
      if (creep.isEnergyEmpty()) creep.memory.working = false;
    }
  }
};

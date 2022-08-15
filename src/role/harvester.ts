export const harvester = (
  sourceId?: string
): {
  target(creep: Creep): void;
  source(creep: Creep): void;
} => ({
  target(creep: Creep) {
    // 优先建造 container
    const siteTargets = creep.pos.findInRange(FIND_CONSTRUCTION_SITES, 5, {
      filter: structure => {
        return structure.structureType === STRUCTURE_CONTAINER;
      }
    });
    const container = creep.pos.findInRange(FIND_STRUCTURES, 10, {
      filter: s => s.structureType === STRUCTURE_CONTAINER
    });

    if (siteTargets.length) {
      creep.say("🚧 build");
      if (creep.build(siteTargets[0]) === ERR_NOT_IN_RANGE) {
        creep.moveTo(siteTargets[0]);
        return;
      }
    } else if (container.length) {
      if (container[0].hits < container[0].hitsMax) {
        if (creep.repair(container[0]) === ERR_NOT_IN_RANGE) {
          creep.moveTo(container[0]);
        }
      } else if (creep.transfer(container[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
        creep.moveTo(container[0]);
      }
    } else {
      // 优先补满 spawn 和 extensions
      const spawnOrExtension = creep.room.find(FIND_STRUCTURES, {
        filter: structure => {
          return (
            (structure.structureType === STRUCTURE_EXTENSION || structure.structureType === STRUCTURE_SPAWN) &&
            structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0
          );
        }
      });
      const containerTargets = creep.room.find(FIND_STRUCTURES, {
        filter: s => s.structureType === STRUCTURE_CONTAINER
      });
      const targets = spawnOrExtension.length ? spawnOrExtension : containerTargets;
      if (targets.length > 0) {
        if (creep.transfer(targets[0], RESOURCE_ENERGY) === ERR_NOT_IN_RANGE) {
          creep.moveTo(targets[0], { visualizePathStyle: { stroke: "#ffffff" } });
        }
      }
    }
  },
  source(creep: Creep) {
    if (!sourceId) {
      console.log("没有指定 sourceId");
      return;
    }
    const source = Game.getObjectById<Source>(sourceId);
    if (!source) {
      console.log("没有找到指定的 source");
      return;
    }
    // creep.say("🔄 harvest");
    if (creep.harvest(source) === ERR_NOT_IN_RANGE) {
      creep.moveTo(source);
    }
    // 在能量附近 检查有没有 container 工地
    if (creep.pos.inRangeTo(source, 1)) {
      const targets = creep.pos.findInRange(FIND_CONSTRUCTION_SITES, 10, {
        filter: structure => {
          return structure.structureType === STRUCTURE_CONTAINER;
        }
      });
      const container = creep.pos.findInRange(FIND_STRUCTURES, 10, {
        filter: s => s.structureType === STRUCTURE_CONTAINER
      });
      if (!targets.length && !container.length) {
        creep.pos.createConstructionSite(STRUCTURE_CONTAINER);
      }
    }
  }
});

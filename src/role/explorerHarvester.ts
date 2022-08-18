export const explorerHarvester = (
  sourceId?: string
): {
  target(creep: Creep): void;
  source(creep: Creep): void;
} => ({
  target(creep: Creep) {
    const roads = creep.pos.findInRange<StructureRoad>(FIND_STRUCTURES, 7, {
      filter: object => object.hits < object.hitsMax
    });
    roads.sort((a, b) => a.hits - b.hits);
    if (roads.length > 0) {
      creep.creepRepair(roads[0]);
      return;
    }
    const targets = creep.pos.findInRange(FIND_CONSTRUCTION_SITES, 7, {
      filter: s => s.structureType === STRUCTURE_ROAD
    });
    if (targets.length) {
      creep.creepBuild(targets[0]);
      return;
    }
    creep.drop(RESOURCE_ENERGY);
  },
  source(creep: Creep) {
    creep.moveTo(new RoomPosition(32, 31, creep.memory.room));

    const source = Game.getObjectById<Source>("5bbcac9a9099fc012e635d29");
    if (!source) {
      console.log("没有找到指定的 source");
      return;
    }
    creep.creepHarvest(source);
  }
});

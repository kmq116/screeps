export const explorerHarvester = (
  sourceId?: string
): {
  target(creep: Creep): void;
  source(creep: Creep): void;
} => ({
  target(creep: Creep) {
    // console.log(this.target);
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

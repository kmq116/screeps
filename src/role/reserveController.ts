export const reserveController = (
  sourceId?: string
): {
  target(creep: Creep): void;
  source(creep: Creep): void;
} => ({
  target(creep: Creep) {
    if (sourceId) {
      const controller = Game.getObjectById<StructureController>(sourceId);
      if (controller) {
        console.log(creep.reserveController(controller));

        if (creep.reserveController(controller) === ERR_NOT_IN_RANGE) {
          creep.moveTo(controller);
        }
      }
    }
  },
  source(creep: Creep) {
    if (sourceId) {
      const controller = Game.getObjectById<StructureController>(sourceId);
      if (controller) {
        if (creep.reserveController(controller) === ERR_NOT_IN_RANGE) {
          creep.moveTo(controller);
        }
      }
    }
  }
});

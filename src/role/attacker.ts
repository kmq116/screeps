export const attacker = (
  sourceId?: string
): {
  target(creep: Creep): void;
  source(creep: Creep): void;
} => ({
  target(creep: Creep) {
    creep.attackRoom();
  },
  source(creep: Creep) {
    creep.attackRoom();
  }
});

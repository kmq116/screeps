export class TowerExtension extends StructureTower {
  public work(): void {
    const target = this.pos.findClosestByPath(FIND_HOSTILE_CREEPS, {
      filter(c) {
        return c.getActiveBodyparts(ATTACK) === 0 || c.owner.username === "Invader";
      }
    });
    if (target) this.attack(target);
    else {
      const roadTarget = this.room.find(FIND_STRUCTURES, {
        filter: i => i.structureType === STRUCTURE_ROAD && i.hits < i.hitsMax
      });
      if (roadTarget.length > 0) this.repair(roadTarget[0]);
    }
  }
}

export default class CreepExtension extends Creep {
  /**
   * 能量是否拿满了
   */
  public isEnergyFull(): boolean {
    return this.store.getFreeCapacity() === 0;
  }

  /**
   * 是否应该获取能量
   * @returns {boolean}
   */
  public shouldGetEnergy(): boolean {
    return this.store.getFreeCapacity() >= 0 && this.memory.working === false;
  }

  /**
   * 从某个结构中获取能量
   */
  public creepWithdraw(target: Structure<STRUCTURE_CONTAINER>, resource: ResourceConstant): void {
    if (this.withdraw(target, resource) === ERR_NOT_IN_RANGE) {
      this.moveTo(target);
    }
  }

  /**
   * 身上的能量是否空掉了
   */
  public isEnergyEmpty(): boolean {
    return this.store[RESOURCE_ENERGY] === 0;
  }
}

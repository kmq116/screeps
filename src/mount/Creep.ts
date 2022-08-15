import { ROLE } from "role/utils";
import { creepConfigs } from "role/creepConfig";

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
  public creepWithdraw(target: AnyStructure, resource: ResourceConstant): void {
    if (this.withdraw(target, resource) === ERR_NOT_IN_RANGE) {
      this.moveTo(target);
    }
  }

  public creepBuild(target: ConstructionSite<BuildableStructureConstant>): void {
    if (this.build(target) === ERR_NOT_IN_RANGE) {
      this.moveTo(target, { visualizePathStyle: { stroke: "#ffffff" } });
    }
  }

  public creepTransfer(target: AnyCreep | Structure<StructureConstant>, resource: ResourceConstant): void {
    if (this.transfer(target, resource) === ERR_NOT_IN_RANGE) {
      this.moveTo(target, { visualizePathStyle: { stroke: "#ffffff" } });
    }
  }

  /**
   * 身上的能量是否空掉了
   */
  public isEnergyEmpty(): boolean {
    return this.store[RESOURCE_ENERGY] === 0;
  }

  public work(): void {
    const creepConfig = creepConfigs[this.memory.role];
    if (!creepConfig) {
      console.log("找不到角色配置，可能还未发布", this.memory.role);
      //  尝试根据名称裁剪出角色类型
      const [role] = this.name.split("-");
      if (role) {
        this.memory.role = role as ROLE;
      }
    }
    const config = creepConfig(this.memory.sourceId);

    if (this.shouldGetEnergy()) {
      if (this.isEnergyFull()) this.switchState();
      config.source(this);
    } else if (this.memory.working === true) {
      if (this.isEnergyEmpty()) this.switchState();
      config.target(this);
    }
  }

  public switchState(): void {
    this.memory.working = !this.memory.working;
  }
}

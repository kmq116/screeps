import { CreepRoleConfigs } from "role/creepLogicConfig";
import { ROLE, findSpawns } from "role/utils";

export default class CreepExtension extends Creep {
  public _findSpawns(): AnyStructure[] {
    return findSpawns(this);
  }
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
    return this.store.getFreeCapacity() >= 0 && !this.memory.working;
  }

  /**
   * 从某个结构中获取能量
   */
  public creepWithdraw(target: AnyStructure, resource: ResourceConstant): void {
    if (this.withdraw(target, resource) === ERR_NOT_IN_RANGE) {
      this.moveTo(target);
    }
  }

  public creepHarvest(target: Source | Mineral<MineralConstant> | Deposit): void {
    if (this.harvest(target) === ERR_NOT_IN_RANGE) {
      this.moveTo(target);
    }
  }

  public creepRepair(target: Structure<StructureConstant>): void {
    if (this.repair(target) === ERR_NOT_IN_RANGE) {
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
    const creepConfig = CreepRoleConfigs[this.memory.role];
    if (!creepConfig) {
      console.log("找不到角色配置，可能还未发布", this.memory.role);
      return;
    }
    const config = creepConfig(this.memory.sourceId);

    if (this.shouldGetEnergy()) {
      if (this.isEnergyFull()) this.switchState();
      config.source(this);
    } else if (this.memory.working) {
      if (this.isEnergyEmpty()) this.switchState();
      config.target(this);
    }
  }

  public switchState(): void {
    this.memory.working = !this.memory.working;
  }

  public goRoom(): void {
    const waitedAttackRoom = "W12S4";
    console.log("要进攻的房间", waitedAttackRoom);
    if (this.room.name !== waitedAttackRoom) {
      console.log("不等于要进攻的房间");
      // 丢弃身上所有资源
      // for (const resourceType in this.carry) {
      //   this.drop(resourceType as any);
      // }
      this.moveTo(new RoomPosition(11, 25, waitedAttackRoom));
    } else {
      const target = this.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
      console.log("找到了不属于我的 creep,干他");
      if (target) {
        if (this.attack(target) === ERR_NOT_IN_RANGE) {
          console.log("近战攻击");
          this.moveTo(target);
        }
        if (this.rangedAttack(target) === ERR_NOT_IN_RANGE) {
          console.log("尝试远程攻击");
          this.moveTo(target);
        }
      }
    }
  }

  public attackRoom(): void {
    this.goRoom();
  }
}

import { ROLE } from "role/utils";
import { creepConfig } from "role/roleConfig";
import { MAIN_ROOM } from "sources/sources";
const needMinBody = [ROLE.harvester, ROLE.carrier, ROLE.upgrader, ROLE.builder];
export class SpawnExtension extends StructureSpawn {
  public spawn(options: {
    body: BodyPartConstant[];
    name: string;
    opt: {
      memory: {
        role: ROLE;
        room: string;
        working: boolean;
        sourceId?: string;
      };
    };
  }): number | undefined {
    if (this.spawning) {
      console.log(this.spawning, "正在孵化中 spawning");
      console.log(this.spawning.name, "正在孵化中的 screeps，不继续执行逻辑");
      return;
    }
    const testIfCanSpawn = this.spawnCreep(options.body, options.name, {
      ...options.opt,
      dryRun: true
    });

    const existEnergy = Game.rooms[MAIN_ROOM].energyAvailable;
    const energyCapacity = Game.rooms[MAIN_ROOM].energyCapacityAvailable;
    console.log("已有能量", existEnergy);
    console.log("能量上限", energyCapacity);
    console.log("ifCanSpawn", testIfCanSpawn);
    if (testIfCanSpawn === OK) {
      const spawnResult = this.spawnCreep(options.body, options.name, options.opt);
      console.log("孵化结果", spawnResult);
    } else if (needMinBody.includes(options.opt.memory.role)) {
      const testMinBodyIfCanSpawn = this.spawnCreep(creepConfig[options.opt.memory.role].minBody, options.name, {
        ...options.opt,
        dryRun: true
      });
      console.log(options.opt.memory.role, "孵化角色");
      console.log(needMinBody, "孵化角色");
      console.log(creepConfig[options.opt.memory.role].minBody, "身体部件参数");
      if (testMinBodyIfCanSpawn === OK) {
        this.spawnCreep(creepConfig[options.opt.memory.role].minBody, options.name, {
          memory: {
            role: options.opt.memory.role,
            room: options.opt.memory.room,
            working: false,
            sourceId: options.opt.memory.sourceId
          }
        });
      }
      console.log("太大的孵化不出，尝试小一点孵化", testMinBodyIfCanSpawn);
      return testMinBodyIfCanSpawn;
    }
    return testIfCanSpawn;
  }
}

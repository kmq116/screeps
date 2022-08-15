import { ROLE } from "role/utils";
import { creepConfig } from "role/roleConfig";
import { logByGameTick } from "spawn/spawn";

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
    console.log("升级 spawn 逻辑", options.opt.memory.role);

    if (this.spawning) {
      console.log("spawning", this.spawning.name);
      // return;
    }
    const spawnResult = this.spawnCreep(options.body, options.name, options.opt);
    logByGameTick(`计划孵化结果 : ${spawnResult}`);

    if (spawnResult === ERR_NOT_ENOUGH_ENERGY) {
      const result = this.spawnCreep(creepConfig[options.opt.memory.role].minBody, options.name, {
        memory: {
          role: options.opt.memory.role,
          room: options.opt.memory.room,
          working: false,
          sourceId: options.opt.memory.sourceId
        }
      });
      console.log(options);

      // logByGameTick(`孵化能量不够，尝试小一点孵化 : ${result}`);
      return result;
    }
    return spawnResult;
  }
}

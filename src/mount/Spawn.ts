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

      // return;
    }
    const spawnResult = this.spawnCreep(options.body, options.name, options.opt);
    console.log("孵化结果", spawnResult);
    const existEnergy = Game.rooms[MAIN_ROOM].energyAvailable;
    const energyCapacity = Game.rooms[MAIN_ROOM].energyCapacityAvailable;
    console.log("已有能量", existEnergy);
    console.log("能量上限", energyCapacity);

    if (spawnResult === ERR_NOT_ENOUGH_ENERGY && needMinBody.includes(options.opt.memory.role)) {
      const result = this.spawnCreep(creepConfig[options.opt.memory.role].minBody, options.name, {
        memory: {
          role: options.opt.memory.role,
          room: options.opt.memory.room,
          working: false,
          sourceId: options.opt.memory.sourceId
        }
      });
      console.log("太大的孵化不出，尝试小一点孵化", result);

      return result;
    }
    return spawnResult;
  }
}

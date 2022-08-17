import { ROLE } from "role/utils";
import { creepConfig } from "role/roleConfig";

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
      // return;
    }
    const spawnResult = this.spawnCreep(options.body, options.name, options.opt);

    if (spawnResult === ERR_NOT_ENOUGH_ENERGY) {
      const result = this.spawnCreep(creepConfig[options.opt.memory.role].minBody, options.name, {
        memory: {
          role: options.opt.memory.role,
          room: options.opt.memory.room,
          working: false,
          sourceId: options.opt.memory.sourceId
        }
      });

      return result;
    }
    return spawnResult;
  }
}

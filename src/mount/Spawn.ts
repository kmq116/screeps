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
  }) {
    const testIfCanSpawn = this.spawnCreep(options.body, options.name, {
      ...options.opt,
      dryRun: true
    });

    if (testIfCanSpawn === OK) {
      const spawnResult = this.spawnCreep(options.body, options.name, options.opt);
      console.log("孵化结果", spawnResult);
    } else {
      const testMinBodyIfCanSpawn = this.spawnCreep(creepConfig[options.opt.memory.role].minBody, options.name, {
        ...options.opt,
        dryRun: true
      });
      console.log(options.opt.memory.role, "孵化角色");
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

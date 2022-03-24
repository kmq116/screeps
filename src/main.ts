import { roleHarvester } from "role/harvester";
import { roleUpgrader } from "role/upgrader";
import { ROLE, generatePixel } from "role/utils";
import { MAIN_ROOM, SPAWN1 } from "sources/sources";
import { ErrorMapper } from "utils/ErrorMapper";
import { repaired } from "./role/repaired";
import { creepConfig } from "./role/roleConfig";
import { spawnCreep } from "./spawn/spawn";
import { roleBuilder } from "./role/builder";

declare global {
  /*
    Example types, expand on these or remove them and add your own.
    Note: Values, properties defined here do no fully *exist* by this type definiton alone.
          You must also give them an implemention if you would like to use them. (ex. actually setting a `role` property in a Creeps memory)

    Types added in this `global` block are in an ambient, global context. This is needed because `main.ts` is a module file (uses import or export).
    Interfaces matching on name from @types/screeps will be merged. This is how you can extend the 'built-in' interfaces from @types/screeps.
  */

  // Memory extension samples
  interface Memory {
    uuid: number;
    log: any;
  }

  interface CreepMemory {
    role: string;
    room: string;
    working: boolean;
    sourceId?: string; // 目标源id
  }

  // Syntax for adding proprties to `global` (ex "global.log")
  namespace NodeJS {
    interface Global {
      log: any;
    }
  }
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  generatePixel();
  spawnCreep();
  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }

  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    if (creep.memory.role === ROLE.harvester) {
      roleHarvester.run(creep);
    }
    if (creep.memory.role === ROLE.upgrader) {
      roleUpgrader.run(creep);
    }

    if (creep.memory.role === ROLE.repairer) {
      repaired.run(creep);
    }
    if (creep.memory.role === ROLE.builder) {
      roleBuilder.run(creep);
    }
  }
});

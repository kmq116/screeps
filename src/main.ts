import { ROLE, generatePixel } from "role/utils";
import { ErrorMapper } from "utils/ErrorMapper";
import { repaired } from "./role/repaired";
import { roleBuilder } from "./role/builder";
import { roleCarrier } from "./role/carrier";
import { roleHarvester } from "role/harvester";
import { roleUpgrader } from "role/upgrader";
import { spawnCreep } from "./spawn/spawn";
import { SOURCES } from "sources/sources";

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
function averageHarvesterSourceId() {
  const harvesters = _.filter(Game.creeps, creep => creep.memory.role === ROLE.harvester);
  const sourceId = SOURCES.length > 1 ? SOURCES[1].id : SOURCES[0].id;
  harvesters.forEach((creep, index) => {
    if (index >= harvesters.length / 2) {
      creep.memory.sourceId = sourceId;
    } else {
      creep.memory.sourceId = SOURCES[0].id;
    }
  });
}
// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  generatePixel();
  spawnCreep();
  averageHarvesterSourceId();
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
    } else if (creep.memory.role === ROLE.upgrader) {
      roleUpgrader.run(creep);
    } else if (creep.memory.role === ROLE.carrier) {
      roleCarrier.run(creep);
    } else if (creep.memory.role === ROLE.repairer) {
      repaired.run(creep);
    } else if (creep.memory.role === ROLE.builder) {
      roleBuilder.run(creep);
    } else {
      console.log(`Creep ${creep.name} has no role assigned.`);
      roleBuilder.run(creep);
    }
  }
});

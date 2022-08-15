import { ROLE, generatePixel } from "role/utils";
import { ErrorMapper } from "utils/ErrorMapper";
import { MAIN_ROOM } from "sources/sources";
import { averageSourceId } from "sources/utils";
import { mountWork } from "mount";
import { spawnCreep } from "spawn/spawn";

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
    watch: Partial<Record<"expressions" | "values", any>>;
  }

  interface CreepMemory {
    role: ROLE;
    room: string;
    working: boolean;
    sourceId?: string; // 目标源id
  }

  interface StructureSpawn {
    spawn(opt: {
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
    }): void;
  }

  interface Creep {
    isEnergyFull(): boolean;
    shouldGetEnergy(): boolean;
    isEnergyEmpty(): boolean;
    creepWithdraw(target: AnyStructure, resource: ResourceConstant): void;
    creepBuild(target: ConstructionSite<BuildableStructureConstant>): void;
    work(): void;
    creepTransfer(target: AnyCreep | Structure<StructureConstant>, resource: ResourceConstant): void;
  }

  interface RoomMemory {
    creepRoleCounts: Record<ROLE, number>;
  }

  // Syntax for adding proprties to `global` (ex "global.log")
  namespace NodeJS {
    interface Global {
      log: any;
      hasExtension: boolean;
    }
  }
}

const myRoom = Game.rooms[MAIN_ROOM];

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  mountWork();
  generatePixel();
  spawnCreep();
  averageSourceId();
  clearCreepsMemory();
  initRoomMemory();
  creepWork();
});

function initRoomMemory() {
  // 初始化房间的内存属性为 0
  Object.keys(ROLE).forEach(roleKey => {
    myRoom.memory.creepRoleCounts[roleKey as ROLE] = 0;
  });
}

function clearCreepsMemory() {
  Object.keys(Memory.creeps).forEach(name => {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  });
}
function creepWork(): void {
  Object.values(Game.creeps).forEach(creep => {
    myRoom.memory.creepRoleCounts[creep.memory.role] = (myRoom.memory.creepRoleCounts[creep.memory.role] || 0) + 1;
    creep.work();
  });
}

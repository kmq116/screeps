import { ROLE, generatePixel } from "role/utils";
import { ErrorMapper } from "utils/ErrorMapper";
import { MAIN_ROOM, RIGHT_ROOM } from "sources/sources";
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
    roomMemory: Record<string, { creepRoleCounts: Record<ROLE, number> }>;
  }

  interface CreepMemory {
    readonly role: ROLE;
    readonly room: string;
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
    creepRepair(target: Structure<StructureConstant>): void;
    creepHarvest(target: Source | Mineral<MineralConstant> | Deposit): void;
  }

  interface RoomMemory {
    creepRoleCounts: Record<ROLE, number>;
  }

  interface Structure {
    work?(): void;
  }

  // Syntax for adding proprties to `global` (ex "global.log")
  namespace NodeJS {
    interface Global {
      log: any;
      hasExtension: boolean;
    }
  }
}

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  mountWork();
  generatePixel();
  spawnCreep();
  averageSourceId();
  creepWork();
  Object.values(Game.structures).forEach(s => {
    if (s.work) s.work();
  });
});

function initRoomMemory() {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  Memory.roomMemory = {
    [MAIN_ROOM]: { creepRoleCounts: {} },
    [RIGHT_ROOM]: { creepRoleCounts: {} }
  } as any;

  // 初始化房间的内存属性为 0
  Object.keys(ROLE).forEach(roleKey => {
    Memory.roomMemory[MAIN_ROOM].creepRoleCounts[roleKey as ROLE] = 0;
    Memory.roomMemory[RIGHT_ROOM].creepRoleCounts[roleKey as ROLE] = 0;
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
  clearCreepsMemory();
  //  这里因为是每一个 tick 都要执行 所以执行顺序要在 creepWork 之前，如果太过靠前，会导致数据永远都是 0
  initRoomMemory();
  Object.values(Game.creeps).forEach(creep => {
    Memory.roomMemory[creep.memory.room].creepRoleCounts[creep.memory.role] =
      (Memory.roomMemory[creep.memory.room].creepRoleCounts[creep.memory.role] || 0) + 1;
    console.log(Memory.roomMemory[creep.memory.room].creepRoleCounts[creep.memory.role]);

    creep.work();
  });
}

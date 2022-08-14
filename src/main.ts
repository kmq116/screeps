import { MAIN_ROOM, SOURCES } from "sources/sources";
import { ROLE, generatePixel } from "role/utils";
import { ErrorMapper } from "utils/ErrorMapper";
import { mountWork } from "mount";
import { repaired } from "./role/repaired";
import { roleBuilder } from "./role/builder";
import { roleCarrier } from "./role/carrier";
import { roleHarvester } from "role/harvester";
import { roleUpgrader } from "role/upgrader";
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
    creepWithdraw(target: Structure<STRUCTURE_CONTAINER>, resource: ResourceConstant): void;
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

/**
 * 均匀分配 sources id 到 creeps
 */
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

function averageCarrierSourceId(): void {
  const targets: StructureContainer[] = Game.rooms[MAIN_ROOM].find<StructureContainer>(FIND_STRUCTURES, {
    filter: i => i.structureType === STRUCTURE_CONTAINER && i.store[RESOURCE_ENERGY] > 0
  });
  const sourceId = targets.length > 1 ? targets[1]?.id : targets[0]?.id;
  const list = _.filter(Game.creeps, creep => creep.memory.role === ROLE.carrier);
  list.forEach((creep, index) => {
    if (index >= list.length / 2) {
      creep.memory.sourceId = sourceId;
    } else {
      creep.memory.sourceId = targets[0]?.id;
    }
  });
}

const myRoom = Game.rooms[MAIN_ROOM];

// When compiling TS to JS and bundling with rollup, the line numbers and file names in error messages change
// This utility uses source maps to get the line numbers and file names of the original, TS source code
export const loop = ErrorMapper.wrapLoop(() => {
  mountWork();
  generatePixel();
  spawnCreep();
  averageHarvesterSourceId();
  averageCarrierSourceId();
  // Automatically delete memory of missing creeps
  for (const name in Memory.creeps) {
    if (!(name in Game.creeps)) {
      delete Memory.creeps[name];
    }
  }
  // 初始化房间的内存属性为 0
  for (const roleKey in ROLE) {
    myRoom.memory.creepRoleCounts[roleKey as ROLE] = 0;
  }
  for (const name in Game.creeps) {
    const creep = Game.creeps[name];
    myRoom.memory.creepRoleCounts[creep.memory.role] = (myRoom.memory.creepRoleCounts[creep.memory.role] || 0) + 1;

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
      const [role] = creep.name.split("-");
      console.log(`Creep ${creep.name} 没有对应的角色配置，当前类型是 ${creep.memory.role as string}`);
      if (role) {
        creep.memory.role = role as ROLE;
      } else {
        roleBuilder.run(creep);
      }
    }
  }
});

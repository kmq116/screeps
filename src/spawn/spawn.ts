import { ROLE } from "role/utils";
import { MAIN_ROOM, SOURCES, SPAWN1 } from "sources/sources";
import { creepConfig } from "../role/roleConfig";

export function spawnCreep() {
  const harvesters = _.filter(Game.creeps, creep => creep.memory.role === ROLE.harvester);
  const upgraders = _.filter(Game.creeps, creep => creep.memory.role === ROLE.upgrader);
  const builders = _.filter(Game.creeps, creep => creep.memory.role === ROLE.builder);
  const repairers = _.filter(Game.creeps, creep => creep.memory.role === ROLE.repairer);
  if (harvesters.length < creepConfig[ROLE.harvester].max) {
    const result = SPAWN1.spawnCreep(creepConfig[ROLE.harvester].body, Game.time.toString(), {
      memory: {
        role: ROLE.harvester,
        room: MAIN_ROOM,
        working: false,
        sourceId: SOURCES.length === 1 ? SOURCES[0].id : Math.random() > 0.5 ? SOURCES[0].id : SOURCES[1].id
      }
    });
    if (result === ERR_NOT_ENOUGH_ENERGY) {
      console.log("没有足够的能量 尝试孵化最小 harvester");
      SPAWN1.spawnCreep([WORK, CARRY, MOVE], Game.time.toString(), {
        memory: {
          role: ROLE.harvester,
          room: MAIN_ROOM,
          working: false,
          sourceId: SOURCES.length === 1 ? SOURCES[0].id : Math.random() > 0.5 ? SOURCES[0].id : SOURCES[1].id
        }
      });
    }
  } else if (upgraders.length < creepConfig[ROLE.upgrader].max) {
    SPAWN1.spawnCreep(creepConfig[ROLE.upgrader].body, Game.time.toString(), {
      memory: { role: ROLE.upgrader, room: MAIN_ROOM, working: false }
    });
  } else if (builders.length < creepConfig[ROLE.builder].max) {
    SPAWN1.spawnCreep(creepConfig[ROLE.builder].body, Game.time.toString(), {
      memory: { role: ROLE.builder, room: MAIN_ROOM, working: false }
    });
  } else if (repairers.length < creepConfig[ROLE.repairer].max) {
    SPAWN1.spawnCreep(creepConfig[ROLE.repairer].body, Game.time.toString(), {
      memory: { role: ROLE.repairer, room: MAIN_ROOM, working: false }
    });
  }
}

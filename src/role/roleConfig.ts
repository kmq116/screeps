import { ROLE } from "./utils";

export const creepConfig = {
  [ROLE.harvester]: {
    body: [WORK, WORK, CARRY, MOVE],
    max: 4
  },
  [ROLE.upgrader]: {
    body: [WORK, CARRY, MOVE],
    max: 2
  },
  [ROLE.builder]: {
    body: [WORK, CARRY, MOVE],
    max: 2
  },
  [ROLE.repairer]: {
    body: [WORK, CARRY, MOVE],
    max: 1
  },
  [ROLE.carrier]: {
    body: [CARRY, CARRY, MOVE],
    max: 2
  }
};

import { ROLE } from "./utils";

export const creepConfig = {
  [ROLE.harvester]: {
    body: [WORK, WORK, WORK, CARRY, MOVE],
    max: 2
  },
  [ROLE.upgrader]: {
    body: [WORK, CARRY, MOVE],
    max: 1
  },
  [ROLE.builder]: {
    body: [WORK, CARRY, MOVE],
    max: 1
  },
  [ROLE.repairer]: {
    body: [WORK, CARRY, MOVE],
    max: 1
  }
};

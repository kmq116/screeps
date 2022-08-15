import { ROLE } from "./utils";

const minBodyHasWork = [WORK, CARRY, MOVE];
const minBodyCarrier = [CARRY, MOVE];
export const creepConfig = {
  [ROLE.harvester]: {
    body: [WORK, WORK, WORK, CARRY, MOVE],
    minBody: minBodyHasWork,
    max: 6
  },
  [ROLE.upgrader]: {
    body: [WORK, WORK, WORK, CARRY, CARRY, MOVE],
    minBody: minBodyHasWork,
    max: 2
  },
  [ROLE.builder]: {
    body: [WORK, WORK, CARRY, CARRY, CARRY, MOVE],
    minBody: minBodyHasWork,
    max: 2
  },
  [ROLE.repairer]: {
    body: [WORK, CARRY, MOVE],
    minBody: minBodyHasWork,
    max: 1
  },
  [ROLE.carrier]: {
    body: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
    minBody: minBodyCarrier,
    max: 4
  }
};

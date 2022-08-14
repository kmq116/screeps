import { ROLE } from "./utils";
const minBodyHasWork = [WORK, CARRY, MOVE];
const minBodyCarrier = [CARRY, CARRY, MOVE];
export const creepConfig = {
  [ROLE.harvester]: {
    body: [WORK, WORK, WORK, CARRY, MOVE],
    minBody: minBodyHasWork,
    max: 6
  },
  [ROLE.upgrader]: {
    body: [WORK, CARRY, MOVE],
    minBody: minBodyHasWork,
    max: 2
  },
  [ROLE.builder]: {
    body: [WORK, CARRY, MOVE],
    minBody: minBodyHasWork,
    max: 2
  },
  [ROLE.repairer]: {
    body: [WORK, CARRY, MOVE],
    minBody: minBodyHasWork,
    max: 1
  },
  [ROLE.carrier]: {
    body: [CARRY, CARRY, MOVE],
    minBody: minBodyCarrier,
    max: 2
  }
};

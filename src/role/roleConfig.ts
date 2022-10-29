import { ROLE } from "./utils";

const minBodyHasWork = [WORK, CARRY, MOVE];
const minBodyHasClaim = [CLAIM, CARRY, MOVE];
const minBodyCarrier = [CARRY, MOVE, CARRY, MOVE];
export const creepConfig = {
  [ROLE.harvester]: {
    body: [WORK, WORK, WORK, CARRY, MOVE],
    minBody: minBodyHasWork,
    max: 6
  },
  [ROLE.upgrader]: {
    body: [WORK, WORK, WORK, CARRY, CARRY, MOVE],
    minBody: minBodyHasWork,
    max: 6
  },
  [ROLE.builder]: {
    body: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE],
    minBody: minBodyHasWork,
    max: 2
  },
  [ROLE.repairer]: {
    body: [WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE],
    minBody: minBodyHasWork,
    max: 2
  },
  [ROLE.carrier]: {
    body: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
    minBody: minBodyCarrier,
    max: 3
  },
  [ROLE.explorerHarvester]: {
    body: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE],
    minBody: minBodyHasWork,
    max: 1
  },
  [ROLE.explorerCarrier]: {
    body: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    minBody: minBodyHasWork,
    max: 3
  },
  [ROLE.reserveController]: {
    body: [CARRY, CLAIM, MOVE],
    minBody: minBodyHasClaim,
    max: 1
  }
};

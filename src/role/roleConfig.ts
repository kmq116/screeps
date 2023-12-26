import { ROLE } from "./utils";

const minBodyHasWork = [WORK, CARRY, MOVE] as BodyPartConstant[];
const minBodyHasClaim = [CLAIM, CARRY, MOVE] as BodyPartConstant[];
const minBodyCarrier = [CARRY, MOVE, CARRY, MOVE] as BodyPartConstant[];
export const creepConfig: Record<
  ROLE,
  {
    body: BodyPartConstant[];
    minBody: BodyPartConstant[];
    max: number;
  }
> = {
  [ROLE.harvester]: {
    body: [WORK, WORK, WORK, CARRY, MOVE],
    minBody: minBodyHasWork,
    max: 2
  },
  [ROLE.upgrader]: {
    body: [WORK, WORK, WORK, CARRY, CARRY, MOVE],
    minBody: minBodyHasWork,
    max: 1
  },
  [ROLE.builder]: {
    body: [WORK, WORK, WORK, WORK, CARRY, CARRY, CARRY, MOVE],
    minBody: minBodyHasWork,
    max: 1
  },
  [ROLE.repairer]: {
    body: [WORK, CARRY, MOVE, WORK, CARRY, MOVE, WORK, CARRY, MOVE],
    minBody: minBodyHasWork,
    max: 1
  },
  [ROLE.carrier]: {
    body: [CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE],
    minBody: minBodyCarrier,
    max: 2
  },
  [ROLE.explorerHarvester]: {
    body: [WORK, WORK, WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE],
    minBody: minBodyHasWork,
    max: 1
  },
  [ROLE.explorerCarrier]: {
    body: [CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, CARRY, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE, MOVE],
    minBody: minBodyHasWork,
    max: 1
  },
  [ROLE.reserveController]: {
    body: [CARRY, CLAIM, MOVE],
    minBody: minBodyHasClaim,
    max: 1
  }
};

import { ROLE } from "./utils";
import { builder } from "./builder";
import { carrier } from "./carrier";
import { explorerCarrier } from "./explorerCarrier";
import { explorerHarvester } from "./explorerHarvester";
import { harvester } from "./harvester";
import { repairer } from "./repaired";
import { reserveController } from "./reserveController";
import { upgrader } from "./upgrader";
import { attacker } from "./attacker";

export const creepConfigs: Record<
  ROLE,
  (sourceId?: string) => {
    target(creep: Creep): void;
    source(creep: Creep): void;
  }
> = {
  harvester,
  carrier,
  builder,
  repairer,
  upgrader,
  explorerHarvester,
  explorerCarrier,
  reserveController,
  attacker
};

import { ROLE } from "./utils";
import { builder } from "./builder";
import { carrier } from "./carrier";
import { harvester } from "./harvester";
import { repairer } from "./repaired";
import { upgrader } from "./upgrader";

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
  upgrader
};

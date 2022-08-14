import CreepExtension from "./Creep";
import { SpawnExtension } from "./Spawn";
import { assignPrototype } from "utils/utils";

export const mountCreep = (): void => {
  assignPrototype(Creep, CreepExtension);
};

export const mountSpawn = (): void => {
  assignPrototype(Spawn, SpawnExtension);
};

export function mountWork(): void {
  if (!global.hasExtension) {
    mountCreep();
    mountSpawn();
    global.hasExtension = true;
  }
}

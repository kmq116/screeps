import CreepExtension from "./Creep";
import { SpawnExtension } from "./Spawn";
import { TowerExtension } from "./Tower";
import { assignPrototype } from "utils/utils";

export const mountCreep = (): void => {
  assignPrototype(Creep, CreepExtension);
};

export const mountSpawn = (): void => {
  assignPrototype(Spawn, SpawnExtension);
};

export const mountTower = (): void => {
  assignPrototype(StructureTower, TowerExtension);
};

export function mountWork(): void {
  if (!global.hasExtension) {
    mountCreep();
    mountSpawn();
    mountTower();
    global.hasExtension = true;
  }
}

import CreepExtension from "./Creep";
import { assignPrototype } from "utils/utils";

export const mountCreep = (): void => {
  assignPrototype(Creep, CreepExtension);
};

export function mountWork(): void {
  if (!global.hasExtension) {
    mountCreep();

    global.hasExtension = true;
  }
}

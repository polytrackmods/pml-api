// dist/0.0.0/pml-api.mod.js
import { PolyMod, MixinType } from "https://pml.orangy.cfd/PolyTrackMods/PolyModLoader/0.5.0/PolyModLoader.js";
var PmlApiMod = class extends PolyMod {
  constructor() {
    super(...arguments);
    this.init = (pmlInstance) => {
      this.pml = pmlInstance;
      console.log("PmlApiMod initialized...");
    };
    this.postInit = () => {
      console.log("PmlApiMod post-initialization complete.");
    };
    this.simInit = () => {
      this.pml.registerSimWorkerFuncMixin("ammoFunc", MixinType.INSERT, "{", "self.pmlApi = {}; self.pmlApi.eventBus = new EventTarget();");
      console.log("PmlApiMod simulation initialization complete.");
    };
  }
};
var polyMod = new PmlApiMod();
export {
  polyMod
};

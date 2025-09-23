import { world, system } from "@minecraft/server";
itemSet1 = {
    default: "simple_vehicles:honk_item",
    toggledState: "simple_vehicles:honk_item",
    getItem: function(activated){
        return activated.getDynamicProperty("simple_vehicles:honk_set")?!this.toggledState:this.default
    }
}

export default itemSet1

import {
  BlockComponentEntityFallOnEvent,
  BlockComponentOnPlaceEvent,
  BlockComponentPlayerDestroyEvent,
  BlockComponentPlayerInteractEvent,
  BlockComponentPlayerPlaceBeforeEvent,
  BlockComponentRandomTickEvent,
  BlockComponentStepOffEvent,
  BlockComponentStepOnEvent,
  BlockComponentTickEvent,
  BlockCustomComponent,
  world,
} from "@minecraft/server";

class TemplateComponent implements BlockCustomComponent {
  constructor() {
    this.beforeOnPlayerPlace = this.beforeOnPlayerPlace.bind(this);
    this.onEntityFallOn = this.onEntityFallOn.bind(this);
    this.onPlace = this.onPlace.bind(this);
    this.onPlayerDestroy = this.onPlayerDestroy.bind(this);
    this.onPlayerInteract = this.onPlayerInteract.bind(this);
    this.onRandomTick = this.onRandomTick.bind(this);
    this.onStepOff = this.onStepOff.bind(this);
    this.onStepOn = this.onStepOn.bind(this);
    this.onTick = this.onTick.bind(this);
  }
  /**
   * This function will be called before a player places the
   * block.
   */
  beforeOnPlayerPlace(event: BlockComponentPlayerPlaceBeforeEvent): void {
    // Code here
  }
  /**
   * This function will be called when an entity falls onto the
   * block that this custom component is bound to.
   */
  onEntityFallOn(event: BlockComponentEntityFallOnEvent): void {
    // Code here
  }
  /**
   * This function will be called when the block that this custom
   * component is bound to is placed.
   */
  onPlace(event: BlockComponentOnPlaceEvent): void {
    // Code here
  }
  /**
   * This function will be called when a player destroys a
   * specific block.
   */
  onPlayerDestroy(event: BlockComponentPlayerDestroyEvent): void {
    // Code here
  }
  /**
   * This function will be called when a player sucessfully
   * interacts with the block that this custom component is bound
   * to.
   */
  onPlayerInteract(event: BlockComponentPlayerInteractEvent): void {
    // Code here
  }
  /**
   * This function will be called when a block randomly ticks.
   */
  onRandomTick(event: BlockComponentRandomTickEvent): void {
    // Code here
  }
  /**
   * This function will be called when an entity steps off the
   * block that this custom component is bound to.
   */
  onStepOff(event: BlockComponentStepOffEvent): void {
    // Code here
  }
  /**
   * This function will be called when an entity steps onto the
   * block that this custom component is bound to.
   */
  onStepOn(event: BlockComponentStepOnEvent): void {
    // Code here
  }
  /**
   * This function will be called when a block ticks.
   */
  onTick(event: BlockComponentTickEvent): void {
    // Code here
  }
}

world.beforeEvents.worldInitialize.subscribe((initEvent) => {
  initEvent.blockComponentRegistry.registerCustomComponent(
    "content:template_component",
    new TemplateComponent()
  );
});
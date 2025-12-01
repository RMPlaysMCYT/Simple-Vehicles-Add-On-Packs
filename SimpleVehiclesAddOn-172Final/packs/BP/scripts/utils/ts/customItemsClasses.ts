import {
  ItemComponentBeforeDurabilityDamageEvent,
  ItemComponentCompleteUseEvent,
  ItemComponentConsumeEvent,
  ItemComponentHitEntityEvent,
  ItemComponentMineBlockEvent,
  ItemComponentUseEvent,
  ItemComponentUseOnEvent,
  ItemCustomComponent,
  world,
} from "@minecraft/server";

class MyItemComponent implements ItemCustomComponent {
  constructor() {
    this.onBeforeDurabilityDamage = this.onBeforeDurabilityDamage.bind(this);
    this.onCompleteUse = this.onCompleteUse.bind(this);
    this.onConsume = this.onConsume.bind(this);
    this.onHitEntity = this.onHitEntity.bind(this);
    this.onMineBlock = this.onMineBlock.bind(this);
    this.onUse = this.onUse.bind(this);
    this.onUseOn = this.onUseOn.bind(this);
  }
  /**
   * This function will be called when an item containing this
   * component is hitting an entity and about to take durability
   * damage.
   */
  onBeforeDurabilityDamage(
    event: ItemComponentBeforeDurabilityDamageEvent
  ): void {
    // Code here
  }
  /**
   * This function will be called when an item containing this
   * component's use duration was completed.
   */
  onCompleteUse(event: ItemComponentCompleteUseEvent): void {
    // Code here
  }
  /**
   * This function will be called when an item containing this
   * component is eaten by an entity.
   */
  onConsume(event: ItemComponentConsumeEvent): void {
    // Code here
  }
  /**
   * This function will be called when an item containing this
   * component is used to hit another entity.
   */
  onHitEntity(event: ItemComponentHitEntityEvent): void {
    // Code here
  }
  /**
   * This function will be called when an item containing this
   * component is used to mine a block.
   */
  onMineBlock(event: ItemComponentMineBlockEvent): void {
    // Code here
  }
  /**
   * This function will be called when an item containing this
   * component is used by a player.
   */
  onUse(event: ItemComponentUseEvent): void {
    // Code here
  }
  /**
   * This function will be called when an item containing this
   * component is used on a block.
   */
  onUseOn(event: ItemComponentUseOnEvent): void {
    // Code here
  }
}

world.beforeEvents.worldInitialize.subscribe((initEvent) => {
  initEvent.itemComponentRegistry.registerCustomComponent(
    "content:my_item_component",
    new MyItemComponent()
  );
});
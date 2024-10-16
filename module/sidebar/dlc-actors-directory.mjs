/* eslint-disable no-underscore-dangle */
export class DeadlandsActorDirectory extends ActorDirectory {
  /** @override */
  static entryPartial =
    'systems/deadlands-classic/templates/sidebar/partials/dlc-actor-partial.html';

  /** @override */
  _getEntryContextOptions() {
    const options = super._getEntryContextOptions();
    return [
      {
        name: 'DLC.sidebar.UseChips',
        icon: '<i class="fas fa-circle"></i>',
        condition: (li) => true,
        callback: (li) => {
          const actor = game.actors.get(li.data('documentId'));
          const localActor = actor.toObject();

          if (localActor.system.hasChips) {
            delete localActor.apps?.[globalThis.ChipManager.appId];
          } else {
            localActor.apps[globalThis.ChipManager.appId] =
              globalThis.ChipManager;
          }
          localActor.system.hasChips = !localActor.system.hasChips;

          const updateOptions = {};
          actor.update(localActor, updateOptions);
        },
      },
      {
        name: 'DLC.sidebar.SetTraits',
        icon: '<i class="fas fa-cards"></i>',
        condition: (li) => true,
        callback: (li) => {
          const actor = game.actors.get(li.data('documentId'));
          actor.setTraits.render(true);
        },
      },
      {
        name: 'DLC.sidebar.CreateCharacter',
        icon: '<i class="fas fa-snowflake"></i>',
        condition: (li) => true,
        callback: (li) => {
          const actor = game.actors.get(li.data('documentId'));
          actor.createCharacter.render(true);
        },
      },
      {
        name: 'DLC.sidebar.ModifyCharacter',
        icon: '<i class="fas fa-shield"></i>',
        condition: (li) => true,
        callback: (li) => {
          const actor = game.actors.get(li.data('documentId'));
          actor.modifyCharacter.render(true);
        },
      },
    ].concat(options);
  }
}

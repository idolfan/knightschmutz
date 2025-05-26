/**
@typedef {Object} Player
@property {number} id
@property {number} entity_index - The index of the entity in the entity array.
@property {string} display_name - The name displayed for the player.
@property {number} player_index - The index of the player in the players array.
 */

/**
 * @enum {string}
 */
const Entity_Type = {
    PLAYER: 'PLAYER',
    ENEMY: 'ENEMY',
};

/**
 * @typedef {Object} Entity
 * @property {number} id
 * @property {Entity_Type} entity_type
 * @property {string} display_name
 * 
 * @property {number} x - x-cell position
 * @property {number} y - y-cell position
 * @property {number} next_x - tracks x of first path element
 * @property {number} next_y - tracks y of first path element
 * @property {Path} path - currently used path
 * @property {number} visual_x
 * @property {number} visual_y
 * 
 * @property {Array<On_Combat_Calback>} on_death
 * @property {Array<On_Combat_Calback>} on_kill
 * @property {Array<On_Combat_Calback>} on_scored_hit
 * @property {Array<On_Combat_Calback} on_taken_hit
 * 
 * @property {number} entity_index - The entity's index inside the entites array
 * @property {number} enemy_entity_index - The entity's index inside the enemy_entites array
 * @property {number} player_entity_index - The entity's index inside the player_entites array
 * 
 * @property {Entity} chasing_entity - The entity being chased
 * @property {Object} chasing_action_and_context - The action attempted to perform while chasing
 * @property {Action} chasing_action_and_context.action
 * @property {Context} chasing_action_and_context.context
 * 
 * @property {number} attack_timer - in ticks since last attack
 * @property {Entity_Stats} base_stats - Used to calculate stats
 * @property {Entity_Stats} stats - Actual stats being used during gameplay
 * @property {Inventory} equipped_items
 * @property {Inventory} inventory
 * @property {Action} basic_attack
 * @property {Equipment} weapon
 * @property {Array<Action>} actions
 */

/**
 * @typedef {Object} Entity_Stats
 * @property {number} max_hp
 * @property {number} current_hp
 * @property {number} attack_speed
 * @property {number} damage
 * @property {number} movement_speed
 * @property {number} armor
 * @property {number} ranged_range_bonus
 * @property {number} melee_range_bonus
 * @property {number} max_mana
 * @property {number} current_mana
 */

/**
 * @callback Create_Entity
 * @param {number} x
 * @param {number} y
 * @returns {Entity}
 */

/**
 * @typedef {Object} Path
 * @property {number} id
 * @property {number} entity_index
 * @property {Array<Array>} path_steps - An array of positions representing the path.
 * @property {number} path_length
 * @property {number} progress - progress to the next point in the path. Between 0 and 1
 */

/** 
 * @typedef {Object} Inventory
 * @property {Array<Equipment>} equipments
 * @property {number} slot_count
 * @property {Inventory_Type} type Where the inventory should be displayed
 * @property {Entity} entity
 * @property {Map<Equipment_Type, number} equipment_type_limits
 * @property {Map<Equipment_Type, number} equipment_type_counts
 */

/**
 * @typedef {Object} Action
 * @property {Array<Requirement>} requirements
 * @property {Array<Effect_Function>} effect_functions
 * @property {number} range
 * @property {number} cooldown
 * @property {number} cooldown_date - tick date of last use
 * @property {HTMLImageElement} image
 * @property {number} mana_cost
 */

/** 
 * @callback Create_Action
 * @param {numer} favour
 * @returns {Action}
 */

/**
 * @callback Requirement
 * @param {Context} context
 * @param {Action} action
 * @returns {boolean} Whether the requirement is met.
 */

/**
 * @callback Effect_Function
 * @param {Context} context
 * @param {Action} action
 */

/**
 * @typedef {Object} Context
 * @property {Entity} source_entity
 * @property {Entity} target_entity
 * @property {[x: number, y: number]} target_cell
 */

/**
 * @typedef {Object} Combat_Context
 * @property {Entity} source_entity
 * @property {Entity} target_entity
 * @property {Damage} damage
 */

/**
 * @typedef {Object} Damage
 * @property {number} amount
 */

/**
 * @callback On_Combat_Calback
 * @param {Combat_Context} combat_context
 */

/**
 * @typedef {Object} Scheduled_Callback
 * @property {Array<Callback>} callbacks;
 * @property {Array<Object>} contexts
 * @property {number} tick_date
 */

/**
 * @callback Callback
 * @param {Object} context
 */

/**
 * @typedef {Object} Visual_Effect
 * @property {HTMLImageElement} [image]
 * @property {number} size
 * @property {number} duration - in ticks
 * @property {number} time - passed ticks of duration
 * @property {Entity} [entity]
 * @property {number} x
 * @property {number} y
 * @property {number} [peak_at] - percent visibility peak
 * @property {[x:number,y:number]} [destination]
 * @property {(effect: Visual_Effect)} [draw_callback]
 * @property {(effect: Visual_Effect)} [tick_callback]
 * @property {boolean} [on_top]
 */

/**
 * @typedef {Object} Equipment
 * @property {Entity_Stats} flat_stats
 * @property {Entity_Stats} multiplicative_stats
 * @property {Array<Equipment_Effect>} extra_effects
 * @property {Equipment_Type} type
 * @property {HTMLImageElement} image
 * @property {number} id
 * @property {string} display_name
 * @property {Action} action
 * @property {string} name
 */

/**
 * @typedef Equipment_Effect
 * @property {Callback} effect_callback
 * @property {Object} context
 * @property {String} description
 */

/** 
 * @callback Create_Equipment
 * @param {number} favour
 * @returns {Equipment}
 */

/**
 * @typedef {Object} Inventory_Zone
 * @property {boolean} visible - Whether the zone is displayed
 * @property {Inventory} inventory - The inventory which is displayed / changed
 * @property {Margins} boundaries - The visual boundaries for the image
 * @property {Margins} zone_boundaries - The boundaries for the area in which items are displayed
 * @property {Margins} margins - The margins between boundaries and zone_boundaries
 * @property {HTMLImageElement} image - The displayed image of the inventory
 * @property {Slot_Info} slot_info
 * @property {Array<Slot>} slots
 */

/**
 * @typedef {Object} Slot_Info
 * @property {Margins} zone_margin
 * @property {HTMLImageElement} image
 * @property {number} width
 * @property {number} height
 * @property {[x: number, y: number]} slot_distances - Distance between slots
 */

/**
 * @typedef {Object} Slot
 * @property {number} x
 * @property {number} y
 * @property {number} width
 * @property {number} height
 * @property {Margins} zone_boundaries
 * @property {Equipment} equipment
 * @property {Inventory} inventory
 * @property {number} index
 */

/**
 * @typedef {Object} Action_Slot
 * @property {number} x 
 * @property {number} y
 * @property {number} width
 * @property {number} height
 * @property {Margins} zone_boundaries
 * @property {Action} action
 */

/** 
 * @typedef {[left: number, up: number, right: number, down: number]} Margins
 */

/**
 * @typedef {[x: number, y: number, width: number, height: number]} Dimensions
 */
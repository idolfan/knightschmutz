/**
@typedef {Object} Player
@property {number} id - The unique identifier for the player.
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
 * @property {number} id - The unique identifier for the entity used as index inside data arrays.
 * @property {Entity_Type} entity_type - The type of the entity.
 * @property {string} display_name - The name displayed for the entity.
 * @property {number} x - The x-coordinate of the entity's position.
 * @property {number} y - The y-coordinate of the entity's position.
 * @property {number} next_x
 * @property {number} next_y
 * @property {Path} path - The path associated with the entity.
 * @property {Array<On_Combat_Calback>} on_death - Functions called on death
 * @property {Array<On_Combat_Calback>} on_kill - Functions called on scored kill
 * @property {Array<On_Combat_Calback>} on_scored_hit - Functions called on scored hit
 * @property {Array<On_Combat_Calback} on_taken_hit - Functions called on getting hit
 * @property {number} entity_index - The entity's index inside the entites array
 * @property {number} enemy_entity_index - The entity's index inside the enemy_entites array
 * @property {number} entity_index - The entity's index inside the entites array
 * @property {number} player_entity_index - The entity's index inside the player_entites array
 * @property {Entity} chasing_entity
 * @property {Object} chasing_action_and_context - The action attempted to perform while chasing
 * @property {Action} chasing_action_and_context.action - The action
 * @property {Context} chasing_action_and_context.context - The context
 * @property {number} attack_timer - in ticks since last attack
 * @property {Entity_Stats} base_stats
 * @property {Entity_Stats} stats
 * @property {number} visual_x
 * @property {number} visual_y
 * @property {Inventory} equipped_items
 * @property {Inventory} inventory
 */

/**
 * @typedef {Object} Entity_Stats
 * @property {number} max_hp
 * @property {number} current_hp
 * @property {number} attack_speed
 * @property {number} damage
 * @property {number} movement_speed
 * @property {number} armor
 */

/**
 * @callback Create_Entity
 * @param {number} x
 * @param {number} y
 * @returns {Entity}
 */

/**
 * @typedef {Object} Path
 * @property {number} id - The unique identifier for the path.
 * @property {number} entity_index - The unique identifier for the entity associated with the path.
 * @property {Array<Array>} path_steps - An array of positions representing the path.
 * @property {number} path_length - The length of the path.
 * @property {number} progress - The progress to the next point in the path.
 */

/** 
 * @typedef {Object} Inventory
 * @property {Array<Equipment>} equipments
 */

/**
 * @typedef {Object} Action
 * @property {Array<Requirement>} requirements
 * @property {Array<Effect_Function>} effect_functions
 */

/**
 * @callback Requirement
 * @param {Context} context
 * @returns {boolean} Whether the reuirement is met.
 */

/**
 * @callback Effect_Function
 * @param {Context} context
 */

/**
 * @typedef {Object} Context
 * @property {Entity} source_entity
 * @property {Entity} target_entity
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
 * @property {HTMLImageElement} image
 * @property {number} size
 * @property {number} duration
 * @property {number} time
 * @property {Entity} entity
 * @property {number} x
 * @property {number} y
 * @property {number} peak_at
 */

/**
 * @enum {string}
 */
const Equipment_Type = {
    CHESTPLATE: 'CHESTPLATE',
    HELMET: 'HELMET',
    RING: 'RING',
    BRACELET: 'BRACELET',
    AMULET: 'AMULET'
};

/**
 * @typedef {Object} Equipment
 * @property {Entity_Stats} flat_stats
 * @property {Entity_stats} multiplicative_stats
 * @property {Array<Equipment_Effect>} extra_effects
 * @property {Equipment_Type} type
 * @property {HTMLImageElement} image
 * @property {number} id
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
 * @typedef {Object} Item_Interaction_Zone
 * @property {number} x
 * @property {number} y
 * @property {number} width
 * @property {number} height
 * @property {Equipment} equipment
 * @property {Inventory} inventory
 */

/**
 * @typedef {Object} Inventory_Zone
 * @property {number} x
 * @property {number} y
 * @property {number} width
 * @property {number} height
 * @property {Inventory} inventory
 */

/** 
 * @typedef {[left: number, up: number, right: number, down: number]} Boundaries
 */

/**
 * @typedef {[x: number, y: number, width: number, height: number]} Dimensions
 */
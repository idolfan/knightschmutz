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
 * @typedef {Object} Position
 * @property {number} x - The x-coordinate of the position.
 * @property {number} y - The y-coordinate of the position.
 */

/**
 * @typedef {Object} Entity
 * @property {number} id - The unique identifier for the entity used as index inside data arrays.
 * @property {Entity_Type} entity_type - The type of the entity.
 * @property {string} display_name - The name displayed for the entity.
 * @property {number} x - The x-coordinate of the entity's position.
 * @property {number} y - The y-coordinate of the entity's position.
 * @property {number} speed - The speed of the entity.
 * @property {Path} path - The path associated with the entity. 
 */

/**
 * @typedef {Object} Path
 * @property {number} id - The unique identifier for the path.
 * @property {number} entity_index - The unique identifier for the entity associated with the path.
 * @property {Array<Position>} path_steps - An array of positions representing the path.
 * @property {number} path_length - The length of the path.
 * @property {number} progress - The progress to the next point in the path.
 */
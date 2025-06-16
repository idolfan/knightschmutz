//#region ------------------------ Canvas ------------------------------------------
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas, false);
resizeCanvas();

//#endregion -----------------------------------------------------------------------
//#region ------------------------ Images ------------------------------------------

const player_image = new Image();
player_image.src = './images/player.png';
const chestplate_image = new Image();
chestplate_image.src = './images/chestplate.png';
const helmet_image = new Image();
helmet_image.src = './images/helmet.png';
const hp_hud_Image = new Image();
hp_hud_Image.src = './images/hp_hud.png';
const heal_Image = new Image();
heal_Image.src = './images/heal_visual.png';
const damage_Image = new Image();
damage_Image.src = './images/damage_visual.png';
const sword_image = new Image();
sword_image.src = './images/sword.png';
const bow_image = new Image();
bow_image.src = './images/bow.png';
const chest_image = new Image();
chest_image.src = './images/chest.png';
const inventory_image = new Image();
inventory_image.src = './images/inventory.png';
const other_inventory_image = new Image();
other_inventory_image.src = './images/other_inventory.png';
const amulet_image = new Image();
amulet_image.src = './images/amulet.png';
const info_image = new Image();
info_image.src = './images/info.png';
const slot_image = new Image();
slot_image.src = './images/slot.png';
const slot_image_margin = 5 / 32;
const equipped_slots_image = new Image();
equipped_slots_image.src = './images/equipped_slots.png';
const actions_slots_image = new Image();
actions_slots_image.src = './images/actions_slots.png';
const hp_bar_image = new Image();
hp_bar_image.src = './images/hp_bar.png';
const mana_bar_image = new Image();
mana_bar_image.src = './images/mana_bar.png';
const hammer_image = new Image();
hammer_image.src = './images/hammer.png';
const rock_image = new Image();
rock_image.src = './images/rock.png';
const arrow_image = new Image();
arrow_image.src = './images/arrow.png';
const spike_image = new Image();
spike_image.src = './images/spike.png';
const info_small_image = new Image();
info_small_image.src = './images/info_small.png';
const side_info_image = new Image();
side_info_image.src = './images/side_info.png';
const freeze_image = new Image();
freeze_image.src = './images/freeze_visual.png';
const red_ghost_image = new Image();
red_ghost_image.src = './images/red_ghost.png';
const ruby_sword_image = new Image();
ruby_sword_image.src = './images/ruby_sword.png';
const emerald_sword_image = new Image();
emerald_sword_image.src = './images/emerald_sword.png';
const diamond_sword_image = new Image();
diamond_sword_image.src = './images/diamond_sword.png';
const gold_sword_image = new Image();
gold_sword_image.src = './images/gold_sword.png';
const emerald_chestplate_image = new Image();
emerald_chestplate_image.src = './images/emerald_chestplate.png';
const gold_chestplate_image = new Image();
gold_chestplate_image.src = './images/gold_chestplate.png';
const ruby_chestplate_image = new Image();
ruby_chestplate_image.src = './images/ruby_chestplate.png';
const diamond_chestplate_image = new Image();
diamond_chestplate_image.src = './images/diamond_chestplate.png';
const axe_image = new Image();
axe_image.src = './images/axe.png';
const fire_rain_image = new Image();
fire_rain_image.src = './images/fire_rain.png';
const fire_ball_image = new Image();
fire_ball_image.src = './images/fire_ball.png';
const fire_ball_trail_1_image = new Image();
fire_ball_trail_1_image.src = './images/fire_ball_trail_1.png';
const fire_ball_trail_2_image = new Image();
fire_ball_trail_2_image.src = './images/fire_ball_trail_2.png';

//#endregion -----------------------------------------------------------------------
//#region ----------------------- Constants ----------------------------------------

const Cell_Type = Object.freeze({
    EMPTY: 0,
    WALL: 1,
    CHEST: 2,
    ENTITY: 3,
    COBBLE_WALL: 4
});

const Stat_Display_Names = Object.freeze({
    movement_speed: "Movement Speed",
    max_hp: "Health",
    attack_speed: "Attack Speed",
    armor: "Armor",
})

const Action_Display_Names = Object.freeze({
    range: "Range",
    cooldown: "Cooldown",
    mana_cost: "Mana cost",
    type: "Type",
    damage: "Damage"
})

/**
 * @enum {string}
 */
const Equipment_Type = {
    CHESTPLATE: 'CHESTPLATE',
    HELMET: 'HELMET',
    RING: 'RING',
    BRACELET: 'BRACELET',
    AMULET: 'AMULET',
    WEAPON: 'WEAPON',
};

/**
 * @enum {string}
 */
const Inventory_Type = {
    OTHER: 'OTHER',
    PLAYER: 'PLAYER',
    EQUIPPED: 'EQUIPPED',
};

/**
 * @enum {string}
 */
const Enemy_Type = {
    RED_MELEE: 'RED_MELEE',
    RED_BOW: 'RED_BOW',
    RED_MAGE: 'RED_MAGE',
    RED_KNIGHT: 'RED_KNIGHT',
}

/**
 * @enum {string}
 */
const Phase = {
    CHASING: 'CHASING',
    WANDERING: 'WANDERING',
    PATROLING: 'PATROLING',
    PROTECTING: 'PROTECTING',
    IDLE: 'IDLE',
    FLEEING: 'FLEEING',
    KITING: 'KITING',
    PATHING: 'PATHING',
    DEAD: 'DEAD',
}

/**
 * @enum {string}
 */
const Action_Type = {
    ATTACK: 'ATTACK',
    SPELL: 'SPELL',
}

/**
 * @enum {string}
 */
const Status_Effect = {
    BURNING: 'burning',
    FREEZING: 'freezing',
    WET: 'wet',
    ELECTROCUTED: 'electrocuted',
}

/**
 * @enum {string}
 */
const Damage_Type = {
    FIRE: 'fire',
    FROST: 'frost',
    LIGHTNING: 'lightning',
    POISON: 'poison',
    MELEE: 'melee',
    RANGED: 'ranged',
}

const Damage_Type_Colors = {
    fire: "rgb(240, 58, 3)",
    frost: "rgb(57, 224, 224)",
    lightning: "rgb(79, 26, 122)",
    poison: "rgb(26, 95, 26)",
    melee: "rgb(150, 150, 150)",
    ranged: "rgb(240, 236, 37)",
    heal: "rgb(0, 255, 0)",
}

/**
 * @enum {string}
 */
const Damage_Display_Names = Object.freeze({
    fire: "Fire damage",
    frost: "Frost damage",
    lightning: "Lightning damage",
    poison: "Poison damage",
    melee: "Melee damage",
    ranged: "Ranged damage",
})

//#endregion -----------------------------------------------------------------------
//#region ----------------------- Game state ---------------------------------------

const ticks_per_second = 60;
const world_area_size = 100;

let id_counter = 0;
let tick_counter = 0;

/** @type {Array<Array<number>>} */
let area_board;
/** @type {Array<Array<Entity>>} */
const entity_positions = Array.from({ length: world_area_size }, () => Array(world_area_size).fill(null));

/** @type {Array<Player>} */
const players = [];
/** @type {Array<Entity>} */
const entities = [];
/** @type {Array<Entity>} */
const player_entities = [];
/** @type {Array<Entity>} */
const enemy_entities = [];
/** @type {Array<Entity} */
const entities_marked_for_delete = [];

/** @type {Map<string, Inventory} */
const chest_inventories = new Map();
/** @type {Array<Scheduled_Callback>} */
const scheduled_callbacks = [];
/** @type {Array<Path>} */
const paths = [];

/** @type {Entity} */
let player_entity;

/** @type {Inventory} */
let opened_inventory;

/** @type {Inventory} */
let opened_player_inventory;

/** @type {Inventory} */
let opened_equipped_inventory;

/** @type {Entity} */
let hovered_entity;
/** @type {[x: number, y: number]} */
let hovered_cell;

/** @type {Array<Inventory_Zone>} */
let inventory_zones = [];

let tick_interval_id;

let hp_base_entity = 100;

//#endregion -----------------------------------------------------------------------
//#region ---------------------- Requirements --------------------------------------

/** @type {Requirement} */
const not_self_requirement = (context) => {
    const not_self = context.source_entity != context.target_entity;
    if (log_requirements) console.log('not_self', not_self);
    return not_self;
}

/** @type {Requirement} */
const attack_timer_up_requirement = (context) => {
    const attack_timer_up = context.source_entity.attack_timer >= ticks_per_second / context.source_entity.stats.attack_speed;
    if (log_requirements) console.log('attack_timer_up', attack_timer_up);
    return attack_timer_up;
}

/** @type {Requirement} */
const in_range_requirement = (context, action) => {
    if (!context.source_entity || !context.target_entity) return false;
    const in_range = entity_distance(context.source_entity, context.target_entity) <= action.range;
    if (log_requirements) console.log('in_range', in_range, entity_distance(context.source_entity, context.target_entity), action);
    return in_range;
}

/** @type {Requirement} */
const in_cell_range_requirement = (context, action) => {
    const x_distance = Math.abs(context.source_entity.x - context.target_cell[0]);
    const y_distance = Math.abs(context.source_entity.y - context.target_cell[1]);

    const in_range = x_distance + y_distance <= action.range;
    if (log_requirements) console.log('in_cell_range', in_range);
    return in_range;
}

/** @type {Requirement} */
const cooldown_up_requirement = (context, action) => {
    const cooldown_up = tick_counter - action.cooldown_date >= action.cooldown;
    if (log_requirements) console.log('cooldown_up', cooldown_up);
    return cooldown_up;
}

/** @type {Requirement} */
const mana_available_requirement = (context, action) => {
    const mana_available = context.source_entity.stats.current_mana >= action.mana_cost;
    if (log_requirements) console.log('mana_available', mana_available);
    return mana_available;
}

//#endregion -----------------------------------------------------------------------
//#region ------------------------- Actions ----------------------------------------


/** @type {Array<Action_Slot>} */
const action_slots = [];
const action_slots_count = 9

const log_requirements = false;

/**
 * @returns Which requirement failed
 * @type {(context: Context, action: Action) => Requirement} */
function take_action(context, action) {
    let target_cell = context.source_entity.target_cell
    if (context.source_entity == player_entity)
    {
        if (hovered_cell) target_cell = [...hovered_cell];
    }
    const full_context = { target_cell: target_cell, ...context };
    if (action.requirements)
    {
        for (const requirement_callback of action.requirements)
        {
            if (!requirement_callback(full_context, action)) return requirement_callback;
        }
    }

    for (const effect_function of action.effect_functions)
    {
        effect_function(full_context, action);
    }

    return null;
}

/**
 * @returns Which requirement failed
 * @type {(context: Context, action: Action) => Requirement}
 */
function try_action(context, action) {
    let target_cell;
    if (context.source_entity == player_entity)
    {
        if (hovered_cell) target_cell = [...hovered_cell];
    } else
    {
        target_cell = [...context.source_entity.target_cell];
    }
    const full_context = { target_cell: target_cell, ...context };
    if (action.requirements)
    {
        for (const requirement_callback of action.requirements)
        {
            if (!requirement_callback(full_context, action)) return requirement_callback;
        }
    }

    return null;
}

/** @type {Effect_Function} */
const cost_mana = (context, action) => {
    spend_mana(context.source_entity, action.mana_cost);
}

/** @type {Create_Action} */
const melee_attack = (favour) => {
    return {
        name: "Melee attack",
        type: Action_Type.ATTACK,
        requirements: [in_range_requirement, not_self_requirement, attack_timer_up_requirement],
        effect_functions: [(context) => {
            const combat_context = {
                ...context,
                damage: { amount: 15, type: Damage_Type.MELEE }
            }
            damage_entity(combat_context);
            context.source_entity.attack_timer = 0;
            /** @type {Visual_Effect} */
            const visual_effect = {
                duration: ticks_per_second * 0.2,
                time: 0,
                x: context.source_entity.visual_x,
                y: context.source_entity.visual_y,
                destination: [context.target_entity.visual_x, context.target_entity.visual_y],
                on_top: true,
                peak_at: 0.5,
                draw_callback: (effect) => {
                    const direction_x = effect.destination[0] - effect.x;
                    const direction_y = effect.destination[1] - effect.y;
                    const distance = Math.sqrt(direction_x * direction_x + direction_y * direction_y);
                    const passed_time = effect.time / effect.duration;

                    const angle = Math.atan2(direction_y, direction_x) + Math.PI / 4 - passed_time * Math.PI / 2

                    const p2 = [Math.cos(angle), Math.sin(angle)];

                    const p1 = [effect.x + cell_size / 2, effect.y + cell_size / 2];

                    ctx.beginPath();
                    ctx.strokeStyle = "rgb(200,200,200, 0.8)";
                    ctx.lineWidth = 6 * zoom;
                    ctx.moveTo(p1[0], p1[1]);
                    ctx.lineTo(p1[0] + p2[0] * (distance + cell_size / 4),
                        p1[1] + p2[1] * (distance + cell_size / 4));
                    ctx.stroke();
                },
                tick_callback: () => { }
            }

            visual_effects.push(visual_effect);
        }],
        range: 1.5,
    }
}

/** @type {Create_Action} */
const bow_attack = (favour) => {
    return {
        name: "Bow attack",
        type: Action_Type.ATTACK,
        requirements: [in_range_requirement, not_self_requirement, attack_timer_up_requirement],
        effect_functions: [(context) => {
            const combat_context = {
                ...context,
                damage: { amount: 8, type: Damage_Type.RANGED }
            }
            context.source_entity.attack_timer = 0;
            const distance = entity_distance(context.source_entity, context.target_entity);
            scheduled_callbacks.push({
                callbacks: [
                    (combat_context) => {
                        damage_entity(combat_context);
                    }
                ],
                contexts: [combat_context],
                tick_date: tick_counter + ticks_per_second * 0.025 * distance,
            })

            /** @type {Visual_Effect} */
            const visual_effect = {
                duration: ticks_per_second * 0.025 * distance,
                size: 1,
                time: 0,
                x: context.source_entity.x,
                y: context.source_entity.y,
                destination: [context.target_entity.x, context.target_entity.y],
                draw_callback: (effect) => {
                    const direction_x = effect.destination[0] - effect.x;
                    const direction_y = effect.destination[1] - effect.y;
                    const distance = Math.sqrt(direction_x * direction_x + direction_y * direction_y);
                    const remaining_time = effect.duration - effect.time;
                    ctx.strokeStyle = "rgb(127,51,0)";
                    ctx.lineWidth = 5;
                    ctx.moveTo(effect.x * cell_size, effect.y * cell_size);
                    ctx.lineTo((effect.x + direction_x / distance) * cell_size, (effect.y + direction_y / distance) * cell_size);
                    ctx.stroke();
                    ctx.beginPath();
                },
                tick_callback: (effect) => {
                    const direction_x = effect.destination[0] - effect.x;
                    const direction_y = effect.destination[1] - effect.y;
                    const remaining_time = effect.duration - effect.time;
                    effect.x += direction_x / remaining_time;
                    effect.y += direction_y / remaining_time;
                }
            }

            visual_effects.push(visual_effect);
        }],
        range: 7,
    }
}

/** @type {Create_Action} */
const heal_spell = (favour) => {
    return {
        name: "Heal",
        type: Action_Type.SPELL,
        requirements: [in_range_requirement, cooldown_up_requirement, mana_available_requirement],
        effect_functions: [cost_mana,
            (context, action) => {
                const combat_context = {
                    ...context,
                    damage: { amount: 30 }
                }
                action.cooldown_date = tick_counter;
                heal_entity(combat_context);
            }],
        cooldown: ticks_per_second * 10,
        cooldown_date: tick_counter - ticks_per_second * 10,
        image: heal_Image,
        range: 10,
        mana_cost: 25,
    }
}

/** @type {Create_Action} */
const hammer_spell = (favour) => {
    return {
        name: "Destruct",
        type: Action_Type.SPELL,
        requirements: [in_cell_range_requirement, cooldown_up_requirement, mana_available_requirement],
        effect_functions: [cost_mana,
            (context, action) => {
                const target_cell = context.target_cell;
                if (area_board[target_cell[0]][target_cell[1]] == Cell_Type.WALL)
                    area_board[target_cell[0]][target_cell[1]] = Cell_Type.EMPTY;
                action.cooldown_date = tick_counter;
            }],
        cooldown: ticks_per_second * 4,
        cooldown_date: tick_counter - ticks_per_second * 4,
        image: hammer_image,
        mana_cost: 15,
        range: 1,
    }
}

/** @type {Create_Action} */
const construct_spell = (favour) => {
    return {
        name: "Construct",
        type: Action_Type.SPELL,
        requirements: [in_cell_range_requirement, cooldown_up_requirement, mana_available_requirement],
        effect_functions: [cost_mana,
            (context, action) => {
                const target_cell = context.target_cell;
                area_board[target_cell[0]][target_cell[1]] = Cell_Type.WALL;
                action.cooldown_date = tick_counter;
            }],
        cooldown: ticks_per_second * 10,
        cooldown_date: tick_counter - ticks_per_second * 10,
        image: rock_image,
        mana_cost: 15,
        range: 1,
    }
}

/** @type {Create_Action} */
const spike_spell = (favour) => {
    return {
        name: "Spike spell",
        type: Action_Type.SPELL,
        requirements: [in_cell_range_requirement, cooldown_up_requirement, mana_available_requirement],
        effect_functions: [
            cost_mana,
            (context, action) => {
                action.cooldown_date = tick_counter;
                const indicator = aoe_indicator_effect(context.target_cell[0], context.target_cell[1], 1, ticks_per_second * 1.5);
                visual_effects.push(indicator);
                scheduled_callbacks.push({
                    callbacks: [
                        (cont) => {
                            const cell = cont.target_cell;
                            const entity = entity_positions[cell[0]][cell[1]];
                            visual_effects.push({
                                duration: ticks_per_second * 0.35,
                                size: 1,
                                time: 0,
                                x: cell[0],
                                y: cell[1],
                                image: spike_image,
                                peak_at: 0.2,

                            })
                            if (entity)
                            {
                                damage_entity({
                                    source_entity: context.source_entity,
                                    target_entity: entity,
                                    damage: {
                                        amount: 50,
                                        type: Damage_Type.RANGED,
                                    }
                                })
                            }
                        }
                    ],
                    contexts: [context],
                    tick_date: tick_counter + ticks_per_second * 1.5,
                })
            }
        ],
        cooldown: ticks_per_second * 10,
        cooldown_date: tick_counter - ticks_per_second * 10,
        image: spike_image,
        mana_cost: 10,
        range: 10,
    }
}

/** @type {Create_Action} */
const freeze_spell = (favour) => {
    return {
        name: "Freeze",
        type: Action_Type.SPELL,
        requirements: [in_cell_range_requirement, cooldown_up_requirement, mana_available_requirement],
        effect_functions: [
            cost_mana,
            (context, action) => {
                action.cooldown_date = tick_counter;
                const size_c = 3;
                const indicator = aoe_indicator_effect(context.target_cell[0], context.target_cell[1], size_c, action.indicator_duration);
                visual_effects.push(indicator);
                scheduled_callbacks.push({
                    callbacks: [
                        (cont) => {
                            const cell = cont.target_cell;
                            const entities = entities_inside(context.target_cell[0], context.target_cell[1], size_c);

                            visual_effects.push({
                                duration: ticks_per_second,
                                size: 3,
                                time: 0,
                                x: cell[0],
                                y: cell[1],
                                image: freeze_image,
                                peak_at: 0.2,

                            })

                            for (let i = 0; i < entities.length; i++)
                            {
                                const entity = entities[i];
                                affect_entity({
                                    source_entity: context.source_entity,
                                    target_entity: entity,
                                    damage: {
                                        amount: 50,
                                        status_effect: Status_Effect.FREEZING,
                                    }
                                })
                            }
                        }
                    ],
                    contexts: [context],
                    tick_date: tick_counter + action.indicator_duration,
                })
            }
        ],
        cooldown: ticks_per_second * 10,
        cooldown_date: tick_counter - ticks_per_second * 10,
        image: freeze_image,
        mana_cost: 10,
        range: 10,
        indicator_duration: ticks_per_second * 1.2,
    }
}

/** @type {Create_Action} */
const fire_rain_spell = (favour) => {
    return {
        name: "Fire Rain",
        type: Action_Type.SPELL,
        requirements: [in_cell_range_requirement, cooldown_up_requirement, mana_available_requirement],
        effect_functions: [
            cost_mana,
            (context, action) => {
                action.cooldown_date = tick_counter;
                const size_c = action.hit_cells;
                const to_sides = (size_c - 1) / 2
                const middle_x = context.target_cell[0];
                const middle_y = context.target_cell[1];

                for (let h = 0; h < action.per_second * action.duration; h++)
                {
                    const cell_position = get_cell_in_circle(middle_x, middle_y, action.radius);
                    const one_context = { target_cell: cell_position, source_entity: context.source_entity, target_entity: context.target_entity };

                    const tick_date = tick_counter + h * ticks_per_second / action.per_second;

                    scheduled_callbacks.push({
                        callbacks: [
                            (cont) => {
                                const indicator = aoe_indicator_effect(cont.target_cell[0], cont.target_cell[1], size_c, ticks_per_second * action.per_duration);
                                visual_effects.push(indicator);

                                /** @type {Visual_Effect} */
                                const fire_droplet = {
                                    duration: ticks_per_second * action.per_duration,
                                    size: 32,
                                    time: 0,
                                    x: cont.target_cell[0],
                                    y: cont.target_cell[1],
                                    draw_callback: (effect) => {
                                        const remaining_perc = 1 - effect.time / effect.duration;
                                        ctx.drawImage(fire_rain_image, effect.x * cell_size - to_sides * cell_size,
                                            (effect.y - to_sides - 1) * cell_size - remaining_perc * canvas.height * 2, cell_size * size_c, cell_size * size_c);
                                    },
                                }

                                visual_effects.push(fire_droplet);

                                scheduled_callbacks.push({
                                    callbacks: [
                                        (con => {
                                            const entities = entities_inside(con.target_cell[0], con.target_cell[1], size_c);


                                            for (let i = 0; i < entities.length; i++)
                                            {
                                                const entity = entities[i];
                                                damage_entity({
                                                    source_entity: con.source_entity,
                                                    target_entity: entity,
                                                    damage: {
                                                        amount: 10,
                                                        type: Damage_Type.FIRE,
                                                    }
                                                })
                                            }
                                        })
                                    ],
                                    contexts: [cont],
                                    tick_date: tick_date + action.per_duration * ticks_per_second,
                                })

                            }
                        ],
                        contexts: [one_context],
                        tick_date: tick_date,
                    })

                }
            }
        ],
        cooldown: ticks_per_second * 10,
        cooldown_date: tick_counter - ticks_per_second * 10,
        image: fire_rain_image,
        mana_cost: 10,
        range: 10,
        duration: 10,
        radius: 8,
        hit_cells: 3,
        per_second: 2,
        per_duration: 2.5
    }
}

/** @type {Create_Action} */
const fire_ball_spell = (favour) => {
    return {
        name: "Fire Ball",
        type: Action_Type.SPELL,
        requirements: [cooldown_up_requirement, mana_available_requirement],
        effect_functions: [
            cost_mana,
            (context, action) => {
                action.cooldown_date = tick_counter;
                const size_c = action.hit_cells;
                const to_sides = (size_c - 1) / 2

                const middle_x = context.target_cell[0];
                const middle_y = context.target_cell[1];

                const origin = [context.source_entity.x, context.source_entity.y];
                const direction = [context.target_cell[0] - context.source_entity.x, context.target_cell[1] - context.source_entity.y];
                const length = Math.hypot(direction[0], direction[1]);

                if (length > 10)
                {
                    direction[0] = direction[0] * 10 / length;
                    direction[1] = direction[1] * 10 / length;
                    console.log(direction);
                }

                const duration = length / action.speed;

                /** @type {Visual_Effect} */
                const fire_ball = {
                    duration: ticks_per_second * duration,
                    size: 32,
                    time: 0,
                    x: origin[0],
                    y: origin[1],

                    draw_callback: (effect) => {
                        const passed_perc = effect.time / effect.duration;
                        if (passed_perc > 1) return;

                        effect.x = origin[0] + direction[0] * passed_perc;
                        effect.y = origin[1] + direction[1] * passed_perc;

                        // Trail 2
                        ctx.drawImage(fire_ball_trail_2_image, (effect.x - to_sides - direction[0] / length * 0.4 * action.hit_cells) * cell_size,
                            (effect.y - to_sides - direction[1] / length * 0.4 * action.hit_cells) * cell_size, cell_size * size_c, cell_size * size_c);

                        // Trail 1
                        ctx.drawImage(fire_ball_trail_1_image, (effect.x - to_sides - direction[0] / length * 0.2 * action.hit_cells) * cell_size,
                            (effect.y - to_sides - direction[1] / length * 0.2 * action.hit_cells) * cell_size, cell_size * size_c, cell_size * size_c);


                        // Fire ball
                        ctx.drawImage(fire_ball_image, (effect.x - to_sides) * cell_size,
                            (effect.y - to_sides) * cell_size, cell_size * size_c, cell_size * size_c);


                    },
                    tick_callback: (effect) => {
                        const x = effect.x;
                        const y = effect.y;
                        const entities = entities_inside_rect(Math.floor(x), Math.floor(y), Math.ceil(x), Math.ceil(y));

                        let hit = false;

                        for (let i = 0; i < entities.length; i++)
                        {
                            const entity = entities[i];
                            if (entity == context.source_entity) continue;

                            damage_entity({
                                source_entity: context.source_entity,
                                target_entity: entity,
                                damage: {
                                    amount: action.damage,
                                    type: Damage_Type.FIRE,
                                }
                            })
                            affect_entity({
                                source_entity: context.source_entity,
                                target_entity: entity,
                                damage: {
                                    status_effect: Status_Effect.BURNING,
                                    amount: 10,
                                }
                            })
                            hit = true;
                        }

                        if (hit) fire_ball.time = fire_ball.duration + 1;
                    },
                }

                visual_effects.push(fire_ball);
            }
        ],
        cooldown: ticks_per_second * 5,
        cooldown_date: tick_counter - ticks_per_second * 5,
        image: fire_ball_image,
        mana_cost: 10,
        range: 10,
        hit_cells: 3,
        speed: 8,
        damage: 30,

    }
}

/** @type {Create_Action} */
const aimed_arrow_attack = (favour) => {
    return {
        name: "Arrow shot",
        type: Action_Type.ATTACK,
        requirements: [attack_timer_up_requirement],
        effect_functions: [
            (context, action) => {
                context.source_entity.attack_timer = 0;
                const size_c = action.hit_cells;
                const to_sides = (size_c - 1) / 2

                const middle_x = context.target_cell[0];
                const middle_y = context.target_cell[1];

                const origin = [context.source_entity.x, context.source_entity.y];
                const direction = [context.target_cell[0] - context.source_entity.x, context.target_cell[1] - context.source_entity.y];
                const length = Math.hypot(direction[0], direction[1]);

                if (length > 10)
                {
                    direction[0] = direction[0] * 10 / length;
                    direction[1] = direction[1] * 10 / length;
                    console.log(direction);
                }

                const duration = length / action.speed;

                /** @type {Visual_Effect} */
                const arrow = {
                    duration: ticks_per_second * duration,
                    size: 32,
                    time: 0,
                    x: origin[0],
                    y: origin[1],
                    destination: [origin[0] + direction[0], origin[1] + direction[1]],
                    draw_callback: (effect) => {
                        const passed_perc = effect.time / effect.duration;
                        if (passed_perc > 1) return;

                        effect.x = origin[0] + direction[0] * passed_perc;
                        effect.y = origin[1] + direction[1] * passed_perc;

                        ctx.strokeStyle = "rgb(127,51,0)";
                        ctx.lineWidth = 4 * zoom;
                        ctx.moveTo(effect.x * cell_size, effect.y * cell_size);
                        ctx.lineTo((effect.x + direction[0] / length * 0.4) * cell_size, (effect.y + direction[1] / length * 0.4) * cell_size);
                        ctx.stroke();
                        ctx.beginPath();
                    },
                    tick_callback: (effect) => {
                        const x = effect.x;
                        const y = effect.y;
                        const entities = entities_inside_rect(Math.floor(x), Math.floor(y), Math.ceil(x), Math.ceil(y));

                        let hit = false;

                        for (let i = 0; i < entities.length; i++)
                        {
                            const entity = entities[i];
                            if (entity == context.source_entity) continue;

                            damage_entity({
                                source_entity: context.source_entity,
                                target_entity: entity,
                                damage: {
                                    amount: 30,
                                    type: Damage_Type.FIRE,
                                }
                            })
                            affect_entity({
                                source_entity: context.source_entity,
                                target_entity: entity,
                                damage: {
                                    status_effect: Status_Effect.BURNING,
                                    amount: 10,
                                }
                            })
                            hit = true;
                        }

                        if (hit) arrow.time = arrow.duration + 1;
                    },
                }

                visual_effects.push(arrow);
            }
        ],
        range: 10,
        hit_cells: 1,
        speed: 24,

    }
}

/** @type {(x: number, y: number, size: number, time: number) => Visual_Effect} */
const aoe_indicator_effect = (x, y, size, duration) => {
    return {
        duration: duration,
        size: size,
        time: 0,
        x: (x + 0.5) * cell_size,
        y: (y + 0.5) * cell_size,
        draw_callback: (effect) => {
            const rad = size * cell_size * 0.5 * (effect.time / effect.duration);
            ctx.fillStyle = "rgb(255, 0, 0, 0.4)";
            ctx.fillRect(effect.x - rad, effect.y - rad, 2 * rad, 2 * rad);
            ctx.strokeStyle = "red";
            ctx.strokeRect(effect.x - rad, effect.y - rad, 2 * rad, 2 * rad);
        }
    }
}

//#endregion -----------------------------------------------------------------------
//#region -------------------- Element Positions -----------------------------------

/** @type {Slot_Info} */
const action_slot_info = {
    image: slot_image,
    zone_margin: [5 / 32, 5 / 32, 5 / 32, 5 / 32],
    width: canvas.height / 12,
    height: canvas.height / 12,
    slot_distances: [10, 0],
}


const hud_weapon_dimensions = [
    canvas.width * 0.01,
    canvas.height * 0.75,
    canvas.height * 0.1,
    -canvas.height * 0.1
]

const action_slots_boundaries = [canvas.width * 0.22, (1 - 0.18) * canvas.height, null, canvas.height];
const action_slots_margins = [8 / 227, 8 / 30, 8 / 227, 8 / 30];
let action_slots_zone_boundaries;

const hud_mana_position = [
    canvas.width * 0.01,
    canvas.height - canvas.width * 0.06,
    canvas.width * 0.20,
    canvas.width * 0.05
]

const hud_hp_position = [
    canvas.width * 0.01,
    canvas.height - canvas.width * 0.065,
    canvas.width * 0.20,
    -canvas.width * 0.05
]

const hud_hp_margins = [
    5 / 105, 5 / 26, 5 / 105, 5 / 26
]

let hud_hp_boundaries;
let hud_mana_boundaries;

const inventory_margins = [1 / 11, 1 / 13, 1 / 11, 1 / 13];

/** @type {Slot_Info} */
const default_slot_info = {
    image: slot_image,
    zone_margin: [5 / 32, 5 / 32, 5 / 32, 5 / 32],
    width: canvas.height / 11,
    height: canvas.height / 11,
    slot_distances: [10, 10]
}

const inv_width_percent = 0.338;
const info_boundaries = [(0.5 - inv_width_percent / 2) * canvas.width, 0, (0.5 + inv_width_percent / 2) * canvas.width, null];
const info_margins = [1 / 11, 1 / 13, 1 / 11, 1 / 13];
let info_zone_boundaries;

const info_small_boundaries = [(1 - inv_width_percent) * canvas.width, 0, (1) * canvas.width, null];
const info_small_margins = [6 / 83, 6 / 34, 6 / 83, 6 / 34];
let info_small_zone_boundaries;

const side_info_boundaries = [(1 - inv_width_percent * 47 / 83) * canvas.width, 0, (1) * canvas.width, null];
const side_info_margins = [6 / 47, 6 / 106, 6 / 47, 6 / 106];
let side_info_zone_boundaries;

let loaded = false;

/** @type {Slot} */
const weapon_slot = {
    x: canvas.width * 0.01,
    y: canvas.height * 0.65,
    width: canvas.height * 0.1,
    height: canvas.height * 0.1,
}

{
    const margins = default_slot_info.zone_margin;
    weapon_slot.zone_boundaries = [
        weapon_slot.x + weapon_slot.width * margins[0],
        weapon_slot.y + weapon_slot.height * margins[1],
        weapon_slot.x + weapon_slot.width * (1 - margins[2]),
        weapon_slot.y + weapon_slot.height * (1 - margins[3]),
    ]

}

setTimeout(load, 500);

function load() {
    inventory_zones = [
        create_inventory_zone(player_entity.inventory, inventory_image,
            [0, 0, inv_width_percent * canvas.width, null],
            inventory_margins, default_slot_info),
        create_inventory_zone(null, other_inventory_image,
            [canvas.width * (1 - inv_width_percent), 0, canvas.width, null],
            inventory_margins, default_slot_info),
        create_inventory_zone(player_entity.equipped_items, equipped_slots_image,
            [0, (1 - 1 / 6.769) * canvas.height, null, canvas.height],
            [5 / 313, 5 / 26, 5 / 313, 5 / 26], default_slot_info),
    ]

    info_zone_boundaries = calculate_zone_boundaries(info_image, info_boundaries, info_margins);
    action_slots_zone_boundaries = calculate_zone_boundaries(actions_slots_image, action_slots_boundaries, action_slots_margins);
    info_small_zone_boundaries = calculate_zone_boundaries(info_small_image, info_small_boundaries, info_small_margins);
    side_info_zone_boundaries = calculate_zone_boundaries(side_info_image, side_info_boundaries, side_info_margins);

    init_action_slots();

    loaded = true;

}


//#endregion -----------------------------------------------------------------------
//#region ------------------------ Equipment ---------------------------------------

/** @type {Create_Equipment} */
const test_amulet_equipment = (favour = 0) => {
    return {
        flat_stats: {
            movement_speed: 3 + Math.trunc(favour / 5 + Math.random()),
            max_hp: 20
        },
        multiplicative_stats: {
            movement_speed: 1
        },
        type: Equipment_Type.AMULET,
        image: amulet_image,
        id: id_counter++,
        display_name: "Golden Amulet",
        name: "golden_amulet",
    }
}

/** @type {Create_Equipment} */
const test_chestplate_equipment = (favour = 0) => {
    return {
        flat_stats: {
            armor: 20,
        },
        multiplicative_stats: {
            max_hp: 1.1 + 0.05 * Math.trunc(favour / 10 + Math.random())
        },
        type: Equipment_Type.CHESTPLATE,
        image: chestplate_image,
        id: id_counter++,
        display_name: "Simple Chestplate",
        name: "simple_chestplate",
    }
}

/** @type {Create_Equipment} */
const emerald_chestplate_equipment = (favour = 0) => {
    return {
        flat_stats: {
            armor: 20,
        },
        multiplicative_stats: {
        },
        type: Equipment_Type.CHESTPLATE,
        image: emerald_chestplate_image,
        id: id_counter++,
        display_name: "Emerald Chestplate",
        name: "emerald_chestplate",
    }
}

/** @type {Create_Equipment} */
const diamond_chestplate_equipment = (favour = 0) => {
    return {
        flat_stats: {
            armor: 20,
        },
        multiplicative_stats: {
        },
        type: Equipment_Type.CHESTPLATE,
        image: diamond_chestplate_image,
        id: id_counter++,
        display_name: "Diamond Chestplate",
        name: "diamond_chestplate",
    }
}

/** @type {Create_Equipment} */
const ruby_chestplate_equipment = (favour = 0) => {
    return {
        flat_stats: {
            armor: 20,
        },
        multiplicative_stats: {
        },
        type: Equipment_Type.CHESTPLATE,
        image: ruby_chestplate_image,
        id: id_counter++,
        display_name: "Ruby Chestplate",
        name: "ruby_chestplate",
    }
}

/** @type {Create_Equipment} */
const gold_chestplate_equipment = (favour = 0) => {
    return {
        flat_stats: {
            armor: 20,
        },
        multiplicative_stats: {
        },
        type: Equipment_Type.CHESTPLATE,
        image: gold_chestplate_image,
        id: id_counter++,
        display_name: "Gold Chestplate",
        name: "gold_chestplate",
    }
}

/** @type {Create_Equipment} */
const test_helmet_equipment = (favour = 0) => {
    return {
        flat_stats: {
            armor: 10 + Math.trunc(favour / 5 + Math.random()),
        },
        multiplicative_stats: {
            attack_speed: 1.1
        },
        type: Equipment_Type.HELMET,
        image: helmet_image,
        id: id_counter++,
        display_name: "Simple Helmet",
        name: "simple_helment",
    }
}

/** @type {Create_Equipment} */
const test_sword_equipment = (favour = 0) => {
    return {
        flat_stats: {
        },
        multiplicative_stats: {
            attack_speed: 0.85 + 0.05 * Math.trunc(favour / 6 * Math.random()),
        },
        type: Equipment_Type.WEAPON,
        image: sword_image,
        id: id_counter++,
        display_name: "Simple Sword",
        action: melee_attack(),
        name: "simple_sword",
    }
}

/** @type {Create_Equipment} */
const diamond_sword_equipment = (favour = 0) => {
    const adds = {};
    const mults = {};
    if (Math.random() < 0.25) adds.frost = Math.trunc(Math.random() * (6 + favour / 2));
    if (Math.random() < 0.25) mults.frost = 1 + (Math.trunc(Math.random() * (25 + favour))) / 100;
    return {
        flat_stats: {
        },
        multiplicative_stats: {
            attack_speed: 0.85 + 0.05 * Math.trunc(favour / 6 * Math.random()),
        },
        damage_modifiers: {
            adds: adds,
            mults: mults,
        },
        type: Equipment_Type.WEAPON,
        image: diamond_sword_image,
        id: id_counter++,
        display_name: "Diamond Sword",
        action: melee_attack(),
        name: "diamond_sword",
    }
}

/** @type {Create_Equipment} */
const emerald_sword_equipment = (favour = 0) => {
    return {
        flat_stats: {
        },
        multiplicative_stats: {
            attack_speed: 0.85 + 0.05 * Math.trunc(favour / 6 * Math.random()),
        },
        type: Equipment_Type.WEAPON,
        image: emerald_sword_image,
        id: id_counter++,
        display_name: "Emerald Sword",
        action: melee_attack(),
        name: "emerald_sword",
    }
}

/** @type {Create_Equipment} */
const ruby_sword_equipment = (favour = 0) => {
    const adds = {};
    const mults = {};
    if (Math.random() < 0.25) adds.fire = Math.trunc(Math.random() * (6 + favour / 2));
    if (Math.random() < 0.25) mults.fire = 1 + (Math.trunc(Math.random() * (25 + favour))) / 100;
    console.log(adds, mults, favour);

    return {
        flat_stats: {
        },
        multiplicative_stats: {
            attack_speed: 0.85 + 0.05 * Math.trunc(favour / 6 * Math.random()),
        },
        damage_modifiers: {
            adds: adds,
            mults: mults
        },
        type: Equipment_Type.WEAPON,
        image: ruby_sword_image,
        id: id_counter++,
        display_name: "Ruby Sword",
        action: melee_attack(),
        name: "ruby_sword",
    }
}

/** @type {Create_Equipment} */
const gold_sword_equipment = (favour = 0) => {
    return {
        flat_stats: {
        },
        multiplicative_stats: {
            attack_speed: 0.85 + 0.05 * Math.trunc(favour / 6 * Math.random()),
        },
        type: Equipment_Type.WEAPON,
        image: gold_sword_image,
        id: id_counter++,
        display_name: "Gold Sword",
        action: melee_attack(),
        name: "gold_sword",
    }
}

/** @type {Create_Equipment} */
const axe_equipment = (favour = 0) => {
    return {
        flat_stats: {
        },
        multiplicative_stats: {
            attack_speed: 0.5 + 0.05 * Math.trunc(favour / 6 * Math.random()),
        },
        damage_modifiers: {
            adds: {},
            mults: {
                melee: 2,
            }
        },
        type: Equipment_Type.WEAPON,
        image: axe_image,
        id: id_counter++,
        display_name: "Axe",
        action: melee_attack(),
        name: "axe",
    }
}

/** @type {Create_Equipment} */
const test_bow_equipment = (favour = 0) => {
    return {
        flat_stats: {
            movement_speed: 1
        },
        multiplicative_stats: {
            attack_speed: 1.3 + 0.05 * Math.trunc(favour / 6 * Math.random()),
        },
        type: Equipment_Type.WEAPON,
        image: bow_image,
        id: id_counter++,
        display_name: "Simple Bow",
        name: "simple_bow",
        action: aimed_arrow_attack(),
    }
}



// #endregion ----------------------------------------------------------------------
//#region ------------------- Iventory management-----------------------------------

/** @type {(inventory: Inventory, image: HTMLImageElement, boundaries: Margins, margins: Margins, slot_info: Slot_Info) => Inventory_Zone} */
function create_inventory_zone(inventory, image, boundaries, margins, slot_info) {

    const b = [...boundaries];
    let height = b[3] - b[1];
    let width = b[2] - b[0];
    if (b[3] == null || b[1] == null) height = image.height * (width / image.width);
    if (b[2] == null || b[0] == null) width = image.width * (height / image.height);

    if (b[0] == null) b[0] = b[2] - width;
    else if (b[1] == null) b[1] = b[3] - height;
    else if (b[2] == null) b[2] = b[0] + width;
    else if (b[3] == null) b[3] = b[1] + height;

    const zone_boundaries = [
        b[0] + width * margins[0],
        b[1] + height * margins[1],
        b[2] - width * margins[2],
        b[3] - height * margins[3]
    ]

    /** @type {Inventory_Zone} */
    const inventory_zone = {
        visible: false,
        image: image,
        inventory: inventory,
        margins: margins,
        zone_boundaries: zone_boundaries,
        boundaries: b,
        slot_info,
        slots: [],
    }

    init_slots(inventory_zone, inventory);

    return inventory_zone;
}

/** @type {(image: HTMLImageElement, boundaries: Margins, margins: Margins) => Margins} */
function calculate_zone_boundaries(image, boundaries, margins) {
    const b = boundaries;
    let height = b[3] - b[1];
    let width = b[2] - b[0];
    if (b[3] == null || b[1] == null) height = image.height * (width / image.width);
    if (b[2] == null || b[0] == null) width = image.width * (height / image.height);

    if (b[0] == null) b[0] = b[2] - width;
    else if (b[1] == null) b[1] = b[3] - height;
    else if (b[2] == null) b[2] = b[0] + width;
    else if (b[3] == null) b[3] = b[1] + height;

    const zone_boundaries = [
        b[0] + width * margins[0],
        b[1] + height * margins[1],
        b[2] - width * margins[2],
        b[3] - height * margins[3]
    ]

    return zone_boundaries;
}

/** @type {(inventory_zone: Inventory_Zone, inventory: Inventory)} */
function init_slots(inventory_zone, inventory) {
    const slot_info = inventory_zone.slot_info;
    const zone_boundaries = inventory_zone.zone_boundaries;
    const slot_width = slot_info.width;
    const slot_height = slot_info.height;
    const slot_distances = slot_info.slot_distances;
    const slot_margins = slot_info.zone_margin;


    inventory_zone.slots = [];
    inventory_zone.inventory = inventory;

    let slot_index = 0;
    if (inventory)
    {

        inventory.equipment_type_counts = new Map();
        const equipped_type = inventory.type == Inventory_Type.EQUIPPED;

        for (let j = zone_boundaries[1]; j < zone_boundaries[3] - slot_height; j += slot_height + slot_distances[1])
        {
            for (let i = zone_boundaries[0]; i < zone_boundaries[2] - slot_width; i += slot_width + slot_distances[0])
            {
                if (slot_index >= inventory.slot_count) break;

                const equipment = inventory.equipments[slot_index];

                // TODO: Move this where it belongs. Should be done seperate for every inventory, and every equipment
                if (equipment)
                {
                    const current_count = inventory.equipment_type_counts.get(equipment.type) || 0;
                    inventory.equipment_type_counts.set(equipment.type, current_count + 1);

                    if (equipped_type && equipment.type == Equipment_Type.WEAPON)
                    {
                        inventory.entity.basic_attack = equipment.action;
                        inventory.entity.weapon = equipment;
                    }
                }


                /** @type {Slot} */
                const slot = {
                    x: i,
                    y: j,
                    width: slot_width,
                    height: slot_height,
                    equipment: equipment,
                    inventory: inventory,
                    inventory_zone: inventory_zone,
                    index: slot_index,
                    zone_boundaries: [
                        i + slot_width * slot_margins[0],
                        j + slot_height * slot_margins[1], i + slot_width * (1 - slot_margins[2]), j + slot_height * (1 - slot_margins[3])],
                }

                inventory_zone.slots.push(slot);

                slot_index++;
            }
        }
    }
}

function init_action_slots() {
    const slot_info = action_slot_info;
    const zone_boundaries = action_slots_zone_boundaries;
    const slot_width = slot_info.width;
    const slot_height = slot_info.height;
    const slot_distances = slot_info.slot_distances;
    const slot_margins = slot_info.zone_margin;

    let slot_index = 0;

    action_slots.length = 0;

    for (let j = zone_boundaries[1]; j < zone_boundaries[3] - slot_height; j += slot_height + slot_distances[1])
    {
        for (let i = zone_boundaries[0]; i < zone_boundaries[2] - slot_width; i += slot_width + slot_distances[0])
        {
            if (slot_index >= action_slots_count) break;

            const action = player_entity.actions[slot_index];

            /** @type {Action_Slot} */
            const slot = {
                x: i,
                y: j,
                width: slot_width,
                height: slot_height,
                action: action,
                zone_boundaries: [
                    i + slot_width * slot_margins[0],
                    j + slot_height * slot_margins[1],
                    i + slot_width * (1 - slot_margins[2]),
                    j + slot_height * (1 - slot_margins[3])
                ],
            }

            action_slots.push(slot);

            slot_index++;
        }
    }
}

/** @type {(current_slot: Slot, new_slot: Slot, equipment: Equipment)} */
function transfer_equipment(current_slot, new_slot, equipment) {

    const current_inventory = current_slot?.inventory;
    const new_inventory = new_slot?.inventory;
    const new_slot_equipment = new_slot?.equipment;

    const same = current_inventory == new_inventory;
    const same_type = equipment?.type == new_slot_equipment?.type;

    // Item type Counts
    if (!same && !same_type && equipment && new_inventory.equipment_type_limits)
    {
        const count = new_inventory.equipment_type_counts.get(equipment.type) || 0;
        const limit = new_inventory.equipment_type_limits.get(equipment.type);

        const new_type_full = count >= limit;
        if (new_type_full) return;
    }

    if (!same && !same_type && new_slot_equipment && current_inventory.equipment_type_limits)
    {
        const count = current_inventory.equipment_type_counts.get(new_slot_equipment.type) || 0;
        const limit = current_inventory.equipment_type_limits.get(new_slot_equipment.type);

        const current_type_full = count >= limit;
        if (current_type_full) return;
    }

    let current_index;

    // Remove from inventories & lower counts
    if (current_inventory)
    {
        for (current_index = 0; current_index < current_inventory.equipments.length; current_index++)
        {
            const comparison_equipment = current_inventory.equipments[current_index];
            if (comparison_equipment == equipment)
            {
                current_inventory.equipments.splice(current_index, 1);
                const count = current_inventory.equipment_type_counts.get(equipment.type);
                current_inventory.equipment_type_counts.set(equipment.type, count - 1);
                break;
            }
        }
    }

    let new_index = new_inventory.equipments.length;

    if (new_slot_equipment)
    {
        for (new_index = 0; new_index < new_inventory.equipments.length; new_index++)
        {
            const comparison_equipment = new_inventory.equipments[new_index];
            if (comparison_equipment == new_slot_equipment)
            {
                new_inventory.equipments.splice(new_index, 1);
                const count = new_inventory.equipment_type_counts.get(new_slot_equipment.type);
                new_inventory.equipment_type_counts.set(new_slot_equipment.type, count - 1);
                break;
            }
        }
    }

    // Add to inventories & increase counts
    if (new_inventory && equipment)
    {
        new_inventory.equipments.splice(new_index, 0, equipment);
        const count = new_inventory.equipment_type_counts.get(equipment.type) || 0;
        new_inventory.equipment_type_counts.set(equipment.type, count + 1);
    }

    if (new_slot_equipment)
    {
        current_inventory.equipments.splice(current_index, 0, new_slot_equipment);
        const count = current_inventory.equipment_type_counts.get(new_slot_equipment.type) || 0;
        current_inventory.equipment_type_counts.set(new_slot_equipment.type, count + 1);
    }

    new_slot.equipment = equipment;
    current_slot.equipment = new_slot_equipment;

    // Set Weapon if equipped
    if (equipment && new_inventory.type == Inventory_Type.EQUIPPED && equipment.type == Equipment_Type.WEAPON)
    {
        new_inventory.entity.basic_attack = equipment.action;
        new_inventory.entity.weapon = equipment;
    }

    if (new_slot_equipment && current_inventory.type == Inventory_Type.EQUIPPED && new_slot_equipment.type == Equipment_Type.WEAPON)
    {
        current_inventory.entity.basic_attack = new_slot_equipment.action;
        current_inventory.entity.weapon = new_slot_equipment;
    }

    if (current_inventory.type == Inventory_Type.EQUIPPED || new_inventory.type == Inventory_Type.EQUIPPED)
    {
        calculate_entity_stats(current_inventory.entity);
        if (!same) calculate_entity_stats(new_inventory.entity);
    }
}

/** @type {(inventory: Inventory)} */
function close_inventory(inventory) {
    if (!inventory) return;

    if (dragged_slot_zone)
    {
        dragged_slot_zone.zone_boundaries = [...drag_start]
        dragged_slot_zone = null;
    }

    for (let i = 0; i < inventory_zones.length; i++)
    {
        const zone = inventory_zones[i];
        if (zone.inventory == inventory)
        {
            inventory_zones.splice(i, 1);
        }
    }

    if (opened_player_inventory == inventory)
    {
        opened_player_inventory = null;
    }
    if (opened_inventory == inventory)
    {
        opened_inventory = null;
    }

    if (opened_equipped_inventory == inventory)
    {
        opened_equipped_inventory = null;
    }

}

//#endregion -----------------------------------------------------------------------
//#region -------------------- Entity definitions ----------------------------------


/** @type {Create_Entity} */
const red_knight_entity = (x, y, protecting) => {
    const melee_attack_instance = melee_attack();
    const weapon = Math.random() > 0.3 ? test_sword_equipment() : axe_equipment();
    return {
        display_name: "Mean Red Knight",
        x: x,
        y: y,
        entity_type: 'ENEMY',
        base_stats: {
            attack_speed: 1,
            max_hp: hp_base_entity * 1,
            movement_speed: get_random_int(4, 6),
        },
        attack_timer: ticks_per_second,
        enemy_type: Enemy_Type.RED_KNIGHT,
        basic_attack: melee_attack_instance,
        weapon: weapon,
        phase: protecting ? Phase.PROTECTING : Phase.WANDERING,
        phase_states: {
            chasing: {
                action: melee_attack_instance,
                aggro_range: 8,
                lose_range: 12,
            },
            wandering: {
                range: 4
            },
            protecting: {
                max_distance: 10,
                range: 10,
            }

        },
        equipped_items: {
            equipments: [
                test_chestplate_equipment(0),
                test_helmet_equipment(0),
                weapon,
            ],
            type: Inventory_Type.EQUIPPED,
        },
        on_death: [
            (combat_context) => {
                spend_mana(combat_context.source_entity, -20);
            }
        ]
    }
}

/** @type {Create_Entity} */
const red_melee_entity = (x, y, protecting) => {
    const melee_attack_instance = melee_attack();
    return {
        display_name: "Mean Red Square",
        x: x,
        y: y,
        entity_type: 'ENEMY',
        base_stats: {
            attack_speed: 1,
            max_hp: 50,
            movement_speed: get_random_int(3, 7),
        },
        attack_timer: ticks_per_second,
        enemy_type: Enemy_Type.RED_MELEE,
        basic_attack: melee_attack_instance,
        weapon: test_sword_equipment(),
        phase: protecting ? Phase.PROTECTING : Phase.WANDERING,
        phase_states: {
            chasing: {
                action: melee_attack_instance,
                aggro_range: 10,
                lose_range: 15,
            },
            wandering: {
                range: 5
            },
            protecting: {
                max_distance: 5,
                range: 10,
            }

        },
        equipped_items: {
            equipments: [
                test_chestplate_equipment(0),
                test_helmet_equipment(0),
            ],
            type: Inventory_Type.EQUIPPED,
        }
    }
}

/** @type {Create_Entity} */
const red_bow_entity = (x, y) => {
    const bow_attack_instance = bow_attack();
    return {
        display_name: "Mean Red Top Triangle",
        x: x,
        y: y,
        entity_type: 'ENEMY',
        base_stats: {
            attack_speed: 1,
            max_hp: 25,
            movement_speed: get_random_int(4, 7),
        },
        attack_timer: ticks_per_second,
        enemy_type: Enemy_Type.RED_BOW,
        basic_attack: bow_attack_instance,
        weapon: test_bow_equipment(),
        phase: Phase.WANDERING,
        phase_states: {
            chasing: {
                action: bow_attack_instance,
                aggro_range: 10,
                lose_range: 17,
            },
            wandering: {
                range: 5
            },
            kiting: {

            },
        }

    }
}

/** @type {Create_Entity} */
const red_mage_entity = (x, y) => {
    const spike_spell_instance = spike_spell();

    return {
        display_name: "Mean Red Bottom Triangle",
        x: x,
        y: y,
        entity_type: 'ENEMY',
        base_stats: {
            attack_speed: 1,
            max_hp: 25,
            movement_speed: get_random_int(3, 6),
            max_mana: 100,
        },
        attack_timer: ticks_per_second,
        enemy_type: Enemy_Type.RED_MAGE,
        actions: [spike_spell_instance],
        phase: Phase.WANDERING,
        phase_states: {
            chasing: {
                action: spike_spell_instance,
                aggro_range: 12,
                lose_range: 20,
            },
            wandering: {
                range: 5
            },
            kiting: {

            },
        }

    }
}

//#endregion -----------------------------------------------------------------------
//#region ----------------------- Structures ---------------------------------------

const u = -1;

/**
 * @enum {Structure}
 */
const structures = {
    u_structure: {
        create: function (x, y, angle) {
            const favour = (Math.floor((Math.random() - 0.2) * 12));

            const table = loot_tables.standard_chest;
            const chests_equipments = [
                add_equipments_from_table(null, table, loot_table_sums.get(table), 2, favour),
            ]

            const entities = [
                red_melee_entity(x, y, true),
                red_melee_entity(x, y, true),
            ]

            const cells = this.standard_cells.map(row => [...row]);
            const other_cells = this.other_cells.map(row => [...row]);

            replace_with_equipments(cells, chests_equipments);
            replace_with_entities(other_cells, entities);

            place_cells(rotated_array2(cells, angle), x, y);
            place_other_cells(rotated_array2(other_cells, angle), x, y);

        },
        standard_cells: [
            [1, 1, 1, 1, 1],
            [1, 2, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 0, 0, 0, 1],
            [1, 1, 0, 1, 1],
            [u, 0, u, 0, u],
        ],
        other_cells: [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 3, 0, 3, 0],
        ],
        width: 6,
        height: 5,
        weight: 1,
    },
    castle: {
        create: function (x, y, angle) {
            const vertical_wall_cells = rotated_array2(this.horizontal_wall_cells, 90);
            //place_cells(rotated_array2(this.entrance_cells, 90), x, y /* + this.height - this.entrance_cells.height */);

            const margin = 2;
            const wall_thickness = 3;
            const tower_in_between = 6;
            // North wall

            fill_cells([x + margin, y + margin], [x + this.width - margin, y + margin + wall_thickness], Cell_Type.COBBLE_WALL);
            for (let i = x; i < x + this.width / 2; i += margin + tower_in_between)
            {
                fill_cells([i, y], [i + margin, y + margin], Cell_Type.COBBLE_WALL);
            }
            for (let i = x + this.width; i > x + this.width / 2; i -= margin + tower_in_between)
            {
                fill_cells([i - margin, y], [i, y + margin], Cell_Type.COBBLE_WALL);
            }

            // South wall
            fill_cells([x + margin, y + this.height - wall_thickness - margin], [x + this.width - margin, y + this.height - margin], Cell_Type.COBBLE_WALL);
            for (let i = x; i < x + this.width / 2; i += margin + tower_in_between)
            {
                fill_cells([i, y + this.height - margin], [i + margin, y + this.height], Cell_Type.COBBLE_WALL);
            }
            for (let i = x + this.width; i > x + this.width / 2; i -= margin + tower_in_between)
            {
                fill_cells([i - margin, y + this.height - margin], [i, y + this.height], Cell_Type.COBBLE_WALL);
            }

            // East wall
            fill_cells([x + this.width - wall_thickness - margin, y + margin], [x + this.width - margin, y + this.height - margin], Cell_Type.COBBLE_WALL);
            for (let i = y; i < y + this.height / 2; i += margin + tower_in_between)
            {
                fill_cells([x + this.width - margin, i], [x + this.width, i + margin], Cell_Type.COBBLE_WALL);
            }
            for (let i = y + this.height; i > y + this.height / 2; i -= margin + tower_in_between)
            {
                fill_cells([x + this.width - margin, i - margin], [x + this.width, i], Cell_Type.COBBLE_WALL);
            }

            // West wall
            fill_cells([x + margin, y + margin], [x + margin + wall_thickness, y + this.height - margin], Cell_Type.COBBLE_WALL);
            for (let i = y; i < y + this.height / 2; i += margin + tower_in_between)
            {
                fill_cells([x, i], [x + margin, i + margin], Cell_Type.COBBLE_WALL);
            }
            for (let i = y + this.height; i > y + this.height / 2; i -= margin + tower_in_between)
            {
                fill_cells([x, i - margin], [x + margin, i], Cell_Type.COBBLE_WALL);
            }

            const entrance_x = x - this.entrance_cells[0].length / 2 + this.width / 2;
            const entrance_y = y + this.height - this.entrance_cells.length;
            const entrance_enemies = [
                red_knight_entity(x, y, true),
                red_knight_entity(x, y, true),
            ]

            place_cells(this.entrance_cells, entrance_x, entrance_y);
            place_other_cells(replace_with_entities(this.entrance_other_cells(), entrance_enemies), entrance_x, entrance_y);

        },
        entrance_cells: [
            [4, 4, 0, 0, 0, 0, 4, 4],
            [4, 4, 0, 0, 0, 0, 4, 4],
            [4, 4, 0, 0, 0, 0, 4, 4],
            [4, 4, 0, 0, 0, 0, 4, 4],
            [4, 4, 0, 0, 0, 0, 4, 4],
            [4, 4, 0, 0, 0, 0, 4, 4],
            [4, 4, 0, 0, 0, 0, 4, 4],
            [u, 0, 0, 0, 0, 0, 0, u],
        ],
        entrance_other_cells: () => [
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 3, 0, 0, 3, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0],

        ],
        horizontal_wall_cells: [
            [4, 4, 4, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 4, 4],
            [4, 4, 4, 4, 4, 4, 4],
        ],
        small_quad_cells: [
            [4, 4],
            [4, 4]
        ],
        width: 50,
        height: 50,
        weight: 0,
    }
}

/** @type {(array2: Array<Array>, angle: number) => Array<Array>} */
function rotated_array2(array2, angle) {
    if (angle == 0) return array2;
    const rotated = [];

    const r_rows = (angle == 90 || angle == 270) ? array2[0].length : array2.length;
    const r_cols = (angle == 90 || angle == 270) ? array2.length : array2[0].length;

    for (let i = 0; i < r_rows; i++)
    {
        rotated.push([]);
    }

    if (angle == 90)
    {

        for (let i = 0; i < array2.length; i++)
        {
            const row = array2[i];
            for (let j = row.length - 1; j >= 0; j--)
            {
                rotated[r_rows - 1 - j].push(array2[i][j]);
            }
        }

    } else if (angle == 180)
    {

        for (let i = 0; i < array2.length; i++)
        {
            const row = array2[i];
            for (let j = row.length - 1; j >= 0; j--)
            {
                rotated[r_rows - 1 - i].push(array2[i][j]);
            }
        }
    } else if (angle == 270)
    {
        for (let i = array2.length - 1; i >= 0; i--)
        {
            const row = array2[i];
            for (let j = 0; j < row.length; j++)
            {
                rotated[j].push(array2[i][j]);
            }
        }
    }

    return rotated;
}

/** @type {(cells: Cells, chests_equipments: Array<Array<equipments>>)} */
function replace_with_equipments(cells, chests_equipments) {
    let ce_index = 0;
    for (let i = 0; i < cells.length; i++)
    {
        const row = cells[i];
        for (let j = 0; j < row.length; j++)
        {
            if (row[j] === Cell_Type.CHEST)
            {
                /** @type {Inventory} */
                const inventory = { equipments: chests_equipments[ce_index], slot_count: 30, type: Inventory_Type.OTHER };
                row[j] = inventory;
                ce_index++;
            }
        }
    }
    if (ce_index > chests_equipments.length)
        throw new Error("Bad replace_width_equipments usage. Cells had more chests than chests_equipments", cells, chests_equipments);
}

/** @type {(cells: Cells, entities: Array<Entity>)} */
function replace_with_entities(cells, entities) {
    let e_index = 0;
    for (let i = 0; i < cells.length; i++)
    {
        const row = cells[i];
        for (let j = 0; j < row.length; j++)
        {
            if (row[j] === Cell_Type.ENTITY)
            {
                const entity = entities[e_index];
                row[j] = entity;
                e_index++;
            }
        }
    }
    if (e_index > entities.length)
        throw new Error("Bad replace_with_entities usage. Cells had more entities than entities", cells, entities);

    return cells;
}

/** @type {(cells: Cells, x: number, y: number)} */
function place_cells(cells, x, y) {
    for (let i = 0; i < cells.length; i++)
    {
        const row = cells[i];
        for (let j = 0; j < row.length; j++)
        {
            const value = cells[i][j];
            if (value.slot_count)
            {
                area_board[j + x][i + y] = Cell_Type.CHEST;
                chest_inventories.set((j + x) + " " + (i + y), value);
            } else if (value.enemy_type != null)
            {
                value.x = j + x;
                value.y = i + y;
                add_entity(value);
            }
            else if (value == -1)
            {

            } else
                area_board[j + x][i + y] = value;
        }
    }
}

/** @type {(p1: [x,y], p2:[x,y], value: any)} */
function fill_cells(p1, p2, value) {
    for (let i = p1[0]; i < p2[0]; i++)
    {
        for (let j = p1[1]; j < p2[1]; j++)
        {
            area_board[i][j] = value;
        }
    }
}

/** @type {(cells: Cells, x: number, y: number)} */
function place_other_cells(cells, x, y) {
    for (let i = 0; i < cells.length; i++)
    {
        const row = cells[i];
        for (let j = 0; j < row.length; j++)
        {
            const value = cells[i][j];
            if (value.slot_count)
            {
                area_board[j + x][i + y] = Cell_Type.CHEST;
                chest_inventories.set((j + x) + " " + (i + y), value);
            } else if (value.enemy_type != null)
            {
                value.x = j + x;
                value.y = i + y;
                add_entity(value);
            }
        }
    }
}

//#endregion -----------------------------------------------------------------------
//#region ----------------------- Init state ---------------------------------------

/**
 * @enum {Loot_Table}
 */
const loot_tables = {
    standard_chest: [
        [test_amulet_equipment, 1],
        [test_bow_equipment, 1],
        [test_chestplate_equipment, 0.2],
        [ruby_chestplate_equipment, 0.2],
        [diamond_chestplate_equipment, 0.2],
        [gold_chestplate_equipment, 0.2],
        [emerald_chestplate_equipment, 0.2],
        [test_helmet_equipment, 1],
        [test_sword_equipment, 0.2],
        [diamond_sword_equipment, 0.2],
        [emerald_sword_equipment, 0.2],
        [ruby_sword_equipment, 0.2],
        [gold_sword_equipment, 0.2]
    ],
};

/** @type {Map<Loot_Table, number>} */
const loot_table_sums = new Map();

{ // init table_sums
    const table_keys = Object.keys(loot_tables);

    for (let i = 0; i < table_keys.length; i++)
    {
        const key = table_keys[i];
        const table = loot_tables[key];
        loot_table_sums.set(table, table_sum(table));
    }
}

/** @type {(table: loot_table, name: string)} */
function add_loot_table(table, name) {
    loot_tables[name] = table;
    loot_table_sums.set(table, table_sum(table));
}

/** @type {(table: Loot_Table) => number} */
function table_sum(table) {
    let sum = 0;
    table.forEach((entry) => {
        sum += entry[1];
    })

    return sum;
}

/** @type {(loot_table: Loot_Table, table_sum: number) => Equipment} */
function roll_for_table(loot_table, table_sum) {
    let increment = 0;
    let result;
    const rolled_number = Math.random() * table_sum;
    for (let i = 0; i < loot_table.length; i++)
    {
        const entry = loot_table[i];
        increment += entry[1];
        if (rolled_number < increment)
        {
            return entry[0];
        };
    }
}

/** @type {(equipments: Array<Equipment>, table: Loot_Table, sum: number, count: number, favour: number) => Array<Equipment>} */
function add_equipments_from_table(equipments, table, sum, count, favour) {
    if (equipments == null) equipments = [];
    for (let i = 0; i < count; i++)
    {
        const equipment = roll_for_table(table, sum);
        if (equipment) equipments.push(equipment(favour));
    }

    return equipments;
}

const do_world_generation = true;

// World generation
area_board = Array.from({ length: world_area_size }, () => Array(world_area_size).fill(Cell_Type.EMPTY));
for (let i = 0; i < (do_world_generation ? world_area_size : 0); i++)
{
    for (let j = 0; j < world_area_size; j++)
    {
        const random = Math.random();
        area_board[i][j] = random > 0.66 ? Cell_Type.WALL
            : random > 0.003 ? Cell_Type.EMPTY
                : Cell_Type.CHEST;

        if (area_board[i][j] == Cell_Type.CHEST)
        {
            const equipments = [];

            const favour = (Math.floor((Math.random() - 0.2) * 12));

            const table = loot_tables.standard_chest;

            add_equipments_from_table(equipments, table, loot_table_sums.get(table) * 18, 20, favour);

            /** @type {Inventory} */
            const inventory = { equipments: equipments, slot_count: 30, type: Inventory_Type.OTHER };
            chest_inventories.set(i + ' ' + j, inventory);
        }
    }
}

for (let i = 1; i < world_area_size - 1; i++)
{
    for (let j = 1; j < world_area_size - 1; j++)
    {
        if (area_board[i][j] != Cell_Type.WALL) continue;
        if (area_board[i][j - 1] == Cell_Type.WALL || area_board[i][j + 1] == Cell_Type.WALL) continue;
        if (area_board[i - 1][j] == Cell_Type.WALL || area_board[i + 1][j] == Cell_Type.WALL) continue;

        if (Math.random() < 1) area_board[i][j] = Cell_Type.EMPTY;
    }
}

const structure_cells = Array.from({ length: world_area_size }, () => Array(world_area_size).fill(0));

// Castle
const castle_structure = structures.castle;
const castle_pos = [5, 5];
castle_structure.create(castle_pos[0], castle_pos[1], 0);
mark_structure_cells(castle_structure, castle_pos[0], castle_pos[1], 0);


{ // Structures

    const structure_density = 12 / (100 * 100)

    const structure_atempts = Math.ceil(structure_density * world_area_size * world_area_size);

    let structure_weight_sum = 0;

    /** @type {Array<Structure>} */
    const structures_arr = Object.keys(structures).map((key) => {
        structure_weight_sum += structures[key].weight || 0;
        return structures[key];
    }).filter((str) => str.weight != 0);


    let failed_structures = 0;

    for (let i = 0; i < structure_atempts; i++)
    {
        const random = Math.random() * structure_weight_sum;
        let sum = 0;
        let j;
        for (j = 0; j < structures_arr; j++)
        {
            sum += structures_arr[j].weight;
            if (random < sum) break;
        }
        const structure = structures_arr[j];

        const angle = Math.floor(Math.random() * 4) * 90;

        const width = (angle == 90 || angle == 270) ? structure.height : structure.width;
        const height = (angle == 90 || angle == 270) ? structure.width : structure.height;

        const x = Math.floor(Math.random() * (world_area_size - width));
        const y = Math.floor(Math.random() * (world_area_size - height));

        let can_place = true;
        for (let j = x; j < x + width; j++)
        {
            for (let k = y; k < y + height; k++)
            {
                if (structure_cells[j][k] != 0)
                {
                    can_place = false;
                    j = x + width, k = y + height;
                }
            }
        }

        if (!can_place)
        {
            failed_structures += 1;
            continue;
        }

        for (let j = x; j < x + width; j++)
        {
            for (let k = y; k < y + height; k++)
            {
                structure_cells[j][k] = 1;
            }
        }

        structure.create(x, y, angle);
    }

    console.log("Spawned " + (structure_atempts - failed_structures) +
        " Structures out of " + structure_atempts +
        " (" + ((structure_atempts - failed_structures) / structure_atempts * 100).toFixed(1) + "%)");

}

{ // init Entities
    /** @type {Player} */
    const player = {
        id: id_counter++,
        display_name: "test",
    }

    add_player(player);
    player_entity = entities[player.entity_index];


    /** @type {Array<Entity>} */
    const start_entities = [
        red_knight_entity(20, 20),
        /* red_melee_entity(30, 30),
        red_melee_entity(40, 40),
        red_bow_entity(30, 40),
        red_bow_entity(20, 40),
        red_bow_entity(40, 10),
        red_mage_entity(15, 30),
        red_mage_entity(8, 35),
        red_mage_entity(25, 30), */

    ]

    for (let i = 0; i < start_entities.length; i++)
    {
        const entity = start_entities[i];
        add_entity(entity);
    }
}

/** @type {(structure: Structure, x: number, y: number)} */
function mark_structure_cells(structure, x, y, angle = 0) {
    const width = (angle == 90 || angle == 270) ? structure.height : structure.width;
    const height = (angle == 90 || angle == 270) ? structure.width : structure.height;

    for (let j = x; j < x + width; j++)
    {
        for (let k = y; k < y + height; k++)
        {
            structure_cells[j][k] = 1;
        }
    }
}

//#endregion -----------------------------------------------------------------------
//#region -------------------- Entity Management -----------------------------------
/** @type {(entity: Entity)} */
function calculate_entity_stats(entity) {
    if (!entity) return;

    const hp_percent = entity?.stats?.current_hp / entity?.stats?.max_hp;
    const mana_percent = entity?.stats?.current_mana / entity?.stats?.max_mana;

    const old_movement_speed = entity.stats?.movement_speed;

    entity.stats = { ...entity.base_stats };
    entity.damage_modifiers = {
        adds: {
            fire: 0,
            frost: 0,
            lightning: 0,
            poison: 0,
            melee: 0,
            ranged: 0,
        },
        mults: {
            fire: 1,
            frost: 1,
            lightning: 1,
            poison: 1,
            melee: 1,
            ranged: 1,
        }
    }

    if (entity.status_effects.wet)
    {

        entity.stats.attack_speed *= Math.min(2, 50 / (50 + Math.max(-49, entity.status_effects.wet)));
    }

    if (entity.equipped_items?.equipments && entity.equipped_items?.equipments.length != 0)
    {

        const slots_exist = entity.equipped_items == inventory_zones[2]?.inventory;

        const arr = slots_exist ? inventory_zones[2].slots : entity.equipped_items.equipments;

        for (let i = 0; i < arr.length; i++)
        {

            /** @type {Equipment} */
            const equipment = slots_exist ? arr[i].equipment : arr[i];

            if (!equipment) continue;

            if (equipment.flat_stats) // Flat stats
                Object.keys(equipment.flat_stats).forEach((key) => {
                    entity.stats[key] = (entity.stats[key] ?? 0) + equipment.flat_stats[key];
                })
            if (equipment.multiplicative_stats) // Mult stats
                Object.keys(equipment.multiplicative_stats).forEach((key) => {
                    entity.stats[key] = (entity.stats[key] ?? 1) * equipment.multiplicative_stats[key];
                })
            if (equipment.damage_modifiers)
            {
                const adds = equipment.damage_modifiers.adds;
                const mults = equipment.damage_modifiers.mults;

                Object.keys(adds).forEach((key) => { // Flat damage
                    entity.damage_modifiers.adds[key] += adds[key];
                })
                Object.keys(mults).forEach((key) => { // Mult damage
                    entity.damage_modifiers.mults[key] *= mults[key];
                    entity.damage_modifiers.adds[key] *= mults[key];
                })
            }
            if (equipment.extra_effects)
                equipment.extra_effects.forEach((extra_effect) => {
                    extra_effect.effect_callback({ ...extra_effect.context, entity });
                })
        }
    }

    if (entity.status_effects.freezing != null && entity.status_effects.freezing !== 0)
    {
        const speed_mult = 100 / Math.max(10, (100 + entity.status_effects.freezing));
        entity.stats.movement_speed *= speed_mult;
    }

    if (entity?.stats?.current_hp) entity.stats.current_hp = entity.stats.max_hp * hp_percent;

    if (entity?.stats?.current_mana) entity.stats.current_mana = entity.stats.max_mana * mana_percent;

    if (old_movement_speed != null && old_movement_speed != entity.stats.movement_speed && entity.path)
    {
        entity.path.visual_progress *= entity.stats.movement_speed / old_movement_speed;
    }
}

/** @type {(entity: Entity) => Entity} */
function add_entity(entity) {
    entity.id = id_counter++;

    entity.path = {
        entity: entity,
        path_steps: [],
        progress: 0,
        id: id_counter++,
    }
    paths.push(entity.path);

    if (entity.base_stats?.max_hp) entity.base_stats.current_hp = entity.base_stats.max_hp;
    if (entity.base_stats?.max_mana) entity.base_stats.current_mana = entity.base_stats.max_mana;

    if (entity.base_stats) entity.stats = { ...entity.base_stats };

    entities.push(entity);
    entity.entity_index = entities.length - 1;
    if (entity.entity_type === 'PLAYER')
    {
        player_entities.push(entity);
        entity.player_entity_index = player_entities.length - 1;
    } else if (entity.entity_type === 'ENEMY')
    {
        enemy_entities.push(entity);
        entity.enemy_entity_index = enemy_entities.length - 1;
    }

    if (entity.phase == Phase.PROTECTING)
    {
        entity.phase_states.protecting.x = entity.x;
        entity.phase_states.protecting.y = entity.y;
    }

    if (entity.inventory && !entity.inventory.entity) entity.inventory.entity = entity;
    if (entity.equipped_items && !entity.equipped_items.entity) entity.equipped_items.entity = entity;

    if (!entity.status_effects) entity.status_effects = {};

    calculate_entity_stats(entity);

    entity_positions[entity.x][entity.y] = entity;
    return entity;
}

/** @type {(player: Player) => Player} */
function add_player(player) {
    /** @type {Entity} */

    const player_entity = {
        display_name: player.display_name,
        x: 10,
        y: 10,
        next_x: 10,
        next_y: 10,
        path: {
            path_steps: [],
            progress: 0,
        },
        entity_type: 'PLAYER',
        base_stats: {
            attack_speed: 1,
            max_hp: 100,
            movement_speed: 5,
            max_mana: 100,
        },
        attack_timer: ticks_per_second,
        on_kill: [(combat_context) => {
            heal_entity({
                source_entity: combat_context.target_entity,
                target_entity: combat_context.source_entity,
                damage: { amount: combat_context.source_entity.stats.max_hp * 0.25 }
            })
        }],
        on_death: [],
        on_scored_hit: [],
        on_taken_hit: [],
        actions: [
            heal_spell(),
            hammer_spell(),
            construct_spell(),
            spike_spell(),
            freeze_spell(),
            fire_rain_spell(),
            fire_ball_spell(),
        ],
        phase_states: {
            chasing: {
            },
            pathing: {

            }
        },
        phase: Phase.IDLE,
    }

    const player_starting_equipment = [
        test_amulet_equipment(),
        test_chestplate_equipment(),
        test_helmet_equipment(),
        ruby_sword_equipment(),
    ]

    /** @type {Inventory} */
    const equipped_inventory = {
        equipments: player_starting_equipment,
        slot_count: 8,
        type: Inventory_Type.EQUIPPED,
        entity: player_entity,
        equipment_type_limits: new Map([
            [Equipment_Type.AMULET, 2],
            [Equipment_Type.BRACELET, 1],
            [Equipment_Type.CHESTPLATE, 1],
            [Equipment_Type.HELMET, 1],
            [Equipment_Type.WEAPON, 1],
            [Equipment_Type.RING, 1],
        ]),
    };

    /** @type {Inventory} */
    const inventory = {
        equipments: [test_bow_equipment(), axe_equipment()],
        slot_count: 10,
        type: Inventory_Type.PLAYER,
    };

    player_entity.equipped_items = equipped_inventory;
    player_entity.inventory = inventory;

    player.entity_index = add_entity(player_entity).entity_index;
    player.player_index = players.length;
    players.push(player);
    return player;
}

/** @type {(combat_context: Combat_Context)} */
function damage_entity(combat_context) {
    const target_entity = combat_context.target_entity;
    const source_entity = combat_context.source_entity;
    const damage = combat_context.damage;
    const type = damage.type;
    const stats = target_entity.stats;
    const status_effects = target_entity.status_effects;

    const is_physical = type == Damage_Type.MELEE || type == Damage_Type.RANGED;
    const is_magic = type == Damage_Type.FIRE || type == Damage_Type.FROST || type == Damage_Type.LIGHTNING;
    let resulting_amount = damage.amount;

    if (source_entity.damage_modifiers.mults[type] != 1)
    {
        resulting_amount *= source_entity.damage_modifiers.mults[type];
    }

    if (source_entity.damage_modifiers.adds[type] != 0)
    {
        resulting_amount += source_entity.damage_modifiers.adds[type];
    }

    if (is_physical && stats.armor) // Armor
    {
        const armor_mult = 1 - (stats.armor) / (stats.armor + 100);
        resulting_amount *= armor_mult;
    }

    if (type == Damage_Type.FIRE && status_effects.freezing)
    { // Extra fire damage on frost
        const rate = 1 / 4;
        const max_bonus_damage = resulting_amount * 0.5;

        const bonus_damage = Math.min(status_effects.freezing * rate, max_bonus_damage);

        resulting_amount += bonus_damage;
        status_effects.freezing -= bonus_damage / rate;
    }

    if (type == Damage_Type.FIRE && status_effects.wet)
    { // Lower fire damage on wetness
        const rate = 1 / 4;
        const max_malus_damage = resulting_amount * 0.5;

        const malus_damage = Math.min(status_effects.wet * rate, max_malus_damage);

        resulting_amount -= malus_damage;
        status_effects.wet -= malus_damage / rate;
    }

    if (type == Damage_Type.LIGHTNING && status_effects.wet)
    { // Extra lightning damage on wetness
        const rate = 1 / 3;
        const max_bonus_damage = resulting_amount * 0.25;

        const bonus_damage = Math.min(status_effects.wet * rate, max_bonus_damage);

        resulting_amount += bonus_damage;
        status_effects.wet -= bonus_damage / rate;
    }

    target_entity.stats.current_hp -= resulting_amount;

    combat_context.damage.resulting_amount = resulting_amount;

    entity_on_taken_hit(combat_context);
    entity_on_scored_hit(combat_context);

    visual_effects.push({
        duration: ticks_per_second * 0.3,
        entity: target_entity,
        image: damage_Image,
        peak_at: 0.2,
        size: Math.max(1.5, resulting_amount / 10),
        time: 0,
    })

    const text_color = Damage_Type_Colors[type];

    visual_effects.push({
        duration: ticks_per_second * 0.35,
        x: target_entity.x,
        y: target_entity.y,
        draw_callback: (effect) => {
            ctx.font = '20px "Press Start 2P"';
            ctx.fillStyle = text_color;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            ctx.strokeStyle = 'rgb(40,40,40)'; // Farbe der Outline
            ctx.lineWidth = 2;
            const x = (effect.x + 0.5 + (Math.random() - 0.5) * 0.02) * cell_size;
            const y = (effect.y - 0.3) * cell_size;
            ctx.strokeText(resulting_amount.toFixed(0), x, y); // zuerst Outline
            ctx.fillText(resulting_amount.toFixed(0), x, y);

        },
        peak_at: 0.2,
        size: Math.max(1.5, resulting_amount / 10),
        time: 0,
        on_top: true
    })

    if (target_entity.stats.current_hp <= 0)
    {
        entity_on_kill(combat_context);
        entity_on_death(combat_context);
    }
    //console.log('Damaged entity', target_entity);

    calculate_entity_stats(combat_context.source_entity);
}

/** @type {(combat_context: Combat_Context)} */
function affect_entity(combat_context) {
    const target_entity = combat_context.target_entity;

    let resulting_amount = combat_context.damage.amount;

    if (combat_context.damage.status_effect)
    {
        const status_effect = combat_context.damage.status_effect;
        const old_value = target_entity.status_effects[status_effect] || 0;
        target_entity.status_effects[status_effect] = old_value + combat_context.damage.amount;
    }

    calculate_entity_stats(target_entity);

    combat_context.damage.resulting_amount = resulting_amount;

    //console.log('Damaged entity', target_entity);
}

/** @type {(combat_context: Combat_Context)} */
function heal_entity(combat_context) {
    const target_entity = combat_context.target_entity;

    let resulting_amount = combat_context.damage.amount;

    target_entity.stats.current_hp += resulting_amount;
    if (target_entity.stats.current_hp > target_entity.stats.max_hp) target_entity.stats.current_hp = target_entity.stats.max_hp;

    entity_on_heal(combat_context);

    const text_color = Damage_Type_Colors.heal;

    visual_effects.push({
        duration: ticks_per_second * 0.35,
        x: target_entity.x,
        y: target_entity.y,
        draw_callback: (effect) => {
            ctx.font = '20px "Press Start 2P"';
            ctx.fillStyle = text_color;
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';

            ctx.strokeStyle = 'rgb(40,40,40)'; // Farbe der Outline
            ctx.lineWidth = 2;
            const x = (effect.x + 0.5 + (Math.random() - 0.5) * 0.02) * cell_size;
            const y = (effect.y - 0.3) * cell_size;
            ctx.strokeText(resulting_amount.toFixed(0), x, y); // zuerst Outline
            ctx.fillText(resulting_amount.toFixed(0), x, y);

        },
        peak_at: 0.2,
        size: Math.max(1.5, resulting_amount / 10),
        time: 0,
        on_top: true
    })

}

/** @type {(target_entity: Entity, amount: number)} */
function spend_mana(target_entity, amount) {
    target_entity.stats.current_mana = Math.max(0, target_entity.stats.current_mana - amount);
}

/** @type {(combat_context: Combat_Context)} */
function entity_on_heal(combat_context) {
    const target_entity = combat_context.target_entity;
    const heal_percent = combat_context.damage.amount / target_entity.stats.max_hp;
    visual_effects.push({
        duration: ticks_per_second * 0.8,
        entity: combat_context.target_entity,
        image: heal_Image,
        size: Math.max(1, 4 * heal_percent),
        time: 0,
        peak_at: 0.2
    })
}

/** @type {(combat_context: Combat_Context)} */
function entity_on_death(combat_context) {
    const dying_entity = combat_context.target_entity;
    const source_entity = combat_context.source_entity;

    entity_positions[dying_entity.x][dying_entity.y] = null;

    entities_marked_for_delete.push(dying_entity);
    if (dying_entity.on_death)
    {
        dying_entity.on_death.forEach(on_death_callback => {
            on_death_callback(combat_context);
        });
    }

    dying_entity.phase = Phase.DEAD;
}

/** @type {(combat_context: Combat_Context)} */
function entity_on_scored_hit(combat_context) {
    const hitting_entity = combat_context.source_entity;
    if (hitting_entity?.on_scored_hit)
    {
        hitting_entity.on_scored_hit.forEach(on_scored_hit_callback => {
            on_scored_hit_callback(combat_context);
        })
    }
}

/** @type {(combat_context: Combat_Context)}  */
function entity_on_taken_hit(combat_context) {
    const hit_entity = combat_context.target_entity;
    if (hit_entity.on_taken_hit)
    {
        hit_entity.on_taken_hit.forEach(on_taken_hit_callback => {
            on_taken_hit_callback(combat_context);
        })
    }
}

/** @type {(combat_context: Combat_Context)} */
function entity_on_kill(combat_context) {
    const killer_entity = combat_context.source_entity;
    if (killer_entity?.on_kill)
    {
        killer_entity.on_kill.forEach(on_kill_callback => {
            on_kill_callback(combat_context);
        })
    }
}


/** @type {(p1: [x,y], p2: [x,y]) => Entity[]} */
function entities_in_rect(p1, p2) {
    const entities = [];
    const x1 = Math.max(0, p1[0]);
    const y1 = Math.max(0, p1[1]);
    const x2 = Math.min(world_area_size - 1, p2[0]);
    const y2 = Math.min(world_area_size - 1, p2[1]);
    for (let i = x1; i <= x2; i++)
    {
        for (let j = y1; j <= y2; j++)
        {
            const entitiy = entity_positions[i][j];
            if (entity) entities.push(entity);
        }
    }
}

/** @type {(x: number, y: number, size: number) => Entity[]} */
function entities_inside(x, y, size) {
    const result = [];
    const r = (size - 1) / 2;
    const x1 = Math.max(0, Math.floor(x - r));
    const y1 = Math.max(0, Math.floor(y - r));
    const x2 = Math.min(world_area_size - 1, Math.floor(x + r));
    const y2 = Math.min(world_area_size - 1, Math.floor(y + r));
    for (let i = x1; i <= x2; i++)
    {
        for (let j = y1; j <= y2; j++)
        {
            const entity = entity_positions[i][j];
            if (entity) result.push(entity);
        }
    }

    return result;
}

/** @type {(x1: number, y1: number, x2: number, y2: number) => Entity[]} */
function entities_inside_rect(x1, y1, x2, y2) {
    const result = [];
    for (let i = x1; i <= x2; i++)
    {
        for (let j = y1; j <= y2; j++)
        {
            const entity = entity_positions[i][j];
            if (entity) result.push(entity);
        }
    }

    return result;
}

//#endregion -----------------------------------------------------------------------
//#region ------------------------- Render -----------------------------------------

let cell_size = /* 320; */ 60;
let cell_margin = /* 32; */ 6;
let zoom = cell_size / 40.0;
const camera_origin = /* [20, 20] */[canvas.width / 2, canvas.height / 2];
const camera_speed = 7;

/** @type {Cloud[]} */
const clouds = [
    {
        x: 26, y: 15, radius_1: 4, radius_2: 12, offset_x: 0, offset_y: 0, color_1: "rgb(0,0,0,0.5)", color_2: "rgb(0,0,0,0.0)", speed: [0.2, 0.1],
    },
    {
        x: 40, y: 25, radius_1: 0, radius_2: 12, offset_x: 3, offset_y: 2, color_1: "rgb(0,0,0,0.5)", color_2: "rgb(0,0,0,0.0)", speed: [-0.1, 0.2],
    },
    {
        x: 30, y: 55, radius_1: 0, radius_2: 13, offset_x: 3, offset_y: 2, color_1: "rgb(0,0,0,0.5)", color_2: "rgb(0,0,0,0.0)", speed: [-0.3, -0.1],
    }
]

for (let h = 0; h < clouds.length; h++)
{
    const cloud = clouds[h];
    const raindrops = [];
    for (let i = 0; i < 50; i++)
    {
        let x;
        let y;
        do
        {
            x = (Math.random() - 0.5) * 2;
            y = (Math.random() - 0.5) * 2;
        } while (x * x + y * y > 1);

        raindrops.push({
            x: x * cell_size * cloud.radius_2,
            y: y * cell_size * cloud.radius_2,
            height: canvas.height * Math.random(),
            length: 12 + Math.random() * 5,
            speed: 9 + Math.random() * 2,
        });
    }

    cloud.raindrops = raindrops;
}

/** @type {Array<Visual_Effect>} */
const visual_effects = [];


ctx.imageSmoothingEnabled = false;

function draw(time) {


    if (!loaded) return;

    if (!keys_pressed.space && player_entity?.visual_x)
    {
        const camera_distance_x = (player_entity.visual_x / zoom - camera_origin[0]);
        const camera_distance_y = (player_entity.visual_y / zoom - camera_origin[1]);
        const camera_speed_x = camera_distance_x / ticks_per_second * 3;
        const camera_speed_y = camera_distance_y / ticks_per_second * 3;

        camera_origin[0] += Math.abs(camera_speed_x) > 0.10 ? camera_speed_x : 0;
        camera_origin[1] += Math.abs(camera_speed_y) > 0.10 ? camera_speed_y : 0;

    }

    updateCamera();
    time_since_entity_hovered += 1;

    const translation = [Math.floor(-camera_origin[0] * zoom + (canvas.width / 2)), Math.floor(-camera_origin[1] * zoom + canvas.height / 2)];
    hovered_cell = [
        Math.floor((mouse_position[0] - translation[0]) / cell_size),
        Math.floor((mouse_position[1] - translation[1]) / cell_size)
    ]

    if (hovered_cell[0] < 0 || hovered_cell[0] >= world_area_size || hovered_cell[1] < 0 || hovered_cell[1] >= world_area_size)
        hovered_cell = null;

    // Clear
    ctx.fillStyle = 'rgb(200, 200, 220, 1)';
    ctx.strokeStyle = 'gray';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Grid
    const grid_width = 2;

    ctx.beginPath();
    ctx.lineWidth = grid_width;
    for (let i = - (camera_origin[0] * zoom - canvas.width / 2) % cell_size; i < canvas.width; i += cell_size)
    {
        ctx.moveTo(i, 0);
        ctx.lineTo(i, canvas.height);
    }

    for (let i = - (camera_origin[1] * zoom - canvas.height / 2) % cell_size; i < canvas.height; i += cell_size)
    {
        ctx.moveTo(0, i);
        ctx.lineTo(canvas.width, i);
    }
    ctx.stroke();


    ctx.translate(translation[0], translation[1]);

    /* draw_clouds();

    ctx.translate(-translation[0], -translation[1]);

    return; */

    // visual positions
    for (let i = 0; i < entities.length; i++)
    {
        const entity = entities[i];
        if (!entity) continue;

        const new_visual_x = entity.x * cell_size + cell_margin;
        const new_visual_y = entity.y * cell_size + cell_margin;
        //if (Math.abs(new_visual_x - entity.visual_x) > cell_size) console.log('x');
        //if (Math.abs(new_visual_y - entity.visual_y) > cell_size) console.log('y');
        entity.visual_x = Math.abs(new_visual_x - entity.visual_x) > cell_size ? entity.visual_x + (new_visual_x - entity.visual_x) / 2 : new_visual_x;
        entity.visual_y = Math.abs(new_visual_y - entity.visual_y) > cell_size ? entity.visual_y + (new_visual_y - entity.visual_y) / 2 : new_visual_y;

        if (entity.path && entity.path.path_steps.length > 0)
        {
            const next_cell = entity.path.path_steps[0];
            if (next_cell && !entity.path.blocked_by)
            {

                const time_passed = (time - lastRenderTime);
                entity.path.visual_progress += (time_passed / 1000) * entity.stats.movement_speed * (entity.path.visual_mult || 1);

                const progress_x = Math.floor(cell_size * (next_cell[0] - entity.x) * entity.path.visual_progress);
                const progress_y = Math.floor(cell_size * (next_cell[1] - entity.y) * entity.path.visual_progress);
                //if (entity == player_entity) console.log(/* 'x',progress_x,"y", progress_y, */"tp", time_passed, "vp", entity.path.visual_progress, "p%", entity.path.progress / ticks_per_second, "vm", entity.path.visual_mult)

                entity.visual_x += progress_x;
                entity.visual_y += progress_y;


            }
        } else if (entity.path && entity.path.path_steps.length == 0)
        {
            entity.path.visual_progress = 0;
            entity.path.progress = 0;
        }
    }

    // Draw cells
    const left_most_cell = Math.max(0, Math.floor((camera_origin[0] * zoom - canvas.width / 2) / cell_size));
    const right_most_cell = Math.min(world_area_size - 1, Math.floor((camera_origin[0] * zoom + canvas.width / 2) / cell_size + 1));
    const up_most_cell = Math.max(0, Math.floor((camera_origin[1] * zoom - canvas.height / 2) / cell_size));
    const down_most_cell = Math.min(world_area_size - 1, Math.floor((camera_origin[1] * zoom + canvas.height / 2) / cell_size + 1 + 1));

    for (let i = right_most_cell; i >= left_most_cell; i--)
    {
        for (let j = up_most_cell; j < down_most_cell; j++)
        {
            if (area_board[i][j] === Cell_Type.WALL)
            {
                let color = 'rgb(64, 64, 64, 1)'
                ctx.fillStyle = 'black';
                ctx.fillRect(i * cell_size, j * cell_size + cell_size / 2, cell_size, 0.5 * cell_size);
            } else if (area_board[i][j] === Cell_Type.CHEST)
            {
                ctx.drawImage(chest_image, i * cell_size, j * cell_size, cell_size, cell_size);
            } else if (area_board[i][j] === Cell_Type.EMPTY)
            {
                ctx.fillStyle = 'rgb(0, 128, 40, 0.2)'
                ctx.fillRect(i * cell_size + grid_width / 2, j * cell_size + grid_width / 2, cell_size - grid_width, cell_size - grid_width);
            }
            else if (area_board[i][j] === Cell_Type.COBBLE_WALL)
            {
                const gap = 2 * cell_size / 40;
                let color = 'rgb(56, 56, 56, 1)'
                ctx.fillStyle = color;
                ctx.fillRect(i * cell_size, j * cell_size, cell_size, cell_size); // Background
                const gap_color = 'black';
                ctx.fillStyle = gap_color;
                ctx.fillRect(i * cell_size, j * cell_size, cell_size, gap / 2); // Top gap
                ctx.fillRect(i * cell_size, j * cell_size + cell_size - gap / 2, cell_size, gap / 2); // Bottom gap
                ctx.fillRect(i * cell_size, j * cell_size + cell_size / 2 - gap / 2, cell_size, gap); // Middle horizontal Gap
                ctx.fillRect(i * cell_size + cell_size / 2 - gap / 2, j * cell_size, gap, cell_size / 2); // Middle vertical Gap
                ctx.fillRect(i * cell_size, j * cell_size + cell_size / 2, gap / 2, cell_size / 2); // Left vertical Gap
                ctx.fillRect(i * cell_size + cell_size - gap / 2, j * cell_size + cell_size / 2, gap / 2, cell_size / 2); // Right vertical Gap

            }
        }
    }

    ctx.closePath();
    ctx.beginPath();

    // Draw visual effects
    for (let i = 0; i < visual_effects.length; i++)
    {

        const visual_effect = visual_effects[i];
        if (visual_effect && !visual_effect.on_top)
        {
            const entity = visual_effect.entity;

            const resulting_width = cell_size * visual_effect.size;
            const resulting_height = cell_size * visual_effect.size;

            const cell_middle = entity ?
                [entity.visual_x + cell_size / 2, entity.visual_y + cell_size / 2]
                : [visual_effect.x * cell_size + cell_size / 2, visual_effect.y * cell_size + cell_size / 2];

            const duration_percent = visual_effect.time / visual_effect.duration;
            const peak_at = visual_effect.peak_at;

            if (peak_at)
                ctx.globalAlpha = (duration_percent > peak_at ? 1 - (duration_percent - peak_at) / (1 - peak_at)
                    : duration_percent / peak_at)

            if (visual_effect.draw_callback)
            {
                visual_effect.draw_callback(visual_effect);
            } else
            {
                ctx.drawImage(visual_effect.image,
                    cell_middle[0] - resulting_width / 2, cell_middle[1] - resulting_height / 2,
                    resulting_width, resulting_height);
            }
            ctx.globalAlpha = 1;

        }
    }

    // Draw players
    for (let i = 0; i < players.length; i++)
    {
        const player = players[i];
        const entity = entities[player.entity_index];
        if (!entity) continue;
        const x = entity.visual_x;
        const y = entity.visual_y;
        ctx.drawImage(player_image, x, y, 32 * zoom, 32 * zoom);

        draw_equipped_items(entity, x, y, zoom);
    }

    // Draw paths
    ctx.lineWidth = 2;
    for (let i = 0; i < paths.length; i++)
    {
        const path = paths[i];
        if (/* player_entity.path != path || */ path.path_steps.length == 0) continue;
        ctx.beginPath();
        ctx.strokeStyle = 'green';
        ctx.moveTo(path?.path_steps[0][0] * cell_size + cell_size / 2, path?.path_steps[0][1] * cell_size + cell_size / 2);
        for (let j = 1; j < path?.path_steps.length; j++)
        {
            const step = path.path_steps[j];
            ctx.lineTo(step[0] * cell_size + cell_size / 2, step[1] * cell_size + cell_size / 2);
        }
        ctx.stroke();
    }

    const entity_on_hovered_cell = hovered_cell ? entity_positions[hovered_cell[0]][hovered_cell[1]] : null;
    if (entity_on_hovered_cell)
    {
        hovered_entity = entity_on_hovered_cell;
        time_since_entity_hovered = 0;
    }

    if (time_since_entity_hovered == 2 && hovered_entity && keys_pressed.ctrl)
    {
        console.log('Hovered entity:', hovered_entity);
    }

    // Draw entities
    ctx.lineWidth = 3;

    for (let i = 0; i < entities.length; i++)
    {
        const entity = entities[i];
        if (!entity) continue;

        if (time_since_entity_hovered != 0 && entity.next_x && hovered_cell
            && hovered_cell[0] == entity.x + Math.sign(entity.next_x - entity.x)
            && hovered_cell[1] == entity.y + Math.sign(entity.next_y - entity.y))
        {
            hovered_entity = entity;
            time_since_entity_hovered = 0;
        }

        if (entity.entity_type != 'PLAYER')
        {
            const entity_size = cell_size - cell_margin * 2;
            const x = entity.visual_x;
            const y = entity.visual_y;

            if (entity.enemy_type == Enemy_Type.RED_MELEE)
            {
                ctx.fillStyle = 'red';
                ctx.fillRect(x, y, entity_size, entity_size);

                ctx.strokeStyle = hovered_entity == entity ? 'orange' : 'black';
                ctx.strokeRect(x, y, entity_size, entity_size);

            } else if (entity.enemy_type == Enemy_Type.RED_BOW)
            {
                ctx.fillStyle = 'red';
                ctx.moveTo(x, y);
                ctx.beginPath();
                ctx.strokeStyle = hovered_entity == entity ? 'orange' : 'black';
                ctx.lineTo(x + entity_size, y);
                ctx.lineTo(x + entity_size / 2, y + entity_size);
                ctx.lineTo(x, y);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            } else if (entity.enemy_type == Enemy_Type.RED_MAGE)
            {
                ctx.fillStyle = 'red';
                ctx.moveTo(x, y + entity_size);
                ctx.beginPath();
                ctx.strokeStyle = hovered_entity == entity ? 'orange' : 'black';
                ctx.lineTo(x + entity_size / 2, y);
                ctx.lineTo(x + entity_size, y + entity_size);
                ctx.lineTo(x, y + entity_size);
                ctx.closePath();
                ctx.fill();
                ctx.stroke();
            } else if (entity.enemy_type == Enemy_Type.RED_KNIGHT)
            {
                ctx.drawImage(red_ghost_image, x, y, 32 * zoom, 32 * zoom);
            }

            const damage_percent = 1 - Math.max(0, Math.min(1, entity.stats.current_hp / entity.stats.max_hp));
            if (entity.enemy_type != Enemy_Type.RED_KNIGHT)
            {
                ctx.fillStyle = "rgb(0,0,0,0.7)";
                ctx.fillRect(x, y, entity_size, (entity_size) * damage_percent);
            }
            const attack_percent = Math.min(1, entity.stats.attack_speed * entity.attack_timer / ticks_per_second);

            ctx.strokeStyle = 'yellow';

            const bars_width = 4;
            ctx.lineWidth = bars_width;

            ctx.beginPath();
            ctx.moveTo(x, entity.visual_y + cell_size - cell_margin);
            ctx.lineTo(x + (entity_size) * attack_percent, entity.visual_y + cell_size - cell_margin);
            ctx.stroke();

            ctx.strokeStyle = 'red';
            ctx.beginPath();
            ctx.moveTo(x, entity.visual_y + cell_size - cell_margin + bars_width + 1);
            ctx.lineTo(x + (entity_size) * (1 - damage_percent), entity.visual_y + cell_size - cell_margin + bars_width + 1);
            ctx.stroke();

            if (entity.stats.max_mana)
            {
                const mana_percent = Math.min(1, entity.stats.current_mana / entity.stats.max_mana);
                ctx.strokeStyle = 'blue';
                ctx.beginPath();
                ctx.moveTo(x, entity.visual_y + cell_size - cell_margin + (bars_width + 1) * 2);
                ctx.lineTo(x + (entity_size) * (1 - damage_percent), entity.visual_y + cell_size - cell_margin + (bars_width + 1) * 2);
                ctx.stroke();
            }

            draw_equipped_items(entity, x, y, zoom);

        }

    }

    for (let i = right_most_cell; i >= left_most_cell; i--)
    {
        for (let j = up_most_cell; j < down_most_cell; j++)
        {
            const alpha = entity_positions[i][j - 1] ? 0.98 : 1;
            if (area_board[i][j] === Cell_Type.WALL)
            {
                let color = `rgb(64, 64, 64, ${alpha})`;
                ctx.fillStyle = color;
                ctx.fillRect(i * cell_size, (j - 0.5) * cell_size, cell_size, cell_size);
            } else if (area_board[i][j] === Cell_Type.CHEST)
            {

            } else if (area_board[i][j] === Cell_Type.EMPTY)
            {

            }
            else if (area_board[i][j] === Cell_Type.COBBLE_WALL)
            {
                const gap = 2 * cell_size / 40;
                if (j > 0 && area_board[i][j - 1] !== Cell_Type.COBBLE_WALL)
                {
                    ctx.fillStyle = `rgb(68, 68, 68, ${alpha})`;
                    ctx.fillRect(i * cell_size, j * cell_size - cell_size / 2, cell_size, cell_size);
                    ctx.fillStyle = `rgb(40, 40, 40, ${alpha})`;
                    ctx.fillRect(i * cell_size, j * cell_size - cell_size / 2, gap / 2, cell_size); // Left vertical Gap
                    ctx.fillRect(i * cell_size + cell_size - gap / 2, j * cell_size - cell_size / 2, gap / 2, cell_size); // Right vertical Gap
                    ctx.fillRect(i * cell_size, j * cell_size - cell_size / 2, cell_size, gap / 2); // Top gap
                    ctx.fillRect(i * cell_size, j * cell_size + cell_size / 2 - gap / 2, cell_size, gap / 2); // Bottom gap
                }
            }
        }
    }

    if (time_since_entity_hovered >= 15) hovered_entity = null;

    if (hovered_cell)
    {
        ctx.strokeStyle = 'orange';
        ctx.strokeRect(hovered_cell[0] * cell_size, hovered_cell[1] * cell_size, cell_size, cell_size);
    }
    ctx.closePath();
    ctx.beginPath();

    // Draw visual effects on top
    for (let i = 0; i < visual_effects.length; i++)
    {

        const visual_effect = visual_effects[i];
        if (visual_effect && visual_effect.on_top)
        {
            const entity = visual_effect.entity;

            const resulting_width = cell_size * visual_effect.size;
            const resulting_height = cell_size * visual_effect.size;

            const cell_middle = entity ?
                [entity.visual_x + cell_size / 2, entity.visual_y + cell_size / 2]
                : [visual_effect.x * cell_size + cell_size / 2, visual_effect.y * cell_size + cell_size / 2];

            const duration_percent = visual_effect.time / visual_effect.duration;
            const peak_at = visual_effect.peak_at;

            if (peak_at)
                ctx.globalAlpha = (duration_percent > peak_at ? 1 - (duration_percent - peak_at) / (1 - peak_at)
                    : duration_percent / peak_at)

            if (visual_effect.draw_callback)
            {
                visual_effect.draw_callback(visual_effect);
            } else
            {
                ctx.drawImage(visual_effect.image,
                    cell_middle[0] - resulting_width / 2, cell_middle[1] - resulting_height / 2,
                    resulting_width, resulting_height);
            }
            ctx.globalAlpha = 1;

        }
    }

    ctx.closePath();

    draw_clouds(time);
    draw_rain();

    ctx.translate(-translation[0], -translation[1]);

    ctx.fillStyle = 'rgba(255, 235, 150, 0.04)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw HUD
    // HP
    {
        const position = hud_hp_position;
        const margins = hud_hp_margins;
        const width = position[2];
        const height = position[3];

        const hp_percent = 1 - (player_entity ? Math.max(0, player_entity.stats.current_hp / player_entity.stats.max_hp) : 0);

        draw_image_dimensions(hp_bar_image, position);

        ctx.fillStyle = 'rgb(0,0,0,0.7)';
        ctx.fillRect((position[0] + (1 - margins[2]) * width),
            position[1] + margins[1] * height,
            - width * (1 - margins[0] - margins[2]) * hp_percent,
            height * (1 - margins[1] - margins[3]));

    }

    {
        const position = hud_mana_position;
        const margins = hud_hp_margins;
        const width = position[2];
        const height = position[3];

        const mana_percent = 1 - (player_entity ? Math.max(0, player_entity.stats.current_mana / player_entity.stats.max_mana) : 0);

        draw_image_dimensions(mana_bar_image, position);

        ctx.fillStyle = 'rgb(0,0,0,0.7)';
        ctx.fillRect((position[0] + (1 - margins[2]) * width),
            position[1] + margins[1] * height,
            - width * (1 - margins[0] - margins[2]) * mana_percent,
            height * (1 - margins[1] - margins[3]));

    }


    // HP & Mana numbers
    if (player_entity)
    {
        ctx.font = '20px "Press Start 2P"';
        ctx.fillStyle = '#00FF00';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(
            `${player_entity.stats.current_hp.toFixed(0)} / ${player_entity.stats.max_hp.toFixed(0)}`,
            hud_hp_position[0] + hud_hp_position[2] / 2, hud_hp_position[1] + hud_hp_position[3] / 2);

        ctx.fillText(
            `${player_entity.stats.current_mana.toFixed(0)} / ${player_entity.stats.max_mana.toFixed(0)}`,
            hud_mana_position[0] + hud_mana_position[2] / 2, hud_mana_position[1] + hud_mana_position[3] / 2);
    }

    // Attack timer
    ctx.fillStyle = 'black';

    ctx.drawImage(slot_image, weapon_slot.x, weapon_slot.y, weapon_slot.width, weapon_slot.height);

    const zone_boundaries = weapon_slot.zone_boundaries;
    if (player_entity.weapon)
    {
        draw_image_boundaries(player_entity.weapon.image, zone_boundaries);

        ctx.fillStyle = 'rgb(0,0,0,0.7';
        const attack_percent = 1 - Math.min(1, player_entity.stats.attack_speed * player_entity.attack_timer / ticks_per_second);
        ctx.fillRect(zone_boundaries[0],
            zone_boundaries[3],
            zone_boundaries[2] - zone_boundaries[0],
            -(zone_boundaries[3] - zone_boundaries[1]) * attack_percent,
        )
    }

    // Action Slots
    ctx.fillStyle = 'rgb(0,0,0,0.7)'
    if (!inventory_zones[2].visible)
    {
        draw_image_boundaries(actions_slots_image, action_slots_boundaries);

        for (let i = 0; i < action_slots.length; i++)
        {
            const slot = action_slots[i];
            ctx.drawImage(action_slot_info.image, slot.x, slot.y, slot.width, slot.height);
            if (slot.action?.image)
            {
                const b = slot.zone_boundaries;
                draw_image_boundaries(slot.action.image, b);
                const cooldown_percent = 1 - Math.min(1, (tick_counter - slot.action.cooldown_date) / slot.action.cooldown);
                ctx.fillRect(b[0], b[3], b[2] - b[0], - (b[3] - b[1]) * cooldown_percent);
            }
        }
    }

    // Entity hover info
    if (hovered_entity && keys_pressed.ctrl)
    {

        //draw_image_boundaries(info_small_image, info_small_boundaries);
        draw_image_boundaries(side_info_image, side_info_boundaries);


        ctx.fillStyle = '#00FF00';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';


        const stats_keys = Object.keys(hovered_entity.stats);
        const strings = {};


        ctx.font = '20px "Press Start 2P"';

        const zone_b = side_info_zone_boundaries;
        let line_height = zone_b[1];

        ctx.fillText("" + hovered_entity.display_name + " stats", zone_b[0], line_height, zone_b[2] - zone_b[0]);
        line_height += 20;
        ctx.fillText("----------------------------------", zone_b[0], line_height, zone_b[2] - zone_b[0]);
        line_height += 20;

        ctx.font = '15px "Press Start 2P"';

        stats_keys.forEach((key) => {
            const value = hovered_entity.stats[key];
            if (!strings[key] && Stat_Display_Names[key] != null)
            {
                strings[key] = "" + (Stat_Display_Names[key]) + ": "
                strings[key] += value.toFixed(1);
            }
        })

        const str_keys = Object.keys(strings);
        for (let i = 0; i < str_keys.length; i++)
        {
            const str = strings[str_keys[i]];
            if (str)
                ctx.fillText(str, zone_b[0], line_height, zone_b[2] - zone_b[0]);
            line_height += 17;
        }

        ctx.fillText("-------------------------", zone_b[0], line_height, zone_b[2] - zone_b[0]);
        line_height += 17;


        if (hovered_entity.basic_attack)
        {
            ctx.fillText(hovered_entity.basic_attack.name, zone_b[0], line_height, zone_b[2] - zone_b[0]);
            line_height += 17;
        }

        for (let i = 0; i < hovered_entity.actions?.length || 0; i++)
        {
            const action = hovered_entity.actions[i];
            if (!action) continue;

            ctx.fillText(action.name, zone_b[0], line_height, zone_b[2] - zone_b[0]);
            line_height += 17;
        }
    }

    // Action hover info
    if (hovered_action_slot && keys_pressed.ctrl)
    {
        draw_image_boundaries(side_info_image, side_info_boundaries);


        ctx.fillStyle = '#00FF00';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';

        const action = hovered_action_slot.action;

        const strings = {};

        ctx.font = '20px "Press Start 2P"';

        const zone_b = side_info_zone_boundaries;
        let line_height = zone_b[1];

        ctx.fillText("" + action.name + " stats", zone_b[0], line_height, zone_b[2] - zone_b[0]);
        line_height += 20;
        ctx.fillText("----------------------------------", zone_b[0], line_height, zone_b[2] - zone_b[0]);
        line_height += 20;

        ctx.font = '15px "Press Start 2P"';

        strings["range"] = "" + (Action_Display_Names["range"]) + ": " + action.range.toFixed(1);
        strings["cooldown"] = "" + (Action_Display_Names["cooldown"]) + ": " + (action.cooldown / ticks_per_second).toFixed(1);
        strings["mana_cost"] = "" + (Action_Display_Names["mana_cost"]) + ": " + action.mana_cost.toFixed(1);
        strings["type"] = "" + (Action_Display_Names["type"]) + ": " + action.type;
        strings["damage"] = "" + (Action_Display_Names["damage"]) + ": " + action.damage.toFixed(0);

        const str_keys = Object.keys(strings);
        for (let i = 0; i < str_keys.length; i++)
        {
            const str = strings[str_keys[i]];
            if (str)
                ctx.fillText(str, zone_b[0], line_height, zone_b[2] - zone_b[0]);
            line_height += 17;
        }

        ctx.fillText("-------------------------", zone_b[0], line_height, zone_b[2] - zone_b[0]);
        line_height += 17;
    }

    // Inventory
    for (let i = 0; i < inventory_zones.length; i++)
    {
        const inventory_zone = inventory_zones[i];
        if (!inventory_zone.visible) continue;

        draw_image_boundaries(inventory_zone.image, inventory_zone.boundaries);
        const slot_img = inventory_zone.slot_info.image;

        for (let j = 0; j < inventory_zone.slots.length; j++)
        {
            const slot = inventory_zone.slots[j];

            if (slot_img)
            {
                ctx.drawImage(slot_img, slot.x, slot.y, slot.width, slot.height);
            }

            const equipment = slot.equipment;
            if (equipment)
            {
                draw_image_boundaries(equipment.image, slot.zone_boundaries);
            }
        }
    }

    let hovered_equipment;

    // Equipment Info in Inventory
    if (inventory_zones[0].visible)
    {
        draw_image_boundaries(info_image, info_boundaries);


        if (hovered_slot || dragged_slot_zone)
        {

            const equipment = hovered_slot?.equipment || dragged_slot_zone?.equipment;
            if (equipment)
            {
                hovered_equipment = equipment;
                const keys = Object.keys(equipment.flat_stats);
                const boundaries = info_zone_boundaries;


                const strings = {};

                const flat_stat_keys = Object.keys(equipment.flat_stats);
                flat_stat_keys.forEach((key) => {
                    const value = equipment.flat_stats[key];
                    if (!strings[key])
                    {
                        strings[key] = "" + (Stat_Display_Names[key] || key) + ": "
                    }

                    strings[key] += value
                })

                const multiplicative_stat_keys = Object.keys(equipment.multiplicative_stats);
                multiplicative_stat_keys.forEach((key) => {
                    const value = equipment.multiplicative_stats[key];
                    if (!strings[key])
                    {
                        strings[key] = "" + (Stat_Display_Names[key] || key) + ": "
                    } else
                    {
                        strings[key] += " | "
                    }

                    strings[key] += (value * 100 - 100).toFixed(1) + "%";
                })

                delete strings["current_hp"];

                const damage_mult_keys = Object.keys(equipment.damage_modifiers?.mults || {});
                damage_mult_keys.forEach((key) => {
                    const value = equipment.damage_modifiers.mults[key];
                    if (!strings[key])
                    {
                        strings[key] = "" + (Damage_Display_Names[key]) + ": "
                        strings[key] += (value > 0 ? "+" : "") + ((value - 1) * 100).toFixed(1) + "%";
                    }
                })

                const damage_add_keys = Object.keys(equipment.damage_modifiers?.adds || {});
                damage_add_keys.forEach((key) => {
                    const value = equipment.damage_modifiers.adds[key];
                    if (!strings[key])
                    {
                        strings[key] = "" + (Damage_Display_Names[key] || key) + ": "
                        strings[key] += (value > 0 ? "+" : "") + value.toFixed(1);
                    } else
                    {
                        strings[key] += " | " + (value > 0 ? "+" : "") + value.toFixed(1);
                    }
                })



                let line_height = boundaries[1];

                ctx.font = '30px "Press Start 2P"';
                ctx.fillStyle = '#00FF00';
                ctx.textAlign = 'left';
                ctx.textBaseline = 'top';

                ctx.fillText(equipment.display_name, boundaries[0], line_height, boundaries[2] - boundaries[0]);
                line_height += 40;
                ctx.fillText("----------------------------------", boundaries[0], line_height, boundaries[2] - boundaries[0]);
                line_height += 40;

                ctx.font = '20px "Press Start 2P"';

                const str_keys = Object.keys(strings);
                for (let i = 0; i < str_keys.length; i++)
                {
                    const str = strings[str_keys[i]];
                    ctx.fillText(str, boundaries[0], line_height, boundaries[2] - boundaries[0]);
                    line_height += 30
                }
            }

        }

        // Comparison with hovered equipment
        if (hovered_equipment)
        {
            let hovered_is_usefull = false;

            for (let i = 0; i < inventory_zones.length; i++)
            {
                const inventory_zone = inventory_zones[i];
                if (!inventory_zone.visible) continue;

                for (let j = 0; j < inventory_zone.slots.length; j++)
                {
                    const slot = inventory_zone.slots[j];

                    const equipment = slot.equipment;
                    if (equipment && equipment.name == hovered_equipment.name && equipment != hovered_equipment)
                    {

                        let has_worse_stat = false;
                        let has_better_stat = false;
                        let missing_stat = false;

                        eq_f_keys = Object.keys(equipment.flat_stats);

                        for (let i = 0; i < eq_f_keys.length; i++)
                        {
                            const key = eq_f_keys[i];

                            const e_stat = equipment.flat_stats[key];
                            const h_stat = hovered_equipment.flat_stats[key];

                            if (h_stat == null)
                                missing_stat = true;
                            else if (e_stat == h_stat)
                                continue;
                            else if (e_stat < h_stat)
                                has_worse_stat = true;
                            else
                                has_better_stat = true;
                        }

                        eq_m_keys = Object.keys(equipment.multiplicative_stats);

                        for (let i = 0; i < eq_m_keys.length; i++)
                        {
                            const key = eq_m_keys[i];

                            const e_stat = equipment.multiplicative_stats[key];
                            const h_stat = hovered_equipment.multiplicative_stats[key];

                            if (h_stat == null)
                                missing_stat = true;
                            else if (e_stat == h_stat)
                                continue;
                            else if (e_stat < h_stat)
                                has_worse_stat = true;
                            else
                                has_better_stat = true;
                        }

                        if (missing_stat)
                            ctx.fillStyle = 'rgb(128,128,128,0.7)';
                        else if (has_worse_stat && has_better_stat)
                            ctx.fillStyle = 'rgb(128,128,0,0.7)';
                        else if (has_worse_stat)
                        {
                            ctx.fillStyle = 'rgb(128,0,0,0.7)';
                            if (slot.inventory != hovered_slot?.inventory) hovered_is_usefull = true;
                        }
                        else if (has_better_stat)
                            ctx.fillStyle = 'rgb(0,128,0,0.7)';
                        else
                            continue;

                        const boundaries = slot.zone_boundaries;
                        //ctx.fillStyle = 'rgb(128,128,0,0.7)';
                        ctx.fillRect(boundaries[0], boundaries[1], boundaries[2] - boundaries[0], boundaries[3] - boundaries[1]);


                    }
                }
            }

            if (hovered_is_usefull && hovered_slot && !dragged_slot_zone)
            {
                const boundaries = hovered_slot.zone_boundaries;
                ctx.fillStyle = 'rgb(0,128,0,0.5)';
                ctx.fillRect(boundaries[0], boundaries[1], boundaries[2] - boundaries[0], boundaries[3] - boundaries[1]);
            }

        }

        // Player stats

        ctx.font = '30px "Press Start 2P"';
        ctx.fillStyle = '#00FF00';
        ctx.textAlign = 'left';
        ctx.textBaseline = 'top';
        ctx.font = '20px "Press Start 2P"';

        let line_height = info_zone_boundaries[3];

        const stats_keys = Object.keys(player_entity.stats);
        const strings = {};
        stats_keys.forEach((key) => {
            const value = player_entity.stats[key];
            if (!strings[key] && Stat_Display_Names[key] != null)
            {
                strings[key] = "" + (Stat_Display_Names[key]) + ": "
                strings[key] += value.toFixed(1);
            }
        })

        const damage_keys = Object.keys(player_entity.damage_modifiers.adds);
        damage_keys.forEach((key) => {
            const add_value = player_entity.damage_modifiers.adds[key];
            const mult_value = player_entity.damage_modifiers.mults[key];
            if (!strings[key] && Damage_Display_Names[key] != null && (add_value != 0 || mult_value != 1))
            {
                strings[key] = "" + (Damage_Display_Names[key]) + ": "
                strings[key] += ((mult_value - 1) * 100).toFixed(1) + "%" + " | " + (add_value > 0 ? "+" : "") + add_value.toFixed(1);
            }
        })

        const str_keys = Object.keys(strings);
        for (let i = 0; i < str_keys.length; i++)
        {
            const str = strings[str_keys[i]];
            if (str)
                ctx.fillText(str, info_zone_boundaries[0], line_height, info_zone_boundaries[2] - info_zone_boundaries[0]);
            line_height -= 30
        }

        ctx.font = '30px "Press Start 2P"';

        line_height -= 10;
        ctx.fillText("----------------------------------", info_zone_boundaries[0], line_height, info_zone_boundaries[2] - info_zone_boundaries[0]);
        line_height -= 40;
        ctx.fillText("Player stats", info_zone_boundaries[0], line_height, info_zone_boundaries[2] - info_zone_boundaries[0]);

    }

    // Draw test text
    /* ctx.font = '20px "Press Start 2P"';
    ctx.fillStyle = '#00FF00';
    ctx.textAlign = 'left';
    ctx.textBaseline = 'middle';
    ctx.fillText(player_entity?.path?.visual_mult, 40, 40); */


    if (dragged_slot_zone)
        draw_image_boundaries(dragged_slot_zone.equipment.image, dragged_slot_zone.zone_boundaries);

}


let lastRenderTime = performance.now();
function render(time) {
    draw(time);
    const t1 = time;
    const t2 = lastRenderTime;
    lastRenderTime = time;
    requestAnimationFrame(render);
}

/** @type {(img: HTMLImageElement, dimensions: Dimensions)} */
function draw_image_dimensions(img, dimensions) {
    ctx.drawImage(img, dimensions[0], dimensions[1], dimensions[2], dimensions[3]);
}

/** @type {(img: HTMLImageElement, boundaries: Margins)} */
function draw_image_boundaries(img, boundaries) {
    ctx.drawImage(img, boundaries[0], boundaries[1], boundaries[2] - boundaries[0], boundaries[3] - boundaries[1]);
}

/** @type {(entity: Entity, x: number, y: number, zoom: number)} */
function draw_equipped_items(entity, x, y, zoom) {

    /** @type {Set<HTMLImageElement} */
    const images = new Set();

    for (let j = 0; j < entity.equipped_items.equipments.length; j++)
    {
        const equipment = entity.equipped_items.equipments[j];
        if (equipment?.image)
        {
            images.add(equipment.image);
        }
    }

    if (images.has(chestplate_image)) ctx.drawImage(chestplate_image, x, y, 32 * zoom, 32 * zoom);
    if (images.has(ruby_chestplate_image)) ctx.drawImage(ruby_chestplate_image, x, y, 32 * zoom, 32 * zoom);
    if (images.has(emerald_chestplate_image)) ctx.drawImage(emerald_chestplate_image, x, y, 32 * zoom, 32 * zoom);
    if (images.has(gold_chestplate_image)) ctx.drawImage(gold_chestplate_image, x, y, 32 * zoom, 32 * zoom);
    if (images.has(diamond_chestplate_image)) ctx.drawImage(diamond_chestplate_image, x, y, 32 * zoom, 32 * zoom);

    if (images.has(amulet_image)) ctx.drawImage(amulet_image, 0, 2, 16, 14, x + 8 * zoom, y + 4 * zoom, 16 * zoom, 14 * zoom);
    if (images.has(helmet_image)) ctx.drawImage(helmet_image, x, y - 32 * zoom + 1, 32 * zoom, 32 * zoom);

    if (images.has(sword_image)) ctx.drawImage(sword_image, x - zoom * 0, y, 32 * zoom, 32 * zoom);
    if (images.has(ruby_sword_image)) ctx.drawImage(ruby_sword_image, x - zoom * 0, y, 32 * zoom, 32 * zoom);
    if (images.has(emerald_sword_image)) ctx.drawImage(emerald_sword_image, x - zoom * 0, y, 32 * zoom, 32 * zoom);
    if (images.has(gold_sword_image)) ctx.drawImage(gold_sword_image, x - zoom * 0, y, 32 * zoom, 32 * zoom);
    if (images.has(diamond_sword_image)) ctx.drawImage(diamond_sword_image, x - zoom * 0, y, 32 * zoom, 32 * zoom);

    if (images.has(axe_image)) ctx.drawImage(axe_image, x - zoom * 0, y - 48 * zoom / 3, 48 * zoom, 48 * zoom);

    if (images.has(bow_image)) ctx.drawImage(bow_image, x, y, 32 * zoom, 32 * zoom);
    //ctx.drawImage(bow_image, x, y, 32 * zoom, 32 * zoom);

}

function draw_clouds(time) {
    const cloud_speed_mult = 2;

    // Draw clouds
    clouds.forEach(cloud => {
        const gradient = ctx.createRadialGradient(
            (cloud.x + cloud.offset_x) * cell_size, (cloud.y + cloud.offset_y) * cell_size, cloud.radius_1 * cell_size,
            cloud.x * cell_size, cloud.y * cell_size, cloud.radius_2 * cell_size);
        gradient.addColorStop(0, cloud.color_1);
        gradient.addColorStop(1, cloud.color_2);

        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(cloud.x * cell_size, cloud.y * cell_size, cloud.radius_2 * cell_size, 0, 2 * Math.PI);
        ctx.fill();

        cloud.x += cloud_speed_mult * cloud.speed[0] * (time - lastRenderTime) / 1000

        if (cloud.x > world_area_size + cloud.radius_2)
            cloud.x -= world_area_size + 2 * cloud.radius_2;
        if (cloud.x < - cloud.radius_2)
            cloud.x += world_area_size + 2 * cloud.radius_2;

        cloud.y += cloud_speed_mult * cloud.speed[1] * (time - lastRenderTime) / 1000
        if (cloud.y > world_area_size + cloud.radius_2)
            cloud.y -= world_area_size + 2 * cloud.radius_2;
        if (cloud.y < - cloud.radius_2)
            cloud.y += world_area_size + 2 * cloud.radius_2;
    });
}

function draw_rain() {

    for (let i = 0; i < clouds.length; i++)
    {
        const cloud = clouds[i];
        ctx.strokeStyle = 'rgba(173, 216, 256, 0.5)';
        ctx.lineWidth = 6 * zoom / 2;
        ctx.beginPath();
        for (let drop of cloud.raindrops)
        {
            ctx.moveTo(cloud.x * cell_size + drop.x * zoom / 2, cloud.y * cell_size + drop.y * zoom / 2 - drop.height / 2);
            ctx.lineTo(cloud.x * cell_size + drop.x * zoom / 2, cloud.y * cell_size + drop.y * zoom / 2 - drop.height / 2 + drop.length * zoom / 2);
            drop.height -= drop.speed * zoom / 2;
            if (drop.height <= 0)
            {
                drop.height += canvas.height;
            }
        }

        ctx.stroke();
    }

}

//#endregion -----------------------------------------------------------------------
//#region --------------------- Input handling -------------------------------------

const mouse_position = [0, 0];
let time_since_entity_hovered = 0;

/** @type {Slot} */
let hovered_slot;

/** @type {Action_Slot} */
let hovered_action_slot;

/** @type {Slot} */
let dragged_slot_zone;

/** @type {Margins} */
let drag_start;

const keys_pressed = {
    w: false,
    a: false,
    s: false,
    d: false,
    shift: false,
    space: false,
    left_mouse_button: false,
    right_mouse_button: false,
}

const keys_typed = {
    left_mouse_button: false,
    right_mouse_button: false,
    e: false,
    y: false,
    "1": false,
    "2": false,
    "4": false,
    "5": false,
    "6": false,
    "7": false,
    "8": false,
    "9": false,
}

function updateCamera() {
    if (keys_pressed.w)
    {
        camera_origin[1] -= camera_speed;
    }
    if (keys_pressed.a)
    {
        camera_origin[0] -= camera_speed
    }
    if (keys_pressed.s)
    {
        camera_origin[1] += camera_speed;
    }
    if (keys_pressed.d)
    {
        camera_origin[0] += camera_speed;
    }
}

function handle_inputs() {



    left_mouse_button: if (keys_typed.left_mouse_button)
    {
        keys_typed.left_mouse_button = false;

        if (inventory_zones[0].visible || inventory_zones[1].visible)
        {
            console.log('hovered', hovered_slot)
            if (hovered_slot && hovered_slot.equipment)
            {
                dragged_slot_zone = hovered_slot;
                console.log('start drag');
                drag_start = [...hovered_slot.zone_boundaries];
            }
            break left_mouse_button;
        }

        const translation = [-camera_origin[0] * zoom + (canvas.width / 2), -camera_origin[1] * zoom + canvas.height / 2];
        clicked_cell = [
            Math.floor((mouse_position[0] - translation[0]) / cell_size),
            Math.floor((mouse_position[1] - translation[1]) / cell_size)
        ]

        if (area_board[clicked_cell[0]][clicked_cell[1]] == Cell_Type.WALL)
        {
            const raw_position_x = (mouse_position[0] - translation[0]) / cell_size;
            const raw_position_y = (mouse_position[1] - translation[1]) / cell_size;
            const nearby_position_x = raw_position_x - clicked_cell[0] < 0.5 ? clicked_cell[0] - 1 : clicked_cell[0] + 1;
            const nearby_position_y = raw_position_y - clicked_cell[1] < 0.5 ? clicked_cell[1] - 1 : clicked_cell[1] + 1;
            if (area_board[nearby_position_x][nearby_position_y] != Cell_Type.WALL)
            {
                clicked_cell[0] = nearby_position_x;
                clicked_cell[1] = nearby_position_y;
            }
        }

        player_entity.phase = Phase.PATHING;
        if (keys_pressed.shift && player_entity.path.path_steps.length > 0)
        {
            const existing_path = player_entity.path;
            const last_step = existing_path.path_steps[existing_path.path_steps.length - 1];
            const path_steps = calculate_path_positions([last_step[0], last_step[1]], clicked_cell);

            if (path_steps != null) change_path(player_entity, path_steps, true);
        } else
        {
            const path_steps = calculate_path_positions([player_entity.next_x, player_entity.next_y], clicked_cell);

            if (path_steps != null) change_path(player_entity, path_steps);
        }

    }

    if (keys_pressed.left_mouse_button)
    {
        if (dragged_slot_zone)
        {
            const boundaries = dragged_slot_zone.zone_boundaries;
            const zone_width = boundaries[2] - boundaries[0];
            const zone_height = boundaries[3] - boundaries[1];
            boundaries[0] = mouse_position[0] - zone_width / 2;
            boundaries[1] = mouse_position[1] - zone_height / 2;
            boundaries[2] = mouse_position[0] + zone_width / 2;
            boundaries[3] = mouse_position[1] + zone_height / 2;

        }
    } else if (!keys_pressed.left_mouse_button)
    {
        if (dragged_slot_zone)
        {
            let moved = false;
            transfer_eq: for (let i = 0; i < inventory_zones.length; i++)
            {
                const zone = inventory_zones[i];

                for (let j = 0; j < zone.slots.length; j++)
                {
                    const slot = zone.slots[j];
                    const boundaries = slot.zone_boundaries;

                    const mouse_inside = mouse_position[0] > boundaries[0] && mouse_position[0] < boundaries[2]
                        && mouse_position[1] > boundaries[1] && mouse_position[1] < boundaries[3];
                    if (mouse_inside)
                    {
                        if (slot != dragged_slot_zone)
                        {
                            transfer_equipment(dragged_slot_zone, slot, dragged_slot_zone.equipment);

                            moved = true;
                            break transfer_eq;
                        }

                    }
                }
            }
            dragged_slot_zone.zone_boundaries = [...drag_start];
            dragged_slot_zone = null;
            drag_start = [];

        }
    }


    right_mouse_button: if (keys_typed.right_mouse_button)
    {
        keys_typed.right_mouse_button = false;

        if (inventory_zones[0].visible || inventory_zones[1].visible)
        {

            if (hovered_slot && hovered_slot.inventory != inventory_zones[2].inventory && hovered_slot.equipment)
            {
                const new_slot = inventory_zones[2].slots.find((slot) => {
                    const equipment = slot.equipment;
                    return equipment?.type == hovered_slot.equipment.type;
                })
                if (new_slot) transfer_equipment(hovered_slot, new_slot, hovered_slot.equipment);
            }

        } else
        {
            const target_entity = hovered_entity;
            const context = { target_entity, source_entity: player_entity, target_cell: [hovered_cell[0], hovered_cell[1]] };
            if (!target_entity)
            {
                take_action(context, player_entity.basic_attack);
                break right_mouse_button;
            }


            player_entity.phase = Phase.CHASING;
            player_entity.phase_states.chasing.action = player_entity.basic_attack;
            player_entity.phase_states.chasing.target = target_entity;
        }
    }

    if (keys_typed.e) e: {
        keys_typed.e = false;

        const cell = area_board[player_entity.x][player_entity.y];
        if (inventory_zones[1].visible)
        {
            inventory_zones[0].visible = false;
            inventory_zones[1].visible = false;
            inventory_zones[2].visible = false;
        } else if (cell == Cell_Type.CHEST)
        {
            opened_inventory = chest_inventories.get(player_entity.x + " " + player_entity.y);

            init_slots(inventory_zones[1], opened_inventory);
            inventory_zones[1].visible = true;
            if (!opened_player_inventory) inventory_zones[0].visible = true;

            if (!opened_equipped_inventory)
            {
                inventory_zones[2].visible = true;
            }
        } else if (inventory_zones[0].visible)
        {
            inventory_zones[0].visible = false;
            inventory_zones[2].visible = false;
        } else if (!inventory_zones[0].visible)
        {
            inventory_zones[0].visible = true;
            inventory_zones[2].visible = true;
        }


    }

    // 1 - 9
    for (let i = 1; i <= 9; i++)
    {
        if (keys_typed[i])
        {
            keys_typed[i] = false;

            if (inventory_zones[0].visible || inventory_zones[1].visible)
            {

                if (hovered_slot)
                {
                    const new_slot = inventory_zones[2].slots[i - 1];
                    if (new_slot) transfer_equipment(hovered_slot, new_slot, hovered_slot.equipment);
                }

            } else
            {
                keys_typed[i] = false;
                const action = action_slots[i - 1].action;
                const target_entity = keys_pressed.shift ? player_entity : hovered_entity;
                const context = { target_entity, source_entity: player_entity }
                if (action)
                {
                    take_action(context, action);
                }
            }
        }
    }
}

//#endregion -----------------------------------------------------------------------
//#region ------------------------ Listeners ---------------------------------------
window.addEventListener('keydown', (event) => {
    const key = event.code.replace("Digit", "").replace("Key", "");
    //console.log('key', key.toLowerCase());
    switch (key.toLowerCase())
    {
        case 'w':
            keys_pressed.w = true;
            break;
        case 'a':
            keys_pressed.a = true;
            break;
        case 's':
            keys_pressed.s = true;
            break;
        case 'd':
            keys_pressed.d = true;
            break;
        case 'shiftleft':
            keys_pressed.shift = true;
            break;
        case 'controlleft':
            keys_pressed.ctrl = true;
            break;
        case ' ':
            keys_pressed.space = true;
            break;
        case 'e':
            keys_typed.e = true;
            break;
        default:
            keys_pressed[key.toLowerCase()] = true;
            keys_typed[key.toLowerCase()] = true;
            if (keys_typed.y)
            {
                keys_typed.y = false;

                if (tick_interval_id)
                {
                    clearInterval(tick_interval_id);

                    tick_interval_id = null;
                } else restart_tick();

            }
    }
});

window.addEventListener('keyup', (event) => {
    const key = event.code.replace("Digit", "").replace("Key", "");
    keys_pressed[key.toLowerCase()] = false;
    switch (key.toLowerCase())
    {
        case 'w':
            keys_pressed.w = false;
            break;
        case 'a':
            keys_pressed.a = false;
            break;
        case 's':
            keys_pressed.s = false;
            break;
        case 'd':
            keys_pressed.d = false;
            break;
        case 'shiftleft':
            keys_pressed.shift = false;
            break;
        case 'controlleft':
            keys_pressed.ctrl = false;
            break;
        case ' ':
            keys_pressed.space = false;
            break;
        default:
            keys_pressed[key.toLowerCase()] = false;
            keys_typed[key.toLowerCase()] = false;
    }
});

window.addEventListener('mousedown', (event) => {
    event.preventDefault();
    switch (event.button)
    {

        case 0: // Left mouse button
            keys_typed.left_mouse_button = true;
            keys_pressed.left_mouse_button = true;
            break;
        case 1: // Middle mouse button (wheel)
            break;
        case 2: // Right mouse button
            keys_typed.right_mouse_button = true;
            keys_pressed.right_mouse_button = true;
            break;
        default:
            console.log('Unknown mouse button:', event.button);
    }
});

window.addEventListener('mouseup', (event) => {
    event.preventDefault();
    switch (event.button)
    {
        case 0: // Left mouse button
            keys_pressed.left_mouse_button = false;
            break;
        case 1: // Middle mouse button (wheel)
            break;
        case 2: // Right mouse button
            keys_pressed.right_mouse_button = false;
            break;
        default:
            console.log('Unknown mouse button:', event.button);
    }
});


window.addEventListener('contextmenu', (event) => {
    event.preventDefault();
});

window.addEventListener("wheel", (event) => {
    if (event.deltaY < 0 && cell_size < 320)
    {
        cell_size *= 2;
        cell_margin *= 2;
        zoom = cell_size / 40.0;
    } else if (event.deltaY > 0 && cell_size > 5)
    {
        cell_size /= 2;
        cell_margin /= 2;
        zoom = cell_size / 40.0;
    }

});

window.addEventListener("mousemove", (event) => {
    mouse_position[0] = event.clientX;
    mouse_position[1] = event.clientY;
})

window.addEventListener("dblclick", (event) => {
    console.log("doubleclick!");
})

//#endregion -----------------------------------------------------------------------
//#region ------------------------ Updating ----------------------------------------

requestAnimationFrame(render);

function tick() {
    if (!loaded) return;

    let found = false;

    find_hovered: for (let i = 0; i < inventory_zones.length; i++)
    {
        const inventory_zone = inventory_zones[i];
        if (!inventory_zone.visible) continue;

        for (let j = 0; j < inventory_zone.slots.length; j++)
        {

            const slot = inventory_zone.slots[j];
            const zone_b = slot.zone_boundaries;
            const mouse_inside = mouse_position[0] > zone_b[0] && mouse_position[0] < zone_b[2]
                && mouse_position[1] > zone_b[1] && mouse_position[1] < zone_b[3];

            if (mouse_inside)
            {
                hovered_slot = slot;
                found = true;
                break find_hovered;
            }
        }
    }
    if (!found) hovered_slot = null;

    found = false;
    find_hovered_action: for (let i = 0; i < action_slots.length; i++)
    {
        const slot = action_slots[i];
        const zone_b = slot.zone_boundaries;
        const mouse_inside = mouse_position[0] > zone_b[0] && mouse_position[0] < zone_b[2]
            && mouse_position[1] > zone_b[1] && mouse_position[1] < zone_b[3];

        if (mouse_inside)
        {
            hovered_action_slot = slot;
            found = true;
            break find_hovered_action;
        }
    }
    if (!found) hovered_action_slot = null;



    handle_inputs();

    // Process visual effects
    for (let i = 0; i < visual_effects.length; i++)
    {
        const visual_effect = visual_effects[i];
        visual_effect.time += 1;
        if (visual_effect.time >= visual_effect.duration)
        {
            visual_effects.splice(i, 1);
            continue;
        }
        if (visual_effect.tick_callback)
        {
            visual_effect.tick_callback(visual_effect);
        } else
        {
            if (visual_effect.destination)
            {
                const direction = [visual_effect.destination[0] - visual_effect.x, visual_effect.destination[1] - visual_effect.y];
                const remaining_time = (visual_effect.duration - visual_effect.time);
                visual_effect.x += direction[0] / remaining_time;
                visual_effect.y += direction[0] / remaining_time;
            }
        }
    }

    // Process scheduled callbacks
    for (let i = 0; i < scheduled_callbacks.length; i++)
    {
        const scheduled_callback = scheduled_callbacks[i];
        if (tick_counter < scheduled_callback.tick_date) continue;

        for (let j = 0; j < scheduled_callback.callbacks.length; j++)
        {
            const callback = scheduled_callback.callbacks[j];
            const context = scheduled_callback.contexts.length - 1 >= j ? scheduled_callback.contexts[j] : scheduled_callback.contexts[0];
            callback(context);
        }

        scheduled_callbacks.splice(i, 1);
        i--;
    }

    // Process paths
    for (let i = 0; i < paths.length; i++)
    {
        const path = paths[i];
        const entity = path.entity;
        if (!entity || entity.phase == Phase.DEAD)
        {
            paths.splice(i, 1);
            delete path[i];
            continue;
        }

        if (path.path_steps.length === 0)
        {
            entity.path.blocked_by = null;
            continue;
        }

        const pos = path.path_steps[0];
        entity.next_x = pos[0];
        entity.next_y = pos[1];
        path.progress += entity.stats.movement_speed;

        const blocked_by_entity = entity_positions[pos[0]][pos[1]];
        if (blocked_by_entity && blocked_by_entity != entity)
        {
            path.progress = 0;
            path.visual_progress = 0;
            visual_mult = 0;
            entity.next_x = entity.x;
            entity.next_y = entity.y;
            entity.path.blocked_by = blocked_by_entity;
        } else
        {
            entity.path.blocked_by = null;
        }

        const fully_progressed = path.progress >= ticks_per_second;
        if (fully_progressed) move: {
            path.progress -= ticks_per_second;
            path.visual_progress = path.visual_progress - 1;
            const factor = 1 / (1 + path.visual_progress);
            path.visual_mult = 1 + (factor - 1) / 2;
            path.path_steps.shift();

            entity_positions[entity.x][entity.y] = null;

            entity.x = pos[0];
            entity.y = pos[1];
            entity_positions[entity.x][entity.y] = entity;
        }

    }

    // Entity attack timer
    for (let i = 0; i < entities.length; i++)
    {
        const entity = entities[i];
        if (!entity) continue;
        entity.attack_timer += 1;
    }

    // Rain wetness
    for (let i = 0; i < clouds.length; i++)
    {
        const cloud = clouds[i];
        const entities = entities_inside(cloud.x, cloud.y, cloud.radius_2 * 2 - 2);
        const tick_group = tick_counter % ticks_per_second;
        for (let j = 0; j < entities.length; j++)
        {
            const entity = entities[j];
            if (entity.id % ticks_per_second != tick_group) continue;
            if (distance_2(entity.x, entity.y, cloud.x, cloud.y) > cloud.radius_2 * cloud.radius_2) continue;

            const old_wetness = entity.status_effects.wet || 0;
            entity.status_effects.wet = old_wetness + 1;
            calculate_entity_stats(entity);
        }
    }

    process_player();
    process_enemy_ai();

    // Delete dead entities
    const delete_length = entities_marked_for_delete.length;
    for (let i = delete_length - 1; i >= 0; i--)
    {
        const entity = entities_marked_for_delete[i];
        entities[entity.entity_index] = undefined;
        if (entity.enemy_entity_index != null) enemy_entities[entity.enemy_entity_index] = undefined;
        if (entity.player_entity_index != null) player_entities[entity.player_entity_index] = undefined;
        if (player_entity == entity) player_entity = undefined;
        if (entity_positions[entity.x][entity.y] == entity) entity_positions[entity.x][entity.y] = null;
        entities_marked_for_delete.pop();
    }

    tick_counter++;
}

function process_player() {
    if (player_entity?.phase == Phase.CHASING)
    {
        if (!player_entity.phase_states.chasing.target)
        {
            player_entity.phase = Phase.IDLE;
            return;
        }
        process_standard_chasing(player_entity);
    }
}

function process_enemy_ai() {
    for (let i = 0; i < enemy_entities.length; i++)
    {
        const entity = enemy_entities[i];
        if (!entity || entity.phase == Phase.DEAD) continue;

        const distance_to_players = player_entities.map(player_entity => {
            return Math.sqrt(Math.pow(entity.x - player_entity.x, 2) + Math.pow(entity.y - player_entity.y, 2));
        });

        const closest_player_index = distance_to_players.indexOf(Math.min(...distance_to_players));
        const closest_player_entity = player_entities[closest_player_index];
        const distance_to_closest_player = distance_to_players[closest_player_index];

        entity.target_cell = [closest_player_entity.x, closest_player_entity.y];

        const { aggro_range: chase_aggro_range, lose_range: chase_lose_range } = entity.phase_states.chasing;
        const protecting = entity.phase_states.protecting || {};
        const phase = entity.phase;

        const x_distance = entity.x - protecting.x;
        const y_distance = entity.y - protecting.y;
        const distance_2 = (x_distance) * (x_distance) + (y_distance) * (y_distance);
        const too_far = protecting.max_distance && (protecting.max_distance * protecting.max_distance < distance_2);
        const player_in_bay = ((closest_player_entity.x - protecting.x) * (closest_player_entity.x - protecting.x) +
            (closest_player_entity.y - protecting.y) * (closest_player_entity.y - protecting.y)) < protecting.range * protecting.range;

        const has_to_protect = protecting?.x != null && protecting?.y != null;

        has_to_protect: if (has_to_protect && phase != Phase.PROTECTING)
        {
            if (!player_in_bay) entity.phase = Phase.PROTECTING;
        }

        protecting: if (phase == Phase.PROTECTING)
        {
            process_standard_protecting(entity);
            if (player_in_bay)
            {
                entity.phase = Phase.CHASING;
                entity.phase_states.chasing.target = closest_player_entity;
            }
        }
        else chasing: if (phase == Phase.CHASING)
        {
            if (entity.enemy_type == Enemy_Type.RED_MELEE)
            {

                process_standard_chasing(entity);

                if (distance_to_closest_player > chase_lose_range)
                    entity.phase = Phase.WANDERING;

            }
            else if (entity.enemy_type == Enemy_Type.RED_BOW)
            {

                process_standard_chasing(entity);

                if (distance_to_closest_player > chase_lose_range)
                    entity.phase = Phase.WANDERING;

                if (distance_to_closest_player < entity.basic_attack.range / 2)
                {
                    entity.phase = Phase.KITING;
                    entity.phase_states.kiting.action = entity.phase_states.chasing.action;
                    entity.phase_states.kiting.target = entity.phase_states.chasing.target;
                    entity.path.path_steps = [];
                }

            }
            else if (entity.enemy_type == Enemy_Type.RED_MAGE)
            {

                process_standard_chasing(entity);

                const action = entity.actions[0];
                const cooldown_up = tick_counter - action.cooldown_date >= action.cooldown;

                const failed_action = try_action({ source_entity: entity, target_entity: closest_player_entity }, action);

                if (distance_to_closest_player > chase_lose_range)
                    entity.phase = Phase.WANDERING;

                if (distance_to_closest_player < action.range / 2)
                {
                    entity.phase = Phase.KITING;
                    entity.phase_states.kiting.action = entity.phase_states.chasing.action;
                    entity.phase_states.kiting.target = entity.phase_states.chasing.target;
                    entity.path.path_steps = [];
                }

            } else
            {
                process_standard_chasing(entity);

                if (distance_to_closest_player > chase_lose_range)
                    entity.phase = Phase.WANDERING;
            }

        }
        else wandering: if (phase == Phase.WANDERING)
        {

            process_standard_wandering(entity);

            if (distance_to_closest_player < chase_aggro_range)
            {
                entity.phase = Phase.CHASING;
                entity.phase_states.chasing.target = closest_player_entity;
            }
        }
        else kiting: if (phase == Phase.KITING)
        {

            process_standard_kiting(entity);

            if (entity.enemy_type == Enemy_Type.RED_BOW)
            {
                if (distance_to_closest_player >= entity.basic_attack.range / 2)
                    entity.phase = Phase.CHASING;
            }
            else if (entity.enemy_type == Enemy_Type.RED_MAGE)
            {
                if (distance_to_closest_player >= entity.phase_states.chasing.action.range / 2)
                    entity.phase = Phase.CHASING;
            }

        }

        entity.phase_states.new_phase_change = phase != entity.phase;
    }
}

/** @type {(entity: Entity)} */
function process_standard_wandering(entity) {
    if (entity.path.path_steps.length != 0) return;

    const range = entity.phase_states.wandering.range;

    const path = calculate_path_positions([entity.x, entity.y],
        [get_random_int(entity.x - range, entity.x + range), get_random_int(entity.y - range, entity.y + range)]);

    if (path != null) change_path(entity, path);

}

/** @type {(entity: Entity)} */
function process_standard_protecting(entity) {
    const protecting = entity.phase_states.protecting;

    const is_at_bay = entity.x == protecting.x && entity.y == protecting.y;

    if (is_at_bay) return;

    if (true)
    {
        const path_steps = calculate_path_positions([entity.x, entity.y], [protecting.x, protecting.y], !!entity.path?.blocked_by);
        if (path_steps != null) change_path(entity, path_steps);
    }
}

/** @type {(entity: Entity)} */
function process_standard_chasing(entity) {
    const { target, action } = entity.phase_states.chasing;
    if (!target) throw new Error;
    if (!action) throw new Error;

    if (target.phase == Phase.DEAD)
    {
        entity.phase_states.chasing.target = null;
        return;
    }
    // console.log('chase_entity', entity.id, target_entity.id);

    /** @type {Context} */
    const context = {
        source_entity: entity,
        target_entity: target,
        target_cell: [entity.phase_states.chasing.target.x, entity.phase_states.chasing.target.y],
    }

    const action_failed = take_action(context, action);

    if (action_failed == null ||
        (action_failed != in_cell_range_requirement &&
            action_failed != in_range_requirement))
    {
        entity.path.path_steps = [];
        return;
    }

    const path_steps = calculate_path_positions([entity.x, entity.y], [target.x, target.y], true /* entity.path?.blocked_by */);
    if (path_steps != null) change_path(entity, path_steps);

}

/** @type {(entity: Entity)} */
function process_standard_kiting(entity) {
    // if (entity.path.path_steps.length != 0) return;
    const { target, action } = entity.phase_states.kiting;
    if (!target) throw e;
    if (!action) throw e;

    /** @type {Context} */
    const context = {
        source_entity: entity,
        target_entity: target
    }

    const action_failed = take_action(context, action);

    const random = Math.random();
    const chance = entity.phase_states.new_phase_change ? 1 / 5 : 1 / 20;
    if (random < 1 / 20 || entity.path.path_steps.length == 0)
    {
        const direction_to_player = [target.x - entity.x, target.y - entity.y];
        const destination_x = Math.floor(entity.x - Math.sign(direction_to_player[0]) * (3 + Math.random() * 6));
        const destination_y = Math.floor(entity.y - Math.sign(direction_to_player[1]) * (3 + Math.random() * 6));
        const path_steps = calculate_path_positions([entity.x, entity.y], [destination_x, destination_y]);
        if (path_steps != null) change_path(entity, path_steps);
    }
}

/** @type {(entity: Entity, path_steps: Array<Position>, append: boolean) } */
function change_path(entity, path_steps, append = false) {
    const existing_path = entity.path;

    //path_steps.shift();
    if (path_steps.length == 0) return;

    const first_step = path_steps[0];

    if (path_steps.length > 1 && ((first_step[0] == entity.x && first_step[1] == entity.y) || append))
        path_steps.shift();

    if (append)
    {
        existing_path.path_steps = existing_path.path_steps.concat(path_steps);
        return;
    }

    if (existing_path.path_steps.length == 0)
    {
        existing_path.progress = 0;
        existing_path.visual_progress = 0;
    }

    existing_path.path_steps = path_steps;

}

function get_random_int(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function get_random_float(min, max) {
    return Math.random() * (max - min) + min;
}

tick_interval_id = setInterval(() => {
    tick();
}
    , 1000 / ticks_per_second);

function restart_tick() {
    if (tick_interval_id) clearInterval(tick_interval_id);
    tick_interval_id = setInterval(() => {
        tick();
    }, 1000 / ticks_per_second);
}

/** @type {(start: Array<number>, end: Array<number>, with_entities?: boolean)} */
function calculate_path_positions(start, end, with_entities) {
    const queue = [[start]];
    const visited = new Set();
    const [rows, cols] = [area_board.length, area_board[0].length];

    const x_boundaries = [start[0] - 50, start[0] + 50];
    const y_boundaries = [start[1] - 50, start[1] + 50];
    // console.log(x_boundaries, y_boundaries)

    function posToStr([x, y]) {
        return `${x},${y}`;
    }

    visited.add(posToStr(start));

    while (queue.length > 0)
    {
        const path = queue.shift();
        const [x, y] = path[path.length - 1];

        if (x === end[0] && y === end[1]) return path;

        for (const [dx, dy] of [[0, 1], [1, 0], [0, -1], [-1, 0]])
        {
            const [nx, ny] = [x + dx, y + dy];
            if ((nx >= 0 && nx < cols && ny >= 0 && ny < rows) // in bounds
                && (area_board[nx][ny] === Cell_Type.EMPTY || area_board[nx][ny] === Cell_Type.CHEST) // walkable
                && ((end[0] == nx && end[1] == ny) || !with_entities || !entity_positions[nx][ny])) // not_blocked
            {
                const key = posToStr([nx, ny]);
                const in_boundaries = nx >= x_boundaries[0] && nx <= x_boundaries[1] && ny >= y_boundaries[0] && ny <= y_boundaries[1];
                if (!visited.has(key))
                {
                    visited.add(key);
                    if (in_boundaries)
                    {
                        queue.push([...path, [nx, ny]]);
                    }
                }
            }
        }
    }

    return null;
}

/** @type {(source_entity: Entity, target_entity: Entity, action: Action)} */
function chase_entity(source_entity, target_entity, action) {
    if (!target_entity || target_entity.phase == Phase.DEAD) return;

    source_entity.chasing_entity = target_entity;
    source_entity.chasing_action_and_context = { action, context: { source_entity, target_entity } };
    // console.log('chase_entity', source_entity.id, target_entity.id);

    const path_steps = calculate_path_positions([source_entity.x, source_entity.y], [target_entity.x, target_entity.y]);
    if (path_steps != null) change_path(source_entity, path_steps);
}

/** @type {(entity1: Entity, entity2: Entity)} */
function entity_distance(entity1, entity2) {
    const distance_x = entity2.x - entity1.x;
    const distance_y = entity2.y - entity1.y;
    return Math.sqrt(distance_x * distance_x + distance_y * distance_y);
}

/** @type {(x1: number, y1: number, x2: number, y2: number) => number} */
function distance_2(x1, y1, x2, y2) {
    return (x2 - x1) * (x2 - x1) + (y2 - y1) * (y2 - y1);
}

/** @type {(middle_x: number, middle_y: number, radius: number)} */
function get_cell_in_circle(middle_x, middle_y, radius) {
    let x;
    let y;

    do
    {
        x = (Math.random() - 0.5) * 2;
        y = (Math.random() - 0.5) * 2;
    } while (x * x + y * y > 1);

    x = Math.round(x * radius);
    y = Math.round(y * radius);

    return [middle_x + x, middle_y + y];
}
//#endregion -----------------------------------------------------------------------
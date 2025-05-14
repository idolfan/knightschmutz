// ------------------------------------------------------------------------- canvas -------------------------------------------------------------------------------------------------
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas, false);
resizeCanvas();

// ----------------------------------------------------------------------- End canvas -----------------------------------------------------------------------------------------------
// ----------------------------------------------------------------------- Game state -----------------------------------------------------------------------------------------------

let tick_counter = 0;

const ticks_per_second = 60;
const world_area_size = 100;
let cell_size = 40;
let cell_margin = 4;
let id_counter = 0;
let area_board;
/** @type {Array<Path>} */
const paths = [];

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
/** @type {Entity} */
let hovered_entity;

// ----------------------------------------------------------------------- End game state -------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------- Init state ---------------------------------------------------------------------------------------------

area_board = Array.from({ length: world_area_size }, () => Array(world_area_size).fill(0));
for (let i = 0; i < world_area_size; i++) {
    for (let j = 0; j < world_area_size; j++) {
        area_board[i][j] = Math.random() < 0.66 ? 1 : 0;
    }
}

/** @type {Player} */
const player = {
    id: id_counter++,
    display_name: "test",
}

add_player(player);
let player_entity = entities[player.entity_index];

player_entity.on_kill.push((combat_context) => {
    console.log('HEAL', combat_context);
    heal_entity({
        source_entity: combat_context.target_entity,
        target_entity: combat_context.source_entity,
        damage: { amount: combat_context.source_entity.stats.max_hp * 0.25 }
    })
})

/** @type {Array<Entity>} */
const start_entites = [
    {
        display_name: "test",
        x: 40,
        y: 40,
        path: null,
        entity_type: 'ENEMY',
        base_stats: {
            attack_speed: 1,
            max_hp: 10,
            movement_speed: get_random_int(2, 8),
        },
        attack_timer: ticks_per_second,
    },
    {
        display_name: "test2",
        x: 20,
        y: 20,
        path: null,
        entity_type: 'ENEMY',
        base_stats: {
            attack_speed: 1,
            max_hp: 10,
            movement_speed: get_random_int(2, 8),
        },
        attack_timer: ticks_per_second,
    },
    {
        display_name: "test3",
        x: 30,
        y: 30,
        path: null,
        entity_type: 'ENEMY',
        base_stats: {
            attack_speed: 1,
            max_hp: 10,
            movement_speed: get_random_int(2, 8),
        },
        attack_timer: ticks_per_second,
    }
]

for (let i = 0; i < start_entites.length; i++) {
    const entity = start_entites[i];
    add_entity(entity);
}

// ----------------------------------------------------------------------- End init state -------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------- Game logic ---------------------------------------------------------------------------------------------

/** @type {(entity: Entity)} */
function calculate_entity_stats(entity) {
    entity.stats = { ...entity.base_stats }
    if (!entity.equiped_items || entity.equiped_items.length == 0) return;
    entity.equiped_items.forEach((equipment) => {
        if (equipment.flat_stats)
            Object.keys(equipment.flat_stats).forEach((key) => {
                entity.stats[key] += equipment.flat_stats[key];
            })
        if (equipment.multiplicative_stats)
            Object.keys(equipment.multiplicative_stats).forEach((key) => {
                entity.stats[key] *= equipment.multiplicative_stats[key];
            })
        if (equipment.extra_effects)
            equipment.extra_effects.forEach((extra_effect) => {
                extra_effect.effect_callback({ ...extra_effect.context, entity });
            })
    });
}

/** @type {Array<Scheduled_Callback>} */
const scheduled_callbacks = [];

/** @type {(entity: Entity) => Entity} */
function add_entity(entity) {
    entity.id = id_counter++;

    if (entity.base_stats?.max_hp) entity.base_stats.current_hp = entity.base_stats.max_hp;

    if (entity.base_stats) entity.stats = { ...entity.base_stats };

    entities.push(entity);
    entity.entity_index = entities.length - 1;
    if (entity.entity_type === 'PLAYER') {
        player_entities.push(entity);
        entity.player_entity_index = player_entities.length - 1;
    } else if (entity.entity_type === 'ENEMY') {
        enemy_entities.push(entity);
        entity.enemy_entity_index = enemy_entities.length - 1;
    }

    calculate_entity_stats(entity);
    return entity;
}

/** @type {(player: Player) => Player} */
function add_player(player) {
    /** @type {Equipment} */
    const amulet_equipment = {
        flat_stats: { movement_speed: 3, max_hp: 200, current_hp: 200 },
        multiplicative_stats: { movement_speed: 2 }
    }
    /** @type {Entity} */
    const player_entity = {
        display_name: player.display_name,
        x: 10,
        y: 10,
        entity_type: 'PLAYER',
        base_stats: {
            attack_speed: 0.7,
            max_hp: 30,
            movement_speed: 5,
        },
        attack_timer: ticks_per_second,
        on_kill: [],
        on_death: [],
        on_scored_hit: [],
        on_taken_hit: [],
        equiped_items: [amulet_equipment],
    }
    player.entity_index = add_entity(player_entity).entity_index;
    player.player_index = players.length;
    players.push(player);
    return player;
}

/** @type {(combat_context: Combat_Context)} */
function damage_entity(combat_context) {
    const target_entity = combat_context.target_entity;
    target_entity.stats.current_hp -= combat_context.damage.amount;
    entity_on_taken_hit(combat_context);
    entity_on_scored_hit(combat_context);

    visual_effects.push({
        duration: ticks_per_second * 0.3,
        entity: target_entity,
        image: damage_Image,
        peak_at: 0.2,
        size: 1.5,
        time: 0,
    })

    if (target_entity.stats.current_hp <= 0) {
        entity_on_kill(combat_context);
        entity_on_death(combat_context);
    }
    console.log('Damaged entity', target_entity);
}

/** @type {(combat_context: Combat_Context)} */
function heal_entity(combat_context) {
    const target_entity = combat_context.target_entity;
    target_entity.stats.current_hp += combat_context.damage.amount;
    if(target_entity.stats.current_hp > target_entity.stats.max_hp) target_entity.stats.current_hp = target_entity.stats.max_hp;
    
    entity_on_heal(combat_context);
    
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

    if (source_entity.chasing_entity == dying_entity) {
        source_entity.chasing_entity == undefined;
        delete source_entity.chasing_action_and_context;
    }
    entity_positions[dying_entity.x][dying_entity.y] = null;

    entities_marked_for_delete.push(dying_entity);
    if (dying_entity.on_death) {
        dying_entity.on_death.forEach(on_death_callback => {
            on_death_callback(combat_context);
        });
    }
}

/** @type {(combat_context: Combat_Context)} */
function entity_on_scored_hit(combat_context) {
    const hitting_entity = combat_context.source_entity;
    if (hitting_entity?.on_scored_hit) {
        hitting_entity.on_scored_hit.forEach(on_scored_hit_callback => {
            on_scored_hit_callback(combat_context);
        })
    }
}

/** @type {(combat_context: Combat_Context)}  */
function entity_on_taken_hit(combat_context) {
    const hit_entity = combat_context.target_entity;
    if (hit_entity.on_taken_hit) {
        hit_entity.on_taken_hit.forEach(on_taken_hit_callback => {
            on_taken_hit_callback(combat_context);
        })
    }
}

/** @type {(combat_context: Combat_Context)} */
function entity_on_kill(combat_context) {
    const killer_entity = combat_context.source_entity;
    if (killer_entity?.on_kill) {
        killer_entity.on_kill.forEach(on_kill_callback => {
            on_kill_callback(combat_context);
        })
    }
}


// ------------------------------------------------------------------------ End game logic ------------------------------------------------------------------------------------------
// ---------------------------------------------------------------------------- Render ----------------------------------------------------------------------------------------------

const playerImage = new Image();
playerImage.src = './player.png';
const chestplateImage = new Image();
chestplateImage.src = './chestplate.png';
const helmetImage = new Image();
helmetImage.src = './helmet.png';
const hp_hud_Image = new Image();
hp_hud_Image.src = './hp_hud.png';
const heal_Image = new Image();
heal_Image.src = './heal_visual.png';
const damage_Image = new Image();
damage_Image.src = './damage_visual.png';
const sword_image = new Image();
sword_image.src = './sword.png';
const bow_image = new Image();
bow_image.src = './bow.png';

ctx.imageSmoothingEnabled = false;

let zoom = cell_size / 40.0;

const camera_origin = [canvas.width / 2, canvas.height / 2];

/** @type {Array<Visual_Effect>} */
const visual_effects = [];

function draw() {
    updateCamera();

    time_since_entity_hovered += 1;

    const translation = [-camera_origin[0] * zoom + (canvas.width / 2), -camera_origin[1] * zoom + canvas.height / 2];

    const hovered_cell = [
        Math.floor((mouse_position[0] - translation[0]) / cell_size),
        Math.floor((mouse_position[1] - translation[1]) / cell_size)
    ]

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'gray';
    ctx.translate(translation[0], translation[1]);


    for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];
        if (!entity) continue;

        if (entity.path) {
            entity.visual_x = entity.x * cell_size + cell_margin;
            entity.visual_y = entity.y * cell_size + cell_margin;
            const next_cell = entity.path.path_steps[0];
            if (next_cell) {
                entity.visual_x += cell_size * (next_cell[0] - entity.x) * entity.path.progress / ticks_per_second;
                entity.visual_y += cell_size * (next_cell[1] - entity.y) * entity.path.progress / ticks_per_second;
            }
        }
    }

    // Draw cells
    const left_most_cell = Math.max(0, Math.floor((camera_origin[0] * zoom - canvas.width / 2) / cell_size));
    const right_most_cell = Math.min(world_area_size, Math.floor((camera_origin[0] * zoom + canvas.width / 2) / cell_size + 1));
    const up_most_cell = Math.max(0, Math.floor((camera_origin[1] * zoom - canvas.height / 2) / cell_size));
    const down_most_cell = Math.min(world_area_size, Math.floor((camera_origin[1] * zoom + canvas.height / 2) / cell_size + 1));
    for (let i = left_most_cell; i < right_most_cell; i++) {
        for (let j = up_most_cell; j < down_most_cell; j++) {
            if (area_board[i][j] === 1) {
                ctx.fillRect(i * cell_size, j * cell_size, cell_size, cell_size);
                ctx.strokeRect(i * cell_size, j * cell_size, cell_size, cell_size);
            }
        }
    }

    // Draw visual effects
    for (let i = 0; i < visual_effects.length; i++) {

        const visual_effect = visual_effects[i];
        if (visual_effect) {
            const entity = visual_effect.entity;
            const resulting_width = cell_size * visual_effect.size;
            const resulting_height = cell_size * visual_effect.size;
            const cell_middle = entity ?
                [entity.visual_x + cell_size / 2, entity.visual_y + cell_size / 2]
                : [visual_effect.x * cell_size + cell_size / 2, visual_effect.y * cell_size + cell_size / 2];
            const duration_percent = visual_effect.time / visual_effect.duration;
            const peak_at = visual_effect.peak_at;
            ctx.globalAlpha = (duration_percent > peak_at ? 1 - (duration_percent - peak_at) / (1 - peak_at)
                : duration_percent / peak_at)
            ctx.drawImage(visual_effect.image, cell_middle[0] - resulting_width / 2, cell_middle[1] - resulting_height / 2, resulting_width, resulting_height);
            ctx.globalAlpha = 1;
        }
    }

    // Draw players
    ctx.lineWidth = 3;
    for (let i = 0; i < players.length; i++) {
        const player = players[i];
        const entity = entities[player.entity_index];
        const path_offset = [0, 0];
        if (entity.path?.path_steps) {
            const next_cell = entity.path.path_steps[0];
            if (next_cell) {
                path_offset[0] = (next_cell[0] - entity.x) * entity.path.progress / ticks_per_second;
                path_offset[1] = (next_cell[1] - entity.y) * entity.path.progress / ticks_per_second;
            }
        }
        const x = (entity.x + path_offset[0]) * cell_size + cell_margin;
        const y = (entity.y + path_offset[1]) * cell_size + cell_margin;
        ctx.fillStyle = 'blue';


        //ctx.fillRect((entity.x + path_offset[0]) * cell_size + cell_margin, (entity.y + path_offset[1]) * cell_size + cell_margin, cell_size - cell_margin * 2, cell_size - cell_margin * 2);
        ctx.strokeStyle = 'black';
        //ctx.strokeRect((entity.x + path_offset[0]) * cell_size + cell_margin, (entity.y + path_offset[1]) * cell_size + cell_margin, cell_size - cell_margin * 2, cell_size - cell_margin * 2);
        ctx.drawImage(playerImage, x, y, 32 * zoom, 32 * zoom);
        ctx.drawImage(chestplateImage, x, y, 32 * zoom, 32 * zoom);
        ctx.drawImage(helmetImage, x, y - 32 * zoom + 1, 32 * zoom, 32 * zoom);
        ctx.drawImage(sword_image, x - zoom * 0, y, 32 * zoom, 32 * zoom);
        //ctx.drawImage(bow_image, x, y, 32 * zoom, 32 * zoom);
    }

    // Draw paths
    for (let i = 0; i < paths.length; i++) {
        const path = paths[i];
        if (player_entity.path != path) continue;
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.strokeStyle = 'green';
        ctx.moveTo(path?.path_steps[0][0] * cell_size + cell_size / 2, path?.path_steps[0][1] * cell_size + cell_size / 2);
        for (let j = 1; j < path?.path_steps.length; j++) {
            const step = path.path_steps[j];
            ctx.lineTo(step[0] * cell_size + cell_size / 2, step[1] * cell_size + cell_size / 2);
        }
        ctx.stroke();
    }

    // Draw entities
    ctx.lineWidth = 3;
    for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];
        if (!entity) continue;
        const path_offset = [0, 0];
        if (entity.path?.path_steps) {
            const next_cell = entity.path.path_steps[0];
            if (next_cell) {
                path_offset[0] = (next_cell[0] - entity.x) * entity.path.progress / ticks_per_second;
                path_offset[1] = (next_cell[1] - entity.y) * entity.path.progress / ticks_per_second;
            }
        }
        if ((hovered_cell[0] == entity.x && hovered_cell[1] == entity.y)
            || (hovered_cell[0] == Math.ceil(entity.x + path_offset[0]) && hovered_cell[1] == Math.ceil(entity.y + path_offset[1]))) {
            time_since_entity_hovered = 0;
            hovered_entity = entity;
        }
        if (entity.entity_type != 'PLAYER') {
            ctx.fillStyle = 'red';
            ctx.fillRect((entity.x + path_offset[0]) * cell_size + cell_margin, (entity.y + path_offset[1]) * cell_size + cell_margin, cell_size - cell_margin * 2, cell_size - cell_margin * 2);
            ctx.strokeStyle = 'black';
            if (hovered_entity == entity) ctx.strokeStyle = 'orange';
            ctx.strokeRect((entity.x + path_offset[0]) * cell_size + cell_margin, (entity.y + path_offset[1]) * cell_size + cell_margin, cell_size - cell_margin * 2, cell_size - cell_margin * 2);
            ctx.fillStyle = "rgb(0,0,0,0.7)";
            const damage_percent = 1 - Math.max(0, Math.min(1, entity.stats.current_hp / entity.stats.max_hp));
            ctx.fillRect((entity.x + path_offset[0]) * cell_size + cell_margin, (entity.y + path_offset[1]) * cell_size + cell_margin, cell_size - cell_margin * 2, (cell_size - cell_margin * 2) * damage_percent);
            const attack_percent = Math.min(1, entity.stats.attack_speed * entity.attack_timer / ticks_per_second);
            ctx.strokeStyle = 'yellow';
            ctx.beginPath();
            ctx.moveTo((entity.x + path_offset[0]) * cell_size + cell_margin,
                (entity.y + path_offset[1] + 1) * cell_size - cell_margin);
            ctx.lineTo((entity.x + path_offset[0]) * cell_size + cell_margin + (cell_size - cell_margin * 2) * attack_percent,
                (entity.y + path_offset[1] + 1) * cell_size - cell_margin);
            ctx.stroke();
        }

    }

    if (time_since_entity_hovered >= 15) {
        hovered_entity = null;
    }

    if (hovered_cell) {
        ctx.strokeStyle = 'orange';
        ctx.strokeRect(hovered_cell[0] * cell_size, hovered_cell[1] * cell_size, cell_size, cell_size);
    }

    ctx.translate(-translation[0], -translation[1]);

    // HUD
    const hp_percent = player_entity ? Math.max(0, player_entity.stats.current_hp / player_entity.stats.max_hp) : 0;
    ctx.fillStyle = 'gray';
    ctx.fillRect(hud_position[0], hud_position[1], hud_position[2], hud_position[3]);
    ctx.fillStyle = 'red';
    const hp_hud_thickness = hud_position[2] / 16;
    ctx.fillRect(hud_position[0] + hp_hud_thickness, hud_position[1], (hud_position[2] - hp_hud_thickness * 2) * hp_percent, hud_position[3]);
    ctx.drawImage(hp_hud_Image, hud_position[0], hud_position[1], hud_position[2], hud_position[3]);

    if (player_entity) {
        ctx.font = '20px "Press Start 2P"';
        ctx.fillStyle = '#00FF00';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(`${player_entity.stats.current_hp.toFixed(0)} / ${player_entity.stats.max_hp.toFixed(0)}`, hud_position[0] + hud_position[2] / 2, hud_position[1] + hud_position[3] / 2);
    }
}

const hud_position = [
    canvas.width * 0.01,
    canvas.height - canvas.width * 0.01,
    canvas.width * 0.20,
    -canvas.width * 0.05
]



function render() {
    draw();
    requestAnimationFrame(render);
}

// ----------------------------------------------------------------------------- End render -------------------------------------------------------------------------------------
// ----------------------------------------------------------------------------Input handling -----------------------------------------------------------------------------------

const mouse_position = [0, 0];
let time_since_entity_hovered = 0;

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
    right_mouse_button: false
}

const camera_speed = 10;

window.addEventListener('keydown', (event) => {
    const key = event.key;
    switch (key.toLowerCase()) {
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
        case 'shift':
            keys_pressed.shift = true;
            break;
        case ' ':
            keys_pressed.space = true;
            break;
        default:
            console.log('Key pressed:', key);
    }
});

window.addEventListener('keyup', (event) => {
    const key = event.key;
    switch (key.toLowerCase()) {
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
        case 'shift':
            keys_pressed.shift = false;
            break;
        case ' ':
            keys_pressed.space = false;
            break;
    }
});

function updateCamera() {
    if (keys_pressed.w) {
        camera_origin[1] -= camera_speed;
    }
    if (keys_pressed.a) {
        camera_origin[0] -= camera_speed
    }
    if (keys_pressed.s) {
        camera_origin[1] += camera_speed;
    }
    if (keys_pressed.d) {
        camera_origin[0] += camera_speed;
    }
}

let player_path = null;

function handle_inputs() {
    if (keys_pressed.space) {
        camera_origin[0] = (player_entity?.x * cell_size + cell_size / 2) / zoom;
        camera_origin[1] = (player_entity?.y * cell_size + cell_size / 2) / zoom;
    }
    if (keys_typed.left_mouse_button) {
        keys_typed.left_mouse_button = false;

        const translation = [-camera_origin[0] * zoom + (canvas.width / 2), -camera_origin[1] * zoom + canvas.height / 2];
        clicked_cell = [
            Math.floor((mouse_position[0] - translation[0]) / cell_size),
            Math.floor((mouse_position[1] - translation[1]) / cell_size)
        ]

        player_entity.chasing_entity = undefined;
        player_entity.chasing_action_and_context = undefined;

        if (keys_pressed.shift && player_path) {
            const existing_path = player_path;
            const last_step = existing_path.path_steps[existing_path.path_steps.length - 1];
            const path_steps = calculate_path_positions([last_step[0], last_step[1]], clicked_cell);

            if (path_steps != null) {
                change_path(player_entity, path_steps, true);
            }
        } else {
            const path_steps = calculate_path_positions([player_entity.x, player_entity.y], clicked_cell);
            //console.log('path', path);

            if (path_steps != null) {
                change_path(player_entity, path_steps);
            }
        }

    }
    right_mouse_button: if (keys_typed.right_mouse_button) {
        keys_typed.right_mouse_button = false;

        player_entity.chasing_entity = undefined;
        player_entity.chasing_action_and_context = undefined;

        const target_entity = hovered_entity;
        if (!target_entity) break right_mouse_button;
        const context = { target_entity, source_entity: player_entity }
        //if (get_distance(context) >= 1.5) {
        chase_entity(player_entity, target_entity, melee_attack);
        //}
        take_action(context, melee_attack);
    }
}

window.addEventListener('mousedown', (event) => {
    event.preventDefault();
    switch (event.button) {

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
    switch (event.button) {
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
    event.preventDefault(); // verhindert das Kontextmenü
});

window.addEventListener("wheel", (event) => {
    if (event.deltaY < 0 && cell_size < 320) {
        cell_size *= 2;
        cell_margin *= 2;
        zoom = cell_size / 40.0;
    } else if (event.deltaY > 0 && cell_size > 5) {
        cell_size /= 2;
        cell_margin /= 2;
        zoom = cell_size / 40.0;
    }

});

window.addEventListener("mousemove", (event) => {
    mouse_position[0] = event.clientX;
    mouse_position[1] = event.clientY;
})

// ---------------------------------------------------------------------------- End input handling -------------------------------------------------------------------------------
// ---------------------------------------------------------------------------------- Updating -----------------------------------------------------------------------------------


render();

/** @type {Array<Array<Entity>>} */
const entity_positions = Array.from({ length: world_area_size }, () => Array(world_area_size).fill(null));


function tick() {
    handle_inputs();

    // Process visual effects
    for (let i = 0; i < visual_effects.length; i++) {
        const visual_effect = visual_effects[i];
        visual_effect.time += 1;
        if (visual_effect.time >= visual_effect.duration) {
            visual_effects.splice(i, 1);
        }
    }

    // Process scheduled callbacks
    for (let i = 0; i < scheduled_callbacks.length; i++) {
        const scheduled_callback = scheduled_callbacks[i];
        if (tick_counter != scheduled_callback.tick_date) continue;

        for (let j = 0; j < scheduled_callback.callbacks; j++) {
            const callback = scheduled_callback.callbacks[j];
            const context = scheduled_callback.contexts.length - 1 >= j ? scheduled_callback.contexts[j] : scheduled_callback.contexts[0];

            callback(context);
        }

        scheduled_callbacks.splice(i, 1);
        i--;
    }

    // Process paths
    for (let i = 0; i < paths.length; i++) {
        const path = paths[i];
        const entity = entities[path.entity_index];
        if (!entity) {
            paths.splice(i, 1);
            delete path;
            continue;
        }

        let chasing_needs_pathing = true;
        if (entity.chasing_action_and_context) {
            const requirement_failed = take_action(entity.chasing_action_and_context.context, entity.chasing_action_and_context.action)
            if (requirement_failed != in_melee_range_requirement) chasing_needs_pathing = false;
        }

        if (entity.chasing_entity && chasing_needs_pathing) {
            path_steps = calculate_path_positions([entity.x, entity.y], [entity.chasing_entity.x, entity.chasing_entity.y]);
            if (path_steps) change_path(entity, path_steps);
        }

        if (path.path_steps[0] && chasing_needs_pathing) {
            const pos = path.path_steps[0];
            const blocked_by_entity = entity_positions[pos[0]][pos[1]];

            if (!blocked_by_entity || blocked_by_entity == entity) {
                path.progress += entity.stats.movement_speed;

                if (path.progress >= ticks_per_second) {
                    path.progress -= ticks_per_second;
                    path.path_steps.shift();

                    entity_positions[entity.x][entity.y] = null;

                    entity.x = pos[0];
                    entity.y = pos[1];
                    entity_positions[entity.x][entity.y] = entity;

                }

            } else {
                //console.log('blocked by entity', blocked_by_entity.id, entity.id);

                if (entity.chasing_action_and_context && blocked_by_entity.entity_type != 'ENEMY')
                    take_action({ ...entity.chasing_action_and_context.context, target_entity: blocked_by_entity }, entity.chasing_action_and_context.action);
                path.progress = 0;
            }

        }

        if (path.path_steps.length === 0) {
            paths.splice(i, 1);
            entity.path = null;
            if (path == player_path) {
                player_path = null;
            }
            delete path;
            i--;
        }
    }

    for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];
        if (!entity) continue;
        entity.attack_timer += 1;
    }

    // Entity movement choice
    for (let i = 0; i < enemy_entities.length; i++) {
        const entity = enemy_entities[i];
        if (!entity) continue;
        const distance_to_players = player_entities.map(player_entity => {
            return Math.sqrt(Math.pow(entity.x - player_entity.x, 2) + Math.pow(entity.y - player_entity.y, 2));
        });

        const closest_player_index = distance_to_players.indexOf(Math.min(...distance_to_players));
        if (closest_player_index != -1) {
            const closest_player_entity = player_entities[closest_player_index];
            const distance_to_closest_player = distance_to_players[closest_player_index];
            if (distance_to_closest_player < 10) {

                chase_entity(entity, closest_player_entity, melee_attack);
            }
        }

        if (!entity.path) {
            //console.log('entity not player', entity);
            const path = calculate_path_positions([entity.x, entity.y], [get_random_int(entity.x - 5, entity.x + 5), get_random_int(entity.y - 5, entity.y + 5)]);
            if (path != null) {
                change_path(entity, path);
            }
        }
    }

    const delete_length = entities_marked_for_delete.length;
    for (let i = delete_length - 1; i >= 0; i--) {
        const entity = entities_marked_for_delete[i];
        console.log('entity for delete', entity);
        entities[entity.entity_index] = undefined;
        if (entity.enemy_entity_index) enemy_entities[entity.enemy_entity_index] = undefined;
        if (entity.player_entity_index) player_entities[entity.player_entity_index] = undefined;
        if (player_entity == entity) player_entity = undefined;
        entities_marked_for_delete.pop();
    }

    tick_counter++;
}

/** @type {(entity: Entity, path_steps: Array<Position>) } */
function change_path(entity, path_steps, append = false) {
    const existing_path = entity.path;
    if (existing_path) {
        path_steps.shift();
        if (path_steps.length == 0) {
            return;
        }
        if (!append) {
            const first_step = existing_path.path_steps[0];
            existing_path.path_steps = path_steps;
            existing_path.path_length = path_steps.length;
            const same_first_step = !!path_steps[0] && !!path_steps[0][0] && first_step[0] == path_steps[0][0] && first_step[1] == path_steps[0][1];
            if (!same_first_step) existing_path.progress = 0;
        } else {
            existing_path.path_steps = existing_path.path_steps.concat(path_steps);
            existing_path.path_length = existing_path.path_steps.length;
        }
    } else {
        const full_path = {
            id: id_counter++,
            entity_index: entity.entity_index,
            path_steps: path_steps,
            path_length: path_steps.length,
            progress: ticks_per_second,
        }
        paths.push(full_path);
        entity.path = full_path;
        if (entity == player_entity) player_path = full_path;
    }
}

function get_random_int(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

setInterval(() => {
    tick();
}
    , 1000 / ticks_per_second);

/** @type {(start: Array<number>, end: Array<number>)} */
function calculate_path_positions(start, end) {
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

    while (queue.length > 0) {
        const path = queue.shift();
        const [x, y] = path[path.length - 1];

        if (x === end[0] && y === end[1]) return path;

        for (const [dx, dy] of [[0, 1], [1, 0], [0, -1], [-1, 0]]) {
            const [nx, ny] = [x + dx, y + dy];
            if (nx >= 0 && nx < cols && ny >= 0 && ny < rows && area_board[nx][ny] === 1) {
                const key = posToStr([nx, ny]);
                const in_boundaries = nx >= x_boundaries[0] && nx <= x_boundaries[1] && ny >= y_boundaries[0] && ny <= y_boundaries[1];
                if (!visited.has(key)) {
                    visited.add(key);
                    if (in_boundaries) {
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
    if (!target_entity) return;

    source_entity.chasing_entity = target_entity;
    source_entity.chasing_action_and_context = { action, context: { source_entity, target_entity } };
    console.log('chase_entity', source_entity.id, target_entity.id);

    const path_steps = calculate_path_positions([source_entity.x, source_entity.y], [target_entity.x, target_entity.y]);
    if (path_steps != null) {
        change_path(source_entity, path_steps);
    }
}

// -------------------------------------------------------------------------------- End updating ------------------------------------------------------------------------------
// -------------------------------------------------------------------------------- Requirements ------------------------------------------------------------------------------

/** @type {Requirement} */
const in_melee_range_requirement = (context) => {
    const in_range = get_distance(context) <= 1.5;
    if (log_requirements) console.log('in_melee_range', in_range);
    return in_range;
}

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

// ------------------------------------------------------------------------------ End Requirements -----------------------------------------------------------------------------
// ---------------------------------------------------------------------------------- Actions ----------------------------------------------------------------------------------

const log_requirements = false;

/** 
 * @returns Which requirement failed
 * @type {(context: Context, action: Action) => Requirement} */
function take_action(context, action) {
    if (action.requirements) {
        for (const requirement_callback of action.requirements) {
            if (!requirement_callback(context)) return requirement_callback;
        }
    }

    for (const effect_function of action.effect_functions) {
        effect_function(context);
    }

    return null;
}

/** @type {(context: Context) => number} */
function get_distance(context) {
    return Math.sqrt((context.source_entity.x - context.target_entity.x) * (context.source_entity.x - context.target_entity.x) + (context.source_entity.y - context.target_entity.y) * (context.source_entity.y - context.target_entity.y));
}

/** @type {Action} */
const melee_attack = {
    requirements: [in_melee_range_requirement, not_self_requirement, attack_timer_up_requirement],
    effect_functions: [(context) => {
        const combat_context = {
            ...context,
            damage: { amount: 5 }
        }
        damage_entity(combat_context);
        context.source_entity.attack_timer = 0;
    }]
}

// --------------------------------------------------------------------------------- End Actions ------------------------------------------------------------------------------
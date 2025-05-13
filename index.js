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
const cell_margin = 4;
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
    combat_context.source_entity.hp += combat_context.source_entity.max_hp * 0.25;
})

/** @type {Array<Entity>} */
const start_entites = [
    {
        display_name: "test",
        x: 40,
        y: 40,
        speed: get_random_int(2, 8),
        path: null,
        entity_type: 'ENEMY',
        max_hp: 10,
        attack_speed: 1,
        attack_timer: ticks_per_second,
    },
    {
        display_name: "test2",
        x: 20,
        y: 20,
        speed: get_random_int(2, 8),
        path: null,
        entity_type: 'ENEMY',
        max_hp: 10,
        attack_speed: 1,
        attack_timer: ticks_per_second,
    },
    {
        display_name: "test3",
        x: 30,
        y: 30,
        speed: get_random_int(2, 8),
        path: null,
        entity_type: 'ENEMY',
        max_hp: 10,
        attack_speed: 1,
        attack_timer: ticks_per_second,
    }
]

for (let i = 0; i < start_entites.length; i++) {
    const entity = start_entites[i];
    add_entity(entity);
}

// ----------------------------------------------------------------------- End init state -------------------------------------------------------------------------------------------
// ------------------------------------------------------------------------- Game logic ---------------------------------------------------------------------------------------------

/** @type {Array<Scheduled_Callback>} */
const scheduled_callbacks = [];

/** @type {(entity: Entity) => Entity} */
function add_entity(entity) {
    entity.id = id_counter++;
    if (entity.max_hp) entity.hp = entity.max_hp;

    entities.push(entity);
    entity.entity_index = entities.length - 1;
    if (entity.entity_type === 'PLAYER') {
        player_entities.push(entity);
        entity.player_entity_index = player_entities.length - 1;
    } else if (entity.entity_type === 'ENEMY') {
        enemy_entities.push(entity);
        entity.enemy_entity_index = enemy_entities.length - 1;
    }
    return entity;
}

/** @type {(player: Player) => Player} */
function add_player(player) {
    /** @type {Entity} */
    const player_entity = {
        display_name: player.display_name,
        x: 10,
        y: 10,
        speed: 5,
        entity_type: 'PLAYER',
        max_hp: 30,
        attack_speed: 0.7,
        attack_timer: ticks_per_second,
        on_kill: [],
        on_death: [],
        on_scored_hit: [],
        on_taken_hit: [],
    }
    player.entity_index = add_entity(player_entity).entity_index;
    player.player_index = players.length;
    players.push(player);
    return player;
}

/** @type {(combat_context: Combat_Context)} */
function damage_entity(combat_context) {
    const target_entity = combat_context.target_entity;
    target_entity.hp -= combat_context.damage.amount;
    entity_on_taken_hit(combat_context);
    entity_on_scored_hit(combat_context);
    if (target_entity.hp <= 0) {
        entity_on_kill(combat_context);
        entity_on_death(combat_context);
    }
    console.log('Damaged entity', target_entity);
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

const camera_origin = [canvas.width / 2, canvas.height / 2];
function draw() {
    updateCamera();

    time_since_entity_hovered += 1;

    const zoom = cell_size / 40.0;
    const translation = [-camera_origin[0] * zoom + (canvas.width / 2), -camera_origin[1] * zoom + canvas.height / 2];

    const hovered_cell = [
        Math.floor((mouse_position[0] - translation[0]) / cell_size),
        Math.floor((mouse_position[1] - translation[1]) / cell_size)
    ]

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'gray';
    ctx.translate(translation[0], translation[1]);
    // Draw cells
    const left_most_cell = Math.max(0,Math.floor((camera_origin[0] * zoom - canvas.width / 2) / cell_size));
    const right_most_cell = Math.min(world_area_size,Math.floor((camera_origin[0] * zoom + canvas.width / 2) / cell_size + 1));
    const up_most_cell = Math.max(0,Math.floor((camera_origin[1] * zoom - canvas.height / 2) / cell_size));
    const down_most_cell = Math.min(world_area_size,Math.floor((camera_origin[1] * zoom + canvas.height / 2) / cell_size + 1));
    for (let i = left_most_cell; i < right_most_cell; i++) {
        for (let j = up_most_cell; j < down_most_cell; j++) {
            if (area_board[i][j] === 1) {
                ctx.fillRect(i * cell_size, j * cell_size, cell_size, cell_size);
                ctx.strokeRect(i * cell_size, j * cell_size, cell_size, cell_size);
            }
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
        ctx.fillStyle = 'blue';
        ctx.fillRect((entity.x + path_offset[0]) * cell_size + cell_margin, (entity.y + path_offset[1]) * cell_size + cell_margin, cell_size - cell_margin * 2, cell_size - cell_margin * 2);
        ctx.strokeStyle = 'black';
        ctx.strokeRect((entity.x + path_offset[0]) * cell_size + cell_margin, (entity.y + path_offset[1]) * cell_size + cell_margin, cell_size - cell_margin * 2, cell_size - cell_margin * 2);
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
        }

        ctx.fillStyle = "rgb(0,0,0,0.7)";
        const damage_percent = 1 - Math.max(0, Math.min(1, entity.hp / entity.max_hp));
        ctx.fillRect((entity.x + path_offset[0]) * cell_size + cell_margin, (entity.y + path_offset[1]) * cell_size + cell_margin, cell_size - cell_margin * 2, (cell_size - cell_margin * 2) * damage_percent);

        const attack_percent = Math.min(1, entity.attack_speed * entity.attack_timer / ticks_per_second);
        ctx.strokeStyle = 'yellow';
        ctx.beginPath();
        ctx.moveTo((entity.x + path_offset[0]) * cell_size + cell_margin,
            (entity.y + path_offset[1] + 1) * cell_size - cell_margin);
        ctx.lineTo((entity.x + path_offset[0]) * cell_size + cell_margin + (cell_size - cell_margin * 2) * attack_percent,
            (entity.y + path_offset[1] + 1) * cell_size - cell_margin);
        ctx.stroke();
    }

    if (time_since_entity_hovered >= 15) {
        hovered_entity = null;
    }

    ctx.translate(-translation[0], -translation[1]);
}

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
const zoom = cell_size / 40.0;

function handle_inputs() {
    if(keys_pressed.space) {
        camera_origin[0] = (player_entity?.x * cell_size + cell_size /2);
        camera_origin[1] = (player_entity?.y * cell_size + cell_size /2);
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
    } else if (event.deltaY > 0 && cell_size > 5) {
        cell_size /= 2;
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

    // Process scheduled callbacks
    for (let i = 0; i < scheduled_callbacks.length; i++) {
        const scheduled_callback = scheduled_callbacks[i];
        if(tick_counter != scheduled_callback.tick_date) continue;

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
                path.progress += entity.speed;

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
                if (!visited.has(key)) {
                    visited.add(key);
                    queue.push([...path, [nx, ny]]);
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
    const attack_timer_up = context.source_entity.attack_timer >= ticks_per_second / context.source_entity.attack_speed;
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
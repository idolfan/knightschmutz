// canvas -----------------------------------------------------------------------------------------------------------------------
const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
window.addEventListener('resize', resizeCanvas, false);
resizeCanvas();
// End canvas --------------------------------------------------------------------------------------------------------------------
// Game state --------------------------------------------------------------------------------------------------------------------
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
// End game state ----------------------------------------------------------------------------------------------------------------
// Init state --------------------------------------------------------------------------------------------------------------------
area_board = Array.from({ length: world_area_size }, () => Array(world_area_size).fill(0));
for (let i = 0; i < world_area_size; i++) {
    for (let j = 0; j < world_area_size; j++) {
        area_board[i][j] = Math.random() < 0.66 ? 1 : 0; // Randomly fill the area with 1s and 0s
    }
}

/** @type {Player} */
const player = {
    id: id_counter++,
    display_name: "test",
}

add_player(player);
const player_entity = entities[player.entity_index];

/** @type {Array<Entity>} */
const start_entites = [
    {
        display_name: "test",
        x: 10,
        y: 10,
        speed: getRandomInt(2, 8),
        path: null,
        entity_type: 'ENEMY',
    },
    {
        display_name: "test2",
        x: 20,
        y: 20,
        speed: getRandomInt(2, 8),
        path: null,
        entity_type: 'ENEMY',
    },
    {
        display_name: "test3",
        x: 30,
        y: 30,
        speed: getRandomInt(2, 8),
        path: null,
        entity_type: 'ENEMY',
    }
]

for (let i = 0; i < start_entites.length; i++) {
    const entity = start_entites[i];
    add_entity(entity);
}

// End init state ----------------------------------------------------------------------------------------------------------------
// Game logic --------------------------------------------------------------------------------------------------------------------
function add_entity(entity) {
    entity.id = id_counter++;
    entities.push(entity);
    entity.entity_index = entities.length - 1;
    if (entity.entity_type === 'PLAYER') {
        player_entities.push(entity);
    } else if (entity.entity_type === 'ENEMY') {
        enemy_entities.push(entity);
    }
    return entity;
}

function add_player(player) {
    /** @type {Entity} */
    const player_entity = {
        display_name: player.display_name,
        x: 10,
        y: 10,
        speed: 5,
        entity_type: 'PLAYER',
    }
    player.entity_index = add_entity(player_entity).entity_index;
    player.player_index = players.length;
    players.push(player);
}
// End game logic ----------------------------------------------------------------------------------------------------------------
// Render ------------------------------------------------------------------------------------------------------------------------
const camera_origin = [canvas.width / 2, canvas.height / 2];
function draw() {
    updateCamera();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = 'white';
    ctx.strokeStyle = 'gray';
    const zoom = cell_size / 40.0;
    const translation = [-camera_origin[0] * zoom + (canvas.width / 2), -camera_origin[1] * zoom + canvas.height / 2];
    ctx.translate(translation[0], translation[1]);
    // Draw cells
    for (let i = 0; i < world_area_size; i++) {
        for (let j = 0; j < world_area_size; j++) {
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
        ctx.fillStyle = 'blue';
        ctx.fillRect(entity.x * cell_size + cell_margin, entity.y * cell_size + cell_margin, cell_size - cell_margin * 2, cell_size - cell_margin * 2);
        ctx.strokeStyle = 'black';
        ctx.strokeRect(entity.x * cell_size + cell_margin, entity.y * cell_size + cell_margin, cell_size - cell_margin * 2, cell_size - cell_margin * 2);
    }

    // Draw paths
    for (let i = 0; i < paths.length; i++) {
        const path = paths[i];
        ctx.fillStyle = 'red';
        ctx.strokeStyle = 'black';
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
        if (entity.entity_type != 'PLAYER') {
            ctx.fillStyle = 'red';
            ctx.fillRect(entity.x * cell_size + cell_margin, entity.y * cell_size + cell_margin, cell_size - cell_margin * 2, cell_size - cell_margin * 2);
            ctx.strokeStyle = 'black';
            ctx.strokeRect(entity.x * cell_size + cell_margin, entity.y * cell_size + cell_margin, cell_size - cell_margin * 2, cell_size - cell_margin * 2);
        }
    }

    ctx.translate(-translation[0], -translation[1]);

}

function render() {
    draw();
    requestAnimationFrame(render);
}
// End render -------------------------------------------------------------------------------------------------------------------
// Input handling ---------------------------------------------------------------------------------------------------------------
const keys_pressed = {
    w: false,
    a: false,
    s: false,
    d: false,
    shift: false,
}
const camera_speed = 16;

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

window.addEventListener('mousedown', (event) => {
    switch (event.button) {
        case 0: // Left mouse button
            const zoom = cell_size / 40.0;
            const translation = [-camera_origin[0] * zoom + (canvas.width / 2), -camera_origin[1] * zoom + canvas.height / 2];
            clicked_cell = [
                Math.floor((event.clientX - translation[0]) / cell_size),
                Math.floor((event.clientY - translation[1]) / cell_size)
            ]

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

            break;
        case 1: // Middle mouse button (wheel)
            break;
        case 2: // Right mouse button
            break;
        default:
            console.log('Unknown mouse button:', event.button);
    }
});

window.addEventListener("wheel", (event) => {
    if (event.deltaY < 0 && cell_size < 320) {
        cell_size *= 2;
    } else if (event.deltaY > 0 && cell_size > 5) {
        cell_size /= 2;
    }

});

// End input handling ----------------------------------------------------------------------------------------------------------
// Updating --------------------------------------------------------------------------------------------------------------------

render();
const ticks_per_second = 60;

function tick() {
    for (let i = 0; i < paths.length; i++) {
        const path = paths[i];
        const entity = entities[path.entity_index];
        path.progress += entity.speed;
        if (path.progress >= ticks_per_second) {
            path.progress -= ticks_per_second;
            const pos = path.path_steps.shift();
            entity.x = pos[0];
            entity.y = pos[1];
        }
        if (path.path_steps.length === 0) {
            paths.splice(i, 1);
            entity.path = null;
            //console.log('path finished', path);
            if (path == player_path) {
                player_path = null;
            }
            delete path;
            i--;
        }
    }

    // Entity movement choice
    for (let i = 0; i < enemy_entities.length; i++) {
        const entity = enemy_entities[i];
        const distance_to_players = player_entities.map(player_entity => {
            return Math.sqrt(Math.pow(entity.x - player_entity.x, 2) + Math.pow(entity.y - player_entity.y, 2));
        });

        const closest_player_index = distance_to_players.indexOf(Math.min(...distance_to_players));
        if (closest_player_index != -1) {
            const closest_player_entity = player_entities[closest_player_index];
            const distance_to_closest_player = distance_to_players[closest_player_index];
            if (distance_to_closest_player < 10) {
                const path = calculate_path_positions([entity.x, entity.y], [closest_player_entity.x, closest_player_entity.y]);
                if (path != null) {
                    change_path(entity, path);
                    continue;
                }
            }
        }

        if (!entity.path) {
            //console.log('entity not player', entity);
            const path = calculate_path_positions([entity.x, entity.y], [getRandomInt(entity.x - 5, entity.x + 5), getRandomInt(entity.y - 5, entity.y + 5)]);
            if (path != null) {
                change_path(entity, path);
            }
        }
    }
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
            if (!same_first_step) existing_path.progress = ticks_per_second;
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

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

setInterval(() => {
    tick();
}
    , 1000 / ticks_per_second);

/** @returns {Path} */
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

// End updating ----------------------------------------------------------------------------------------------------------------
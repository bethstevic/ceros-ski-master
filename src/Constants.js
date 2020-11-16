export const GAME_WIDTH = window.innerWidth;
export const GAME_HEIGHT = window.innerHeight;

export const SKIER_CRASH = 'skierCrash';
export const SKIER_LEFT = 'skierLeft';
export const SKIER_LEFTDOWN = 'skierLeftDown';
export const SKIER_DOWN = 'skierDown';
export const SKIER_RIGHTDOWN = 'skierRightDown';
export const SKIER_RIGHT = 'skierRight';
export const SKIER_JUMP_START = 'skierJumpStart';
export const SKIER_COORDINATES = 'skierCoordinates';
export const RAMP = 'ramp';
export const TREE = 'tree';
export const TREE_CLUSTER = 'treeCluster';
export const ROCK1 = 'rock1';
export const ROCK2 = 'rock2';
export const RHINO_DEFAULT = 'rinoDefault';
export const RHINO_LIFT_EAT_1 = 'rinoLiftEat1';
export const RHINO_LIFT_EAT_2 = 'rinoLiftEat2';
export const RHINO_LIFT_EAT_3 = 'rinoLiftEat3';
export const RHINO_LIFT_EAT_4 = 'rinoLiftEat4';
export const RHINO_MOUTH_OPEN = 'rinoMouthOpen';
export const RHINO_LIFT = 'rinoLift';
export const RHINO_RUN_LEFT_1 = 'rinoRunLeft1';
export const RHINO_RUN_LEFT_2 = 'rinoRunLeft2';
export const RHINO_SHOULD_RUN = 'rhinoShouldRun';
export const RHINO_CAUGHT_SKIER = 'rhinoCaughtSkier';
export const RHINO_COMING = 'rhinoComing';
export const END_GAME = 'endGame';


export const SKIER_STARTING_SPEED = 10;
export const SKIER_DIAGONAL_SPEED_REDUCER = 1.4142;
export const JUMP_DURATION = 500;
export const TIME_TO_EAT_SKIER = 3000;
export const START_DISTANCE = 200;
export const RHINO_CHANGE_ASSET = 5000

export const ASSETS = {
    [RAMP]: 'img/jump_ramp.png',
    [SKIER_CRASH]: 'img/skier_crash.png',
    [SKIER_LEFT]: 'img/skier_left.png',
    [SKIER_LEFTDOWN]: 'img/skier_left_down.png',
    [SKIER_DOWN]: 'img/skier_down.png',
    [SKIER_RIGHTDOWN]: 'img/skier_right_down.png',
    [SKIER_RIGHT]: 'img/skier_right.png',
    [SKIER_JUMP_START]: 'img/skier_jump_1.png',
    [TREE]: 'img/tree_1.png',
    [TREE_CLUSTER]: 'img/tree_cluster.png',
    [ROCK1]: 'img/rock_1.png',
    [ROCK2]: 'img/rock_2.png',
    [RHINO_DEFAULT]: 'img/rhino_default.png',
    [RHINO_LIFT_EAT_1]: 'img/rhino_lift_eat_1.png',
    [RHINO_LIFT_EAT_2]: 'img/rhino_lift_eat_2.png',
    [RHINO_LIFT_EAT_3]: 'img/rhino_lift_eat_3.png',
    [RHINO_LIFT_EAT_4]: 'img/rhino_lift_eat_4.png',
    [RHINO_MOUTH_OPEN]: 'img/rhino_lift_mouth_open.png',
    [RHINO_LIFT]: 'img/rhino_lift.png',
    [RHINO_RUN_LEFT_1]: 'img/rhino_run_left.png',
    [RHINO_RUN_LEFT_2]: 'img/rhino_run_left_2.png',

};

export const SKIER_DIRECTIONS = {
    CRASH: 0,
    LEFT: 1,
    LEFT_DOWN: 2,
    DOWN: 3,
    RIGHT_DOWN: 4,
    RIGHT: 5,
    JUMP_START: 6,
    STOP_RUNNING: 7,
};

export const RHINO_DIRECTIONS = {
  DEFAULT: 0,
  EAT_1: 2,
  EAT_2: 3,
  EAT_3: 4,
  EAT_4: 5,
  MOUTH_OPEN: 6,
  LIFT: 7,
  LEFT_1: 8,
  LEFT_2: 9,
}

export const SKIER_DIRECTION_ASSET = {
    [SKIER_DIRECTIONS.CRASH]: SKIER_CRASH,
    [SKIER_DIRECTIONS.LEFT]: SKIER_LEFT,
    [SKIER_DIRECTIONS.LEFT_DOWN]: SKIER_LEFTDOWN,
    [SKIER_DIRECTIONS.DOWN]: SKIER_DOWN,
    [SKIER_DIRECTIONS.RIGHT_DOWN]: SKIER_RIGHTDOWN,
    [SKIER_DIRECTIONS.RIGHT]: SKIER_RIGHT,
    [SKIER_DIRECTIONS.JUMP_START]: SKIER_JUMP_START,
};

export const RHINO_DIRECTION_ASSET = {
  [RHINO_DIRECTIONS.DEFAULT]: RHINO_DEFAULT,
  [RHINO_DIRECTIONS.EAT_1]: RHINO_LIFT_EAT_1,
  [RHINO_DIRECTIONS.EAT_2]: RHINO_LIFT_EAT_2,
  [RHINO_DIRECTIONS.EAT_3]: RHINO_LIFT_EAT_3,
  [RHINO_DIRECTIONS.EAT_4]: RHINO_LIFT_EAT_4,
  [RHINO_DIRECTIONS.MOUTH_OPEN]: RHINO_MOUTH_OPEN,
  [RHINO_DIRECTIONS.LIFT]: RHINO_LIFT,
  [RHINO_DIRECTIONS.LEFT_1]: RHINO_RUN_LEFT_1,
  [RHINO_DIRECTIONS.LEFT_2]: RHINO_RUN_LEFT_2,
}

export const KEYS = {
    LEFT : 37,
    RIGHT : 39,
    UP : 38,
    DOWN : 40,
    JUMP : 32
};

import * as Constants from "../Constants";
import { Entity } from "./Entity";
import { intersectTwoRects, Rect } from "../Core/Utils";

export class Skier extends Entity {
    assetName = Constants.SKIER_DOWN;
    direction = Constants.SKIER_DIRECTIONS.DOWN;
    hasCollided = false;
    skierIsJumping = false;
    speed = Constants.SKIER_STARTING_SPEED;
    skierShouldJump = false

    constructor(x, y) {
        super(x, y);
    }

    setDirection(direction) {
        this.direction = direction;
        this.updateAsset();
    }

    updateAsset() {
        this.assetName = Constants.SKIER_DIRECTION_ASSET[this.direction];
    }

    move() {
        switch(this.direction) {
            case Constants.SKIER_DIRECTIONS.LEFT_DOWN:
                this.moveSkierLeftDown();
                break;
            case Constants.SKIER_DIRECTIONS.DOWN:
                this.moveSkierDown();
                break;
            case Constants.SKIER_DIRECTIONS.RIGHT_DOWN:
                this.moveSkierRightDown();
                break;
        }
    }

    resetHasCrashed() {
      if(this.hasCollided) {
        this.hasCollided = false
      }
    }

    moveSkierLeft() {
        this.x -= Constants.SKIER_STARTING_SPEED;
    }

    moveSkierLeftDown() {
        this.x -= this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierDown() {
        this.y += this.speed;
    }

    moveSkierRightDown() {
        this.x += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
        this.y += this.speed / Constants.SKIER_DIAGONAL_SPEED_REDUCER;
    }

    moveSkierRight() {
        this.x += Constants.SKIER_STARTING_SPEED;
    }

    moveSkierUp() {
        this.y -= Constants.SKIER_STARTING_SPEED;
    }

    startSkierJump() {
      this.skierIsJumping = true
      setTimeout(() => {
        this.endSkierJump()
      }, Constants.JUMP_DURATION)
    }

    endSkierJump() {
      this.resetHasCrashed()
      this.y += this.speed * 2;
      this.skierIsJumping = false;
      this.setDirection(this.direction - 4);
    }

    turnLeft() {
        this.resetHasCrashed()
        if(
          this.direction === Constants.SKIER_DIRECTIONS.LEFT ||
          this.direction === Constants.SKIER_DIRECTIONS.CRASH
        ) {
            this.moveSkierLeft();
        }
        else {
            this.setDirection(this.direction - 1);
        }
    }

    turnRight() {
        this.resetHasCrashed()
        if(this.direction === Constants.SKIER_DIRECTIONS.RIGHT || this.direction === Constants.SKIER_DIRECTIONS.CRASH) {
            this.moveSkierRight();
        }
        else {
            this.setDirection(this.direction + 1);
        }
    }

    turnUp() {
      this.resetHasCrashed()
        if(this.direction === Constants.SKIER_DIRECTIONS.LEFT || this.direction === Constants.SKIER_DIRECTIONS.RIGHT) {
            this.moveSkierUp();
        }
    }

    turnDown() {
        this.resetHasCrashed()
        this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
    }

    jump() {
      if(
          Constants.SKIER_DIRECTIONS.JUMP_START && (this.direction !== Constants.SKIER_DIRECTIONS.CRASH)) {
        this.startSkierJump()
        this.setDirection(Constants.SKIER_DIRECTIONS.JUMP_START);
      }
    }

    checkIfSkierHitObstacle(obstacleManager, assetManager) {
        const asset = assetManager.getAsset(this.assetName);
        const skierBounds = new Rect(
            this.x - asset.width / 2,
            this.y - asset.height / 2,
            this.x + asset.width / 2,
            this.y - asset.height / 4
        );

        const collision = obstacleManager.getObstacles().find((obstacle) => {
            const obstacleAsset = assetManager.getAsset(obstacle.getAssetName());

            const obstaclePosition = obstacle.getPosition();
            const obstacleBounds = new Rect(
                obstaclePosition.x - obstacleAsset.width / 2,
                obstaclePosition.y - obstacleAsset.height / 2,
                obstaclePosition.x + obstacleAsset.width / 2,
                obstaclePosition.y
            );
            const isCollision = intersectTwoRects(skierBounds, obstacleBounds) && !this.hasCollided

            if (isCollision && (obstacle.assetName === Constants.RAMP) && !this.hasCollided) {
              this.skierShouldJump = true
            }

            return isCollision
        });

        if(collision && !this.hasCollided && !this.skierShouldJump) {
            this.setDirection(Constants.SKIER_DIRECTIONS.CRASH);
            this.hasCollided = true
        }

        if(this.skierShouldJump && !this.hasCollided) {
          this.jump()
          this.skierShouldJump = false
          this.hasCollided = true
        }
    };
}

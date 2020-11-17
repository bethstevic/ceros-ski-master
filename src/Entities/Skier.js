import * as Constants from "Constants";
import { intersectTwoRects, Rect } from "Core/Utils";
import { Entity } from "./Entity";

export class Skier extends Entity {
    assetName = Constants.SKIER_DOWN;
    direction = Constants.SKIER_DIRECTIONS.DOWN;
    hasCollided = false;
    skierIsJumping = false;
    speed = Constants.SKIER_STARTING_SPEED;
    skierShouldJump = false
    hasBeenCaught = false
    rhinoIsComing = false

    constructor(x, y, store) {
        super(x, y, store);
        document.addEventListener(Constants.RHINO_CAUGHT_SKIER, this.skierCaught)
        document.addEventListener(Constants.RHINO_COMING, this.rhinoComing)
    }

    sendCoordinantsToRhino = () => {
      const event = new CustomEvent(Constants.SKIER_COORDINATES, {
        x: this.x,
        y: this.y,
      })
      document.dispatchEvent(event)
    }

    setDirection(direction) {
        this.direction = direction;
        this.updateAsset();
        if(this.rhinoIsComing) {
          console.log('***', 'SKIER KNOWS RHINO IS COMING: ', this.x, this.y)
          this.sendCoordinantsToRhino()
        }
    }

    rhinoComing() {
      this.rhinoIsComing = true
      console.log('***', 'Y: ', this.y)
      console.log('***', 'X: ', this.x)
      const event = new CustomEvent(Constants.SKIER_COORDINATES, {
        detail: {
          x: this.x,
          y: this.y,
        }
      })
      document.dispatchEvent(event)
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
        console.log('***', 'XX: ', this.x)
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
          (this.direction === Constants.SKIER_DIRECTIONS.LEFT ||
          this.direction === Constants.SKIER_DIRECTIONS.CRASH) &&
          !this.hasBeenCaught
        ) {
            this.moveSkierLeft();
        }
        else {
            this.setDirection(this.direction - 1);
        }
    }

    turnRight() {
        this.resetHasCrashed()
        if(
          (this.direction === Constants.SKIER_DIRECTIONS.RIGHT ||
          this.direction === Constants.SKIER_DIRECTIONS.CRASH) &&
          !this.hasBeenCaught
        ) {
            this.moveSkierRight();
        }
        else {
            this.setDirection(this.direction + 1);
        }
    }

    turnUp() {
      this.resetHasCrashed()
        if(
          (this.direction === Constants.SKIER_DIRECTIONS.LEFT ||
          this.direction === Constants.SKIER_DIRECTIONS.RIGHT) &&
          !this.hasBeenCaught
        ) {
            this.moveSkierUp();
        }
    }

    turnDown() {
        if (!this.hasBeenCaught) {
          this.resetHasCrashed()
          this.setDirection(Constants.SKIER_DIRECTIONS.DOWN);
        }
    }

    jump() {
      if(
          Constants.SKIER_DIRECTIONS.JUMP_START &&
          (this.direction !== Constants.SKIER_DIRECTIONS.CRASH) &&
          !this.hasBeenCaught
        ) {
        this.startSkierJump()
        this.setDirection(Constants.SKIER_DIRECTIONS.JUMP_START);
      }
    }

    skierCaught = () => {
      this.hasBeenCaught = true
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

        if(collision && !this.hasCollided && !this.skierShouldJump && !this.hasBeenCaught) {
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

import * as Constants from 'Constants';
import { Entity } from './Entity';

export class Rhino extends Entity {
  hasCaughtSkier = false;
  eatSkierStart = false;
  direction = Constants.RHINO_DIRECTION_ASSET.RHINO_DIRECTIONS_LEFT_1;
  speed = Constants.SKIER_STARTING_SPEED;
  distance = Constants.START_DISTANCE;


  constructor() {
    super()
    document.addEventListener(Constants.SKIER_COORDINATES, this.setSkierCoordinates)
  }

  setDirection = (direction) => {
    this.direction = direction;
    this.updateAsset();
  }

  setSkierCoordinates = (e) => {
    console.log('***', 'EVENT: ', e)
    if(e) {
      this.currentSkierCoordinates = [e.detail.x, e.detail.y];
    }
  }

  updateAsset() {
      this.assetName = Constants.RHINO_DIRECTION_ASSET[this.direction];
  }

  updateDistance() {
    this.distance = this.distance - Constants.SKIER_STARTING_SPEED;
  }

  updateLocation() {
    this.setSkierCoordinates();
    this.x = this.currentSkierCoordinates[0];
    this.y = this.currentSkierCoordinates[1];
  }

  rhinoRun() {
    setInterval(() => {
      if (this.direction === Constants.RHINO_DIRECTION_ASSET.RHINO_DIRECTIONS_LEFT_1) {
        this.setDirection(Constants.RHINO_DIRECTION_ASSET.RHINO_DIRECTIONS_LEFT_2);
        this.updateDistance();
      } else {
        this.setDirection(Constants.RHINO_DIRECTION_ASSET.RHINO_DIRECTIONS_LEFT_1);
        this.updateDistance();
      }
    }, Constants.RHINO_CHANGE_ASSET)
  }

  checkIfCaughtSkier() {
    if(this.distance === 0 && !eatSkierStart) {
      const event = new CustomEvent(Constants.RHINO_CAUGHT_SKIER)
      document.dispatchEvent(event)
      this.hasCaughtSkier = true
      this.eatSkierStart = true
      this.eatSkier()
    }
  }

  finish() {
    this.setDirection(Constants.RHINO_DIRECTION_ASSET.RHINO_DEFAULT)
    // dispatch event
  }

  eatSkier() {
    const actions = [
      Constants.RHINO_LIFT,
      Constants.RHINO_LIFT_EAT_1,
      Constants.RHINO_LIFT_EAT_2,
      Constants.RHINO_LIFT_EAT_3,
      Constants.RHINO_LIFT_EAT_4,
    ]

    return actions.map((action) => {
      setTimeout(() => {
        this.setDirection(action);
      }, Constants.RHINO_CHANGE_ASSET)

      if (this.direction === Constants.RHINO_LIFT_EAT_4) {
        this.finish()
      }
    })
  }

  move() {
    this.updateLocation();
    this.checkIfCaughtSkier();

    if (!this.eatSkierStart) {
      this.rhinoRun()
    }

    if (this.eatSkierStart) {
      clearInterval(this.rhinoRun)
    }
  }


  // start run
  // alternate between both run assets
  // run in direction of current skier location
  // when rhino collides with skier start other assests
  // first rhinoLift
  // after a few milliseconds use rhino mouth open
  // next circle through the eat assets
  // next use rhino mouth open
  // last asset is rhino default
  // trigger game over
}

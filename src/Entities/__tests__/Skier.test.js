import * as Constants from 'Constants'
import { AssetManager } from 'Core/AssetManager'
import { ObstacleManager } from 'Entities/Obstacles/ObstacleManager'
import { Skier } from '../Skier'

// TODO: uncomment once classes are properly mocked
// jest.mock('Core/AssetManager', () => {
//   // jest mock does not allow out of scope variables. Constants has to be redefined
//   // inside this function
//   const Constants = Constants
//   return {
//     getAsset: jest.fn().mockImplementation(() => {
//       return {
//         loadedAssets: [
//           Constants.ROCK1,
//         ],
//       }
//     })
//   }
// })
//
// jest.mock('Entities/Obstacles/ObstacleManager', () => {
//   const Constants = Constants
//   return {
//     getAsset: jest.fn().mockImplementation(() => {
//       return [
//         {x: -251, y: 104, assetName: "rock2"},
//       ]
//     })
//   }
// })

describe('Entities/Skier', () => {
  let skier

  beforeEach(() => {
    skier = new Skier(0, 0)
  })

  afterEach(() => {
    jest.clearAllMocks()
  })

  it('sets default fields', () => {
    expect(skier.direction).toEqual(Constants.SKIER_DIRECTIONS.DOWN)
    expect(skier.hasCrashed).toEqual(false)
    expect(skier.speed).toEqual(Constants.SKIER_STARTING_SPEED)
  })

  describe('setDirection', () => {
    it('updates the direction', () => {
      skier.setDirection(3)
      expect(skier.direction).toEqual(3)
    })

    it('calls the updateAsset method', () => {
      skier.updateAsset = jest.fn()
      skier.setDirection(3)
      expect(skier.updateAsset).toHaveBeenCalledTimes(1)
    })
  })

  describe('Update Asset', () => {
    it('sets a new asset name', () => {
      skier.assetName = Constants.SKIER_DOWN
      skier.direction = 4
      skier.updateAsset()
      expect(skier.assetName).toEqual(Constants.SKIER_RIGHTDOWN)
    })
  })

  describe('move', () => {
    // have to reset skier as beforeEach only runs before each it block.
    // The below three methods are mocked here to avoid remocking them for each
    // it block
    let skier = new Skier(0,0)
    skier.moveSkierLeftDown = jest.fn()
    skier.moveSkierDown = jest.fn()
    skier.moveSkierRightDown = jest.fn()

    it(`calls the moveSkierLeftDown method if the direction is ${Constants.SKIER_DIRECTIONS.LEFT_DOWN}`, () => {
      skier.direction = 2
      skier.move()
      expect(skier.moveSkierLeftDown).toHaveBeenCalledTimes(1)
      expect(skier.moveSkierDown).toHaveBeenCalledTimes(0)
      expect(skier.moveSkierRightDown).toHaveBeenCalledTimes(0)
    })

    it(`calls the moveSkierDown method if the direction is ${Constants.SKIER_DIRECTIONS.DOWN}`, () => {
      skier.direction = 3
      skier.move()
      expect(skier.moveSkierDown).toHaveBeenCalledTimes(1)
      expect(skier.moveSkierLeftDown).toHaveBeenCalledTimes(0)
      expect(skier.moveSkierRightDown).toHaveBeenCalledTimes(0)
    })

    it(`calls the moveSkierRightDown method if the direction is ${Constants.SKIER_DIRECTIONS.RIGHT_DOWN}`, () => {
      skier.direction = 4
      skier.move()
      expect(skier.moveSkierRightDown).toHaveBeenCalledTimes(1)
      expect(skier.moveSkierDown).toHaveBeenCalledTimes(0)
      expect(skier.moveSkierLeftDown).toHaveBeenCalledTimes(0)
    })
  })

  describe('resetHasCrashed', () => {
    it('sets hasCrashed to false if it currently is true', () => {
      skier.hasCrashed = true
      skier.resetHasCrashed()
      expect(skier.hasCrashed).toEqual(false)
    })

    it('does not change hasCrashed if it is already false', () => {
      // not necessary to set it hasCrashed to false as that is the default
      skier.resetHasCrashed()
      expect(skier.hasCrashed).toEqual(false)
    })
  })

  describe('moving the skier', () => {
    const checkNewXYValue = (expectedValue, skierValue) => {
      expect(skierValue).toEqual(expectedValue)
    }

    it('moveSkierLeft sets x to the correct starting speed', () => {
      skier.x = 1
      skier.moveSkierLeft()
      checkNewXYValue(-9, skier.x)
    })

    it('moveSkierLeftDown sets x and y to the correct starting speed', () => {
      skier.x = 1
      skier.y = 1
      skier.moveSkierLeftDown()
      checkNewXYValue(-6.071135624381276, skier.x)
      checkNewXYValue(8.071135624381277, skier.y)
    })

    it('moveSkierDown sets x to the correct starting speed', () => {
      skier.y = 1
      skier.moveSkierDown()
      checkNewXYValue(11, skier.y)
    })

    it('moveSkierRightDown sets x and y to the correct starting speed', () => {
      skier.x = 1
      skier.y = 1
      skier.moveSkierRightDown()
      checkNewXYValue(8.071135624381277, skier.x)
      checkNewXYValue(8.071135624381277, skier.y)
    })

    it('moveSkierRight sets x to the correct starting speed', () => {
      skier.x = 1
      skier.moveSkierRight()
      checkNewXYValue(11, skier.x)
    })

    it('moveSkierUp sets x to the correct starting speed', () => {
      skier.y = 1
      skier.moveSkierUp()
      checkNewXYValue(-9, skier.y)
    })

    describe('turnLeft', () => {
      beforeEach(() => {
        skier.direction = Constants.SKIER_DIRECTIONS.LEFT
      })

      it('calls resetHasCrashed', () => {
        skier.resetHasCrashed = jest.fn()
        skier.turnLeft()
        expect(skier.resetHasCrashed).toHaveBeenCalledTimes(1)
      })

      it('calls moveSkierLeft and does not decrease the direction if the skier direction is left', () => {
        skier.moveSkierLeft = jest.fn()
        skier.turnLeft()
        expect(skier.moveSkierLeft).toHaveBeenCalledTimes(1)
      })

      // test for bug fix
      it('calls moveSkierLeft and does not decrease the direction if the skier direction is crash', () => {
        skier.moveSkierLeft = jest.fn()
        skier.turnLeft()
        expect(skier.moveSkierLeft).toHaveBeenCalledTimes(1)
      })

      it('decreases the direction by 1 if the skier direction is not left or crash', () => {
        skier.direction = Constants.SKIER_DIRECTIONS.RIGHT
        skier.setDirection = jest.fn()
        skier.turnLeft()
        expect(skier.setDirection).toHaveBeenCalledWith(skier.direction - 1)
      })
    })

    describe('turnRight', () => {
      beforeEach(() => {
        skier.direction = Constants.SKIER_DIRECTIONS.RIGHT
      })

      it('calls resetHasCrashed', () => {
        skier.resetHasCrashed = jest.fn()
        skier.turnRight()
        expect(skier.resetHasCrashed).toHaveBeenCalledTimes(1)
      })

      it('calls moveSkierRight and does not increase the direction if the skier direction is right', () => {
        skier.moveSkierRight = jest.fn()
        skier.turnRight()
        expect(skier.moveSkierRight).toHaveBeenCalledTimes(1)
      })

      it('increass the direction by 1 if the skier direction is not right', () => {
        skier.direction = Constants.SKIER_DIRECTIONS.LEFT
        skier.setDirection = jest.fn()
        skier.turnRight()
        expect(skier.setDirection).toHaveBeenCalledWith(skier.direction + 1)
      })
    })

    describe('turnUp', () => {
      beforeEach(() => {
        skier.moveSkierUp = jest.fn()
      })

      afterEach(() => {
        jest.clearAllMocks()
      })

      it('calls resetHasCrashed', () => {
        skier.resetHasCrashed = jest.fn()
        skier.turnUp()
        expect(skier.resetHasCrashed).toHaveBeenCalledTimes(1)
      })

      it('calls moveSkierUp if the direction is left', () => {
        skier.direction = Constants.SKIER_DIRECTIONS.LEFT
        skier.turnUp()
        expect(skier.moveSkierUp).toHaveBeenCalledTimes(1)
      })

      it('calls moveSkierUp if the direction is left', () => {
        skier.direction = Constants.SKIER_DIRECTIONS.RIGHT
        skier.turnUp()
        expect(skier.moveSkierUp).toHaveBeenCalledTimes(1)
      })

      it('does not call moveSkierUp if the direction is not left or right', () => {
        skier.direction = Constants.SKIER_DIRECTIONS.DOWN
        skier.turnUp()
        expect(skier.moveSkierUp).toHaveBeenCalledTimes(0)
      })
    })

    describe('turnDown', () => {
      it('calls resetHasCrashed', () => {
        skier.resetHasCrashed = jest.fn()
        skier.turnDown()
        expect(skier.resetHasCrashed).toHaveBeenCalledTimes(1)
      })

      it(`sets the direction to ${Constants.SKIER_DIRECTIONS.DOWN}`, () => {
        skier.setDirection = jest.fn()
        skier.turnDown()
        expect(skier.setDirection).toHaveBeenCalledWith(Constants.SKIER_DIRECTIONS.DOWN)
      })
    })
  })

  // TODO: need to investigate a better way to mock a class method
  // describe('checkIfSkierHitObstacle', () => {
  //   let assetManager
  //   let obstacleManager
  //
  //   beforeEach(() => {
  //     assetManager = new AssetManager
  //     obstacleManager = new ObstacleManager
  //     skier.setDirection = jest.fn()
  //     skier.assetName = Constants.ROCK1
  //   })
  //
  //   it(`sets the direction and sets hasCrashed to true if there is a collision and hasCrashed is false`, () => {
  //     skier.x = -251
  //     skier.y = 104
  //     checkIfSkierHitObstacle(assetManager, obstacleManager)
  //     expect(skier.setDirection).toHaveBeenCalledWith(Constants.SKIER_DIRECTIONS.CRASH)
  //     expect(skier.hasCrashed).toEqual(true)
  //   })
  //
  //   // test for direction loop bug fix
  //   it('does not set the direction if there is a collision and hasCrashed is true', () => {
  //     skier.x = -251
  //     skier.y = 104
  //     skier.hasCrashed = true
  //     skier.checkIfSkierHitObstacle(assetManager, obstacleManager)
  //     expect(skier.setDirection).toHaveBeenCalledTimes(0)
  //   })
  //
  //   it('does not set the direction if there is no collision and hasCrashed is false', () => {
  //     skier.x = 1
  //     skier.y = 1
  //     skier.checkIfSkierHitObstacle(assetManager, obstacleManager)
  //     expect(skier.setDirection).toHaveBeenCalledTimes(0)
  //   })
  //
  //   it('does not set the direction if there is no collision and also hasCrashed is true', () => {
  //     skier.x = 1
  //     skier.y = 1
  //     skier.hasCrashed = true
  //     skier.checkIfSkierHitObstacle(assetManager, obstacleManager)
  //     expect(skier.setDirection).toHaveBeenCalledTimes(0)
  //   })
  // })
})

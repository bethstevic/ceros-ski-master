import * as Constants from 'Constants';
import { Skier } from '../Skier'

describe('Entities/Skier', () => {
  it('sets a default assetName', () => {
    expect(Skier.assetName).toEqual(Constants.SKIER_DOWN)
  })
})

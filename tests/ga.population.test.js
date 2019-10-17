import {Population} from '../src/ga/population'
import {Binary, Alphabet, WeighAlphabet} from '../src/ga/encoders'


test('Building object Population should be ok', ()=>{
  let target = [104, 101, 108, 108, 111]
  let encoder  = new Alphabet(target.length)
  let population = new Population(500, target, encoder);
  population.update(.01)
});

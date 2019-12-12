import {Population} from '../src/ga/population'
import {DeoxyribonucleicAcid} from '../src/ga/dna'

import {Binary, Alphabet, WeighAlphabet} from '../src/ga/encoders'


test('Building object Population should be ok', ()=>{
  let target = [104, 101, 108, 108, 111]
  let encoder  = new Alphabet(target.length)
  let population = new Population(500, target, encoder, DeoxyribonucleicAcid);
  population.update(.01)
});

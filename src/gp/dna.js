const {DeoxyribonucleicAcid} = require('../ga/dna')
const {randomInt} = require('mathjs')

class DeoxyribonucleicAcidGP extends DeoxyribonucleicAcid{

  constructor(encoder, allowedDeepth=2){
    super(encoder, false)
    this.allowedDeepth  = allowedDeepth
    this.genes = encoder.get(allowedDeepth)
  }


  crossOver(couple, childOne, childTwo){
    [childOne.genes, childTwo.genes] = [this.genes.copy(),
                                        couple.genes.copy()]
    let [sOne, sTwo] = [childOne.genes.serialize(),
                        childTwo.genes.serialize()]
    sOne[randomInt(sOne.length)].replace(
      sTwo[randomInt(sTwo.length)].copy()
    )
    sTwo[randomInt(sTwo.length)].replace(
      sOne[randomInt(sOne.length)].copy()
    )
  }

  mutate(rate){
    if(Math.random() <= rate){
      let serialNodes = this.genes.serialize()
      serialNodes[randomInt(serialNodes.length)].replace(
        this.encoder.get(this.allowedDeepth)
      )
    }
  }
}

module.exports = {
  DeoxyribonucleicAcidGP,
}

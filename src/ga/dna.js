
class DeoxyribonucleicAcid {

  constructor(numberGens, encoder){
    this.genes = Array.from(Array(numberGens), () => encoder.generate())
  }
}

module.exports = {
  DeoxyribonucleicAcid,
}

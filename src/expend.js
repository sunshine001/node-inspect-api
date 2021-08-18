function Expend() {
  this.startTime = 0

  this.start = function() {
    this.startTime = new Date().getTime()
  }
  
  this.end = function() {
    const endTime = new Date().getTime()
    const spendTime = endTime - this.startTime
    return spendTime >= 1000 ? `${spendTime/1000}s` : `${spendTime}ms`
  }
}

module.exports = Expend
var fs = require("fs")

const accuracyList = []
let _rules = []

exports.setRules = function (rules) {
  _rules = rules
}

exports.print = function(val) {
  console.log(val.url, 'analysis complete', val.cost)
}

exports.add = function(val) {
  accuracyList.push(val)
}

exports.all = function() {
  return accuracyList
}

exports.count = function() {
  return accuracyList.length
}

exports.result = function() {
  const corrent = accuracyList.filter(a=>a.status===200).length
  const total = accuracyList.length
  return  `${Math.round((corrent / total) * 100)}%`
}

exports.resultLogic = function() {
  if (!_rules) return '--'
  const corrent = accuracyList.filter(a=>_rules.includes(a.code)).length
  const total = accuracyList.length
  return  `${Math.round((corrent / total) * 100)}%`
}

exports.writeFile = function(outPath) {
  if (!outPath) return 
  const accuracyListStr = JSON.stringify(accuracyList)
  fs.writeFileSync(outPath, accuracyListStr)
}
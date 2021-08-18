#!/usr/bin/env node
var fs = require("fs")
const http = require('./http')
const accuracy = require('./accuracy')

const args = process.argv
if (args.length < 3 || !args[2]) return 

const filePath = args[2]
const outPath = args.length >= 4 ? args[3] : null
console.log('args:', filePath)
const samplesStr = fs.readFileSync(filePath).toString()
const samples = parseJSON(samplesStr)


const runSamples = samples.filter(s=>!!s.url)
const noRunSamples = samples.filter(s=>!s.url)

let baseUrl='', code = [], headers = {}, publicBody = {}
if (noRunSamples.length > 0) {
  const first = noRunSamples[0]
  baseUrl = first.baseUrl
  headers = first.headers
  publicBody = first.publicBody
  code = !!first.code ? first.code.split('|') : []
}

function parseJSON(val) {
  return eval('(' + val + ')')
}

function combineUrl(url) {
  return url.startsWith('http') ? url : baseUrl + url
}

function isGetMethod(type) {
  return !!type && type.toLowerCase() === 'get'
}

accuracy.setRules(code)
http.setHeaders(headers)
http.setPublicBody(publicBody)

function calculate() {
  return new Promise(async resolve=>{
    for (const t of runSamples) {
      const url = combineUrl(t.url)
      const res = isGetMethod(t.type) ? await http.get(url, t) : await http.post(url, t)
      accuracy.print(res)
      accuracy.add(res)
    }
    resolve()
  })
}

console.log('processing...')
calculate().then(()=>{
  console.log('samples result', accuracy.all())
  accuracy.writeFile(outPath)
  console.log('--------------------------------------------------------------------------')
  console.log('samples count:', accuracy.count(), ', reachable:', 
    accuracy.result(), ', accuracy:', accuracy.resultLogic())
  if (!!code) {
    console.log('accuracy require code:', code)
  }
  console.log('--------------------------------------------------------------------------')
})

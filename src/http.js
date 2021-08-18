const fetch = require('node-fetch')
const { URLSearchParams } = require('url')
const expend = require('./expend')

let _headers = ''
let _correntCode = ''
let _publicBody = {}

exports.setHeaders = function(headers={}) {
  _headers = headers
}

exports.setPublicBody = function(publicBody) {
  _publicBody = publicBody
}

exports.post = async function(url, params) {
  const point = new expend()
  point.start()
  const res = await fetch(url, {
    method:"POST",
  　headers: _headers,
    body: createFormBody(params.body, _headers)
  })
  params.time = point.end()
  return await reachable(url, params, res)
}

exports.get = async function(url, params) {
  const point = new expend()
  point.start()
  const res = await fetch(url, {
    method:"GET",
  　headers: _headers
  })
  params.time = point.end()
  return await reachable(url, params, res)
}

async function reachable(url, params, res) {
  const obj = { 
    author: params.author,
    title: params.title, 
    url, 
    status: res.status,
    cost: params.time
  }
  if (res.status === 200) {
    const json = await res.json()
    return ignoreNull({ 
      ...obj,  status: 200,
      code: json.code, message: json.message
    })
  }
  return ignoreNull(obj)
}

function createFormBody(body, _headers) {
  const newBody = { ..._publicBody, ...body }
  if (_headers['content-type'] === 'application/json') {
    return JSON.stringify(newBody)
  } else {
    const params = new URLSearchParams()
    for (const k in newBody) { params.append(k, newBody[k]) }
    return params
  }
}

function ignoreNull(obj) {
  const temp = {}
  for (const k in obj) {
    if (!!obj[k]) temp[k] = obj[k]
  }
  return temp
}
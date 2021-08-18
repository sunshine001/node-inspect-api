## Summary
node-inspect-api is a node tool for test api reachable.

## Install
```
npm install node-inspect-api -g
```

## Use
```
> node-inspect-api filepath outpath
  node-inspect-api C:\Users\free\Desktop\sample.json
```

## File data format example
```
[
  {
    baseUrl: 'http://www.test.com',
    code: '0000|0002' //optional, multiple are separated by |
    headers: {
      'content-type': 'application/x-www-form-urlencoded', //optional
      authorization: 'cce8a68463774f651206e1891525c8d3'
    }
  },
  {
    url: '/api/register',
  },
  {
    author: 'jobs',
    title: 'login',
    type: 'post',
    url: '/api/login',
    body: {
      username: 'test',
      password: '123456'
    }
  }
]
```

## output 
```
[
  {
    author: 'jobs',
    title: 'login',
    url: 'http://www.test.com/api/login',
    code: '0001',
    message: 'token expired',
    status: 200,
    cost: '83ms'
  }
]
-------------------------------------------------------
samples count: 3 , reachable: 100% , accuracy: 67%
-------------------------------------------------------
```
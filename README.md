# nat-traverse
NAT traversal by way of [UPnP](https://github.com/indutny/node-nat-upnp) or [NAT-PMP](https://github.com/TooTallNate/node-nat-pmp)

### Install

```
npm install -g nat-traverse
```

### Command Line Usage

```
punch --private <port> --public <port> --ttl <secs>
```

### API

#### `nat(options, success, error)`

### Example

```js
var nat = require('nat-traverse')

nat({
  type: 'udp', // tcp or udp - passed to nat-pmp
  private: 22,
  public: 8888,
  ttl: 3600,
  timeout: 3000
}, function(external) {
  console.log('Connected to WAN address: ' + external)
}, function(err) {
  console.log(err);
})
```
var network = require('network')
var natpmp = require('nat-pmp')
var natupnp = require('nat-upnp')
var ip = require('ip')
var async = require('async')

module.exports = function(opts, success, error) {
  opts = opts || {}
  opts.timeout = opts.timeout || 5000

  // returns the IP of the gateway that your active network interface is linked to
  network.get_gateway_ip(function(err, gateway) {
    if (err) return error(err)

    // use regex to check if ip address is public
    if (ip.isPublic(gateway))
      return success(gateway)

    var strategies = {
      pmp: natpmp.connect(gateway),
      upnp: natupnp.createClient()
    };

    // find a strategy to traverse nat
    async.detectSeries(strategies, function(client, next) {
      var portMapping = async.timeout(client.portMapping.bind(client), opts.timeout)
      portMapping(opts, function(err) {
	next(null, !err)
      });
    }, function(err, client) {
      if (err) return error(err)

      if (!client) return error(new Error('All NAT strategies failed or timed out'))

      client.externalIp(function(err, external) {
	if (err) return error(err)
	success(external)
      })
    })
  })
}

var nat = require('../');
var argv = require('yargs')
	.usage('Usage: $0 --private [port] --public [port] --ttl [secs] --timeout [secs] --type [udp|tcp]')
	.demand(['private','public'])
	.argv;

nat({
    type: argv.type || 'udp',
    private: argv.private || 2324,
    public: argv.public || 2325,
    ttl: argv.ttl || 3600,
    timeout: argv.timeout || 3000
}, function(external) {
    console.log('Connected to WAN address: ' + external);
}, function(err) {
    console.log(err);
});

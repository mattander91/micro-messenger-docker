var loadtest = require("loadtest");

var options = {
    method: 'POST',
    url: 'http://0.0.0.0:3003/group',
    maxRequests: 1,
    requestsPerSecond: 1,
    agentKeepAlive: true,
    //body: Math.floor(Math.random() * 0x100000000).toString(16)
    body: 'TEST444444444'
};
loadtest.loadTest(options, function(error, result)
{
    if (error)
    {
        return console.error('Got an error: %s', error);
    }
    console.log('Tests run successfully', result);
});

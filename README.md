# Sensor Logger Server
This is a demo server for the iOS app [Sensor Logger](http://www.joecrozier.ca/sensor-logger).

## Usage 

Very simple - first run `npm install` to grab the dependencies (there are only a couple), then `node index.js`. Your server should now be running!

Find the internal IP address for your server on your network, and enter this and your chosen port in the Sensor Logger iOS app. Your network shouldn't need any special configuration for this to work.

By default, the server will run on port `3000`. This can very trivially be changed by modifying index.js.

## Exporting Data

To export data as JSON, browse to http://localhost:3000/acceljson. Simply save the JSON data from your web browser.

To export data as CSV, browse to http://localhost:3000/accelcsv. If there's data logged already, it will be saved in a timestamped CSV file in your server's directory.

Swap out `accel` for `gyro` or `magnet`, depending on which sensor you'd like to download the data for.

##Contribute

I'm by no means a node.js developer, I made this server largely as a starting point for developers who want to use Sensor Logger - it should absolutely be customized to the user's specific needs. 

If you see major flaws in the server's code, please submit an Issue or PR and I'll be happy to update it. 

##Additional Help

I can be contacted at my website, www.joecrozier.ca, or by twitter at @joe_crozier.
# Admin Console - Boodskap IoT Platform
Boodskap IoT Platform Developer Web Console


### Getting Started
This plugin requires node `>= 6.0.0` and npm `>= 1.4.15` (latest stable is recommended).


### NPM Module Installation

```shell
> npm install
```

### Application Configuration

```shell
module.exports = {
    "web": {
        "port": 4201,
    }
}

```


### How to start the UI node server in Dev Machine?

```shell
> npm start
```
or
```shell
> node bdskp-admin-console-node.js
```
#### Output

Open the Browser with this URL: http://0.0.0.0:4201


### How to start the UI node server in QA & Prod Machine?

Step 1] Install the PM2 module in the server. For the initial deployment we need to install that

```shell
> sudo npm install pm2 -g
```

Step 2] Run the Application using PM2 module


```shell
> pm2 start bdskp-admin-console-node.js
```

For Cluster Mode,


```shell
> pm2 start bdskp-admin-console-node.js -i max

```

max means that PM2 will auto detect the number of available CPUs and run as many processes as possible

Step 3] List PM2 process

```shell
> pm2 list

```

Step 3] To stop PM2 process

```shell
> pm2 stop <node_name>

```
(or)
```shell
> pm2 stop <PM2_NODE_ID>

```
PM2_NODE_ID can be found in pm2 list command



#### During next deployment, 

```shell
> pm2 restart <PM2_NODE_ID>

```

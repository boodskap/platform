# Boodskap IoT Platform

<img src="https://raw.githubusercontent.com/boodskap/platform/master/files/boodskap-model.png" alt="The Launch Pad for your IoT needs." width="100%"/>

<span style="color:red">**Not a production version, Production release 3.1.0 will be released by mid July 2019**</span>

# Installing as Docker Container
* **docker** pull boodskapiot/platform:latest
* **docker** run --name boodskap -v $HOME/boodskap/data:/usr/local/boodskap/data boodskapiot/platform:latest
* Once you see the following message or similar to this
  * All initialization done, platform services are running.
* Open a browser location to 
  * Your solution can be accessed here **http://boodskap.xyz**
  * Admin Console can be accessed here **http://platform.boodskap.xyz**
  * Dashboard can be accessed here **http://dashboard.boodskap.xyz**
* The default login credentials are
  * User Name: **admin**
  * Password: **admin**
  
* API endpoint
  * Master API http://boodskap.xyz/api
  * Micro Service API http://boodskap.xyz/mservice

### NOTE
> You can have multiple containers with different names, but; be sure to run only one at any point in time to avoid port conflicts. If you want to run multiple containers in parallel, change the MPORTS and MUDP_PORTS to suit your needs

[**Download sample shell script to create named containers**](https://raw.githubusercontent.com/boodskap/platform/master/create-container.sh)

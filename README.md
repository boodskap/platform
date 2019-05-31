# Boodskap IoT Platform
A Platform / Infrastructure exclusively developed for IoT, that enables you to create your own control logics and ascertain communication between the devices from different manufacturers. In addition to that, it doesn’t get acquainted to any specific programming language but, on the contrary it supports more than 30 programming languages that are predominantly being used in the industry. After solving the major pain point of devices connectivity, like cherry on the cake it further empowers you to analyse your work environment and provide perishable insights with real time and historical data and an appealing UI that is easily customizable by the user themselves at any given point of time. Platform is downloadable and can be hosted either on your premises or any other cloud platforms

# Installing as Docker Container
* **docker** pull boodskapiot/platform:latest
* **docker** run --name boodskap -v $HOME/boodskap/data:/usr/local/boodskap/data boodskapiot/platform:latest
* Once you see the following message or similar to this
  * All initialization done, platform services are running.
* Open a browser location to **http://boodskap.xyz**
* The default login credentials are
  * User Name: **admin**
  * Password: **admin**
* Environment Variables (Optional Overriding)
  * DATA_PATH
    * If you want to change the default data location (/usr/local/boodskap/data), mount as volume in the container and specify whatever the mount point int the **DATA_PATH** environment variable
    * Exmple: **docker run --name boodskap -v $HOME/boodskap/data:/storage/boodskap/data -e DATA_PATH=/storage/boodskap/data boodskapiot/platform:latest**
  * CONSOLE_HOME
  * SOLUTION_HOME
  * DASHBOARD_HOME
  

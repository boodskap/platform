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
  * SOLUTION_HOME
    * You can develop a custom Node.js based application using Boodskap API's. Simply mount your project root folder to the below volume
      * -v $PROJECT_ROOT_FOLDER:/opt/boodskap/solution
      *  Add the above argument to **docker run** command
      *  **$PROJECT_ROOT_FOLDER** is your actual full path
    * Make sure your entry JS file is **main.js**
    * Make sure your application should listen the port **10000** 
    * You can browse your solution at **http://boodskap.xyz/solution**
  * CONSOLE_HOME
    * Boodskap Admin Console project can also be customized to meet your needs. Git clone https://github.com/boodskap/admin-console.git
      * -v $ADMIN_CONSOLE_FOLDER:/opt/boodskap/console
      *  Add the above argument to **docker run** command
      *  **$ADMIN_CONSOLE_FOLDER** is your git cloned directory path
      *  Admin console URL **http://boodskap.xyz**
  * DASHBOARD_HOME
    * Boodskap Dashboard project can also be customized to meet your needs. Git clone https://github.com/boodskap/dashboard.git
      * -v $DASHBOARD_FOLDER:/opt/boodskap/dashboard
      *  Add the above argument to **docker run** command
      *  **$DASHBOARD_FOLDER** is your git cloned directory path
      *  Dashboard URL **http://boodskap.xyz/dashboard**
  
* Sample Shell Script
```bash
#!/bin/bash

NAME=boodskap
VERSION=latest

DATA_MOUNT=/path/to/data
CONSOLE_MOUNT=/path/to/admin-console
DASHBOARD_MOUNT=/path/to/dashboard

PORTS="80 443 1883"
UDP_PORTS="5555"

for PORT in ${PORTS}
do
   OPORTS="$OPORTS -p $PORT:$PORT"
done

for PORT in ${UDP_PORTS}
do
   OPORTS="$OPORTS -p $PORT:${PORT}/udp"
done

echo "DATA: ${DATA_MOUNT}"
echo "ADMIN-CONSOLE: ${CONSOLE_MOUNT}"
echo "DASHBOARD: ${DASHBOARD_MOUNT}"

VOLUMES="-v ${DATA_MOUNT}:/usr/local/boodskap/data"
VOLUMES="$VOLUMES -v ${DASHBOARD_MOUNT}:/opt/boodskap/dashboard"
VOLUMES="$VOLUMES -v ${CONSOLE_MOUNT}:/opt/boodskap/console"

EXEC="docker run --name $NAME $ENV $VOLUMES $OPORTS boodskapiot/platform:$VERSION"
echo $EXEC
$EXEC
```

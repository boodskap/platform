# Boodskap IoT Platform

## A Github repository to build docker containers

## Visit our [developer webite](https://developer.boodskap.io) for installation and user guides

# Change Log
- Version 3.0.1
    - Patch 10009
        - Deleting a domain functionality implemented
    - Patch 10006, 10007, 10008
        - Minor fixes
            - MQTT binary message routing issue fixed
            - Changed the default config to accept any MQTT QOS Messages
            - Fixed invalid corrid being sent to the device while using *device* context to send commands
            - Outgoing and Sent commands are separated
            - Added support to install multiple platform instances pointing to same backends without collission
    - Patch 10005
        - Fixed MQTT Binary messages not processed
        - Fixed MQTT JSON message IDs are always set as 0
    - Fixed MQTT binary type and non binary message id conflict
    - Patch 10004
        - Changed the default MQTT service to accept any QOS messages
    - Patch 10001, 10002, 10003
        - Minor fixes

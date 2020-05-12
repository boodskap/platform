# Boodskap IoT Platform

![Boodskap Logo](https://scontent.fmaa2-2.fna.fbcdn.net/v/t31.0-8/24837215_1491639110951688_1320692237507881677_o.jpg?_nc_cat=110&_nc_sid=dd9801&_nc_ohc=aACOB0_nddEAX8seTDT&_nc_ht=scontent.fmaa2-2.fna&oh=cad6af5766a13baeeac313f7e9532236&oe=5EDE9A46)

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

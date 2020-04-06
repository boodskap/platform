#!/bin/bash

cd /root

/root/bin/ignite.sh -f /root/config/cluster.xml &

sleep 30

/root/bin/control.sh --activate

/bin/bash -c "trap : TERM INT; sleep infinity & wait"

#!/bin/bash

cd /root

/root/bin/ignite.sh -f /root/config/cluster.xml &

/bin/bash -c "trap : TERM INT; sleep infinity & wait"

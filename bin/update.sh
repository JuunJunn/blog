#!/bin/bash

rm -rf ../project-backup
cp -r ../blog ../project-backup
git pull
/bin/stop.sh
/bin/start.sh
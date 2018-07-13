#!/bin/bash

rm -rf ../blog
cp -r ../projec-backup /blog
bin/stop.sh
bin/start.sh
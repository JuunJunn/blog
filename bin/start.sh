#!/bin/bash

echo " server start"
nohup node index.js >> /data/server.log 2>&1 &
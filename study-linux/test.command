#!/bin/bash

echo "hello world";


echo $HOME,$PWD,$USER

# command node

# echo $(cd "$(dirname "$0")/../"; pwd)
CURRENT_DIR=$(cd "$(dirname "$0")"; pwd); # == `cd "$(dirname "$0")"; pwd`
echo $CURRENT_DIR
echo 'louxiad'
echo $0;


echo sudo


``
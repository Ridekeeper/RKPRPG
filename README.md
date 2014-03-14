RKPRPG
======

[![Build Status](https://travis-ci.org/Ridekeeper/RKPRPG.png?branch=master)](https://travis-ci.org/Ridekeeper/RKPRPG)

1. Create the phonegap project
`phonegap create ./ "com.ucla.Ridekeeper" "Ridekeeper"`

2. Gitignore omits the platform folder.
   Therefore, this is not tracked with git and is only created on a `phonegap build` or `phonegap run `
3. When you run `phonegap create` the command will overwrite files in the www folder,
   so make sure to to run git checkout on that folder to make sure that your development code
   matches that in the repository before beginning development.

The app also needs several native plugins installed.  These commands should install them:

phonegap plugin add org.apache.cordova.camera
phonegap plugin add org.apache.cordova.dialogs
phonegap plugin add org.apache.cordova.vibration
phonegap plugin add https://github.com/Ridekeeper/phonegap-parse-plugin.git


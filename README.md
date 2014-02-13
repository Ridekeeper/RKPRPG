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


-----------------------


Matthews Email:

You technically don't need bower since all the libraries I got from
there are already in the repo.

Basically what I did was download angular/snap.js.... with bower and
moved everything in the bower_modules directory to www/lib,
where I then include the correct .js file into whatever .html file
that needs it.

So if we need a new JavaScript library, just download the bower
version of the library and copy it to www/lib with the others.

The only thing that you would need besides that would be to install
phonegap, no other NPM modules
should be needed, as jasmine which I am using for testing is already
in the spec/lib folder to be included with the spec.html for running
tests.

As for the project command, what is already in the README should be fine.

As for the plugins directory, I still think that we should just
install all of the plugins that we need in that directory,
leaving them in source control, since every person building the apk
will need them.

The plugins are platform independent, so when someone runs a phonegap
build to recreate their platforms/android folder the plugins will
automatically be included.
This also means that we can do plugin version control is a standardized way.

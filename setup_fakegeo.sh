# Send fake location updates to android emulator so that GPS functionality can work

while :; do adb emu geo fix -118.4502765 34.0687993; sleep 1; done


# curiosity

This is a simple website and set of configuration files that turns a Raspberry Pi Zero W (or other Pi with WiFi) into a access point named "No Internt".

Installation after a fresh install of Rasbian Jessie Lite:
```
sudo apt-get install git
git clone https://github.com/fbiego/curiosity
cd rogue-captive
chmod +x install.sh
sudo ./install.sh
sudo reboot
```
During installation, macchanger will ask whether or not MAC addresses should be changed automatically - choose "No". The startup script in rc.local will perform this task more reliably.

# curious?

- [`Chronos app`](https://fbiego.com/chronos/)


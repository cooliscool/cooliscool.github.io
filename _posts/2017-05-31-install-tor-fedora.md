---
title: Installing Tor proxy in fedora 25
updated: 2017-05-31 22:52
---

# Install Tor proxy in Fedora 25

People love being anonymous sometimes. Tor is the easiest way and best way for that.
This tutorial is not just about installing tor, also discusses some errors you may encounter while trying to run it.

#### Install Tor using dnf 

```
sudo dnf install tor.x86_64
```
It may download some additional critical updates also.
Rest of the installation should happen peacefully.

Now, try running Tor proxy using the command 'tor' in terminal.

#### This may end up with the following error : 

![Error1](http://cooliscool.github.com/images/error1.png)

So what you've to do is change the ownership of the folder **/run/tor** . 
Run the following command (replace **user** with your current account username).

```
sudo chown -R user:user /run/tor
```
For example if say my username is **moochingal**. I would run the command as,
```
sudo chown moochingal:moochingal /run/tor
```
#### Now Tor should run on 127.0.0.1 and port 9050

#### Use the above IP address and port as socks proxy to connect to it. 
For example, in firefox, you will have to configure as ,

![Firefox](http://cooliscool.github.com/images/firefox.png)

Thanks for reading the post!

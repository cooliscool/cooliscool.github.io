---
title: How I messed up a Wordpress Website (and fixed it)
updated: 2018-06-22 22:22
---

# How I messed up a Wordpress Website (and fixed it)

My intention was pure. I just needed to make a backup of the soon-going-to-be-a-hit website thus make a clone for it's soul. But the act of using a command without completely understanding the consequences of it gave me a heavy head bang. Machane, I almost messed up a website which is trending right now, has a decent number of visitors. 

Direct to it, I did: 
```sh
$ cd /var/www
```
This folder html folder which I was going to backup to tar gzip archive.

```sh
$ tar -cvfz ./html/ backup.tar.gz
```
Okay, there was some error. Doesn't matter. I'll create the archive again.
But then.

#### Something was wrong with the website which was running perfectly.
The website started giving 'the famous', 500 Internal Server Error. 
I checked Apache log in `/var/log/apache2/error.log` .
It was showing :
```
[Thu Jun 21 17:37:31.930497 2018] [:error] [pid 1472] [client 127.0.0.1:55984] PHP Fatal error:  Allowed memory size of 134217728 bytes exhausted (tried to allocate 134217728 bytes) in Unknown on line 0
``` 
Fine macha. I thought it's just a memory-not-sufficient error. 
Let's try increasing memory alloted for PHP. Yeah I did.
Increased PHP quota to 512MB. Fine.
Then what? 
This.
```
[Thu Jun 21 17:45:04.010484 2018] [:error] [pid 1862] [client 14.139.160.241:27522] PHP Parse error:  syntax error, unexpected '$s' (T_VARIABLE), expecting ',' or ';' in /var/www/html/index.php on line 3914
```
Okay, something's fishy with index.php 🤔. 
I went ahead and took a look at index.php 

![Image of index.php ](https://cooliscool.github.io/images/garb.png)

#### Then I realised what I did command actually did 😎 :
Archive entire directory tree to index.php and rewrite it. 
Thus index.php turned into a tar.gz archive with the same name index.php.
Which was a Himalayan blunder! 😢
Okay, we might think now its just enough to extract this index.php and save the website. Life wasn't simple like that.

I have corrupted index.php , and now I have to do nothing but finding a replace. !
What should I do ? 
Google!

#### Google has a fix for almost everything.
Apparently, worpress's index.php was just a representative, which just loads the theme. Yo! That means, life saved. 
Download new wordpress install from official Wordpress website, and replace corrupted `index.php` with this.
Hola! 
Life is saved. 
That website was running perfectly.
So finally,
Endnote:


###### Always keep a backup for your website. ( ! Without messing it up like this ) 

###### If you don't know to use a tool, don't do random stuff, it can turn into a bomb.


Thanks emojipedia for the emoticons [emojipedia.org](http://www.emojipedia.org) !
Thanks for reading the post niggas!

---
title: ROP - Modify RDX even when there's no gadget
updated: 2021-12-01 00:01
--- 

While performing ROP in an environment, it might be required to execute functions like:
1. `read(int fd, void *buf, size_t count)`
2. `write(int fd, const void *buf, size_t count)`
3. `sendfile(int out_fd, int in_fd, off_t *offset, size_t count)`

It depends upon the value of register `RDX`. Also, Often it's difficult to control it's value as it's hard to find gadgets for `RDX`. In most cases `RDX` has to satisfy the following condition for executing each of the above functions :
1. `read()` : a non zero large number for RDX
2. `write()` : a non zero large number for RDX
3. `sendfile()` : RDX equals zero

Here I'm gonna list few functions  that can affect the value of `RDX`, once they complete execution. These are the functions that are commonly found in the GOT table.

1. `puts()` : sets `RDX` to a large non-zero number
2. `fwrite()` : sets `RDX` to zero 

## Summary 

If there's no gadget for RDX in the binary, you can still manage to get a succesfull `read()` or `write()` or `sendfile()` by calling functions in GOT that doesn't have much side-effects, but can set RDX to a value enough for getting our task done. 
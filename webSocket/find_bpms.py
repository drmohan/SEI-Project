#!/usr/bin/python3
import random

f = open("hillary-face-email-attack.csv")
# Open a file
bpms = open("bpms.csv", "w")

next = f.readline()
while next != "":
    bpms.write(next)
    next = f.readline()

# Close opend file
bpms.close()
print("bpms.csv complete")

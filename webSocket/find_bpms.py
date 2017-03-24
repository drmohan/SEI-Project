#!/usr/bin/python3
import random
import sys
# Open a file
bpms = open("bpms.csv", "w")

for i in range(20):
    bpms.write(str(random.randint(60,90)) + "\n")

# Close opend file
bpms.close()
sys.stdout.write("CSV generated")

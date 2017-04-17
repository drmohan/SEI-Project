# #!/usr/bin/python3
# import random
#
# f = open("hillary-face-email-attack.csv")
# # Open a file
# bpms = open("bpms.csv", "w")
#
# next = f.readline()
# while next != "":
#     bpms.write(next)
#     next = f.readline()
#
# # Close opend file
# bpms.close()
# print("bpms.csv complete")
#

import random

# Open a file
bpms = open("bpms.csv", "w")

n = 0
i = 0
for i in range(100):
    line = ("%d,9," + str(random.randint(80,95)) + ",%.2f\n") % (i,n)
    n = n+0.3
    i = i+1
    # 500,86.40,86.40,8.33
    bpms.write(line)

# Close opend file
bpms.close()
print("bpms.csv complete")

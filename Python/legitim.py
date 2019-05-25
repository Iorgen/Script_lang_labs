# row = """172.16.0.3 - - [25/Sep/2002:14:04:19 +0200] "GET / HTTP/1.1" 401 - "" "Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.1) Gecko/20020827" """
import re
# data = []
# a = list(map(''.join, re.findall(r'\"(.*?)\"|\[(.*?)\]|(\S+)', row)))
# print(a)
data = list()


#  1) create black list
#  2) all who access to php my admin except 5.135.213.197
#  3) create white list
#  4) all who access to wp-login except 5.135.213.197
#  5) ban all with 499

with open('access.log', "r") as file :
   for line in file:
       data.append(list(map(''.join, re.findall(r'\"(.*?)\"|\[(.*?)\]|(\S+)', line))))

for dt in data:
    print(dt[5])
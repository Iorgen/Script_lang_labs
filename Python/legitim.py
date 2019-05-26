import re
import pandas as pd
data = list()


def check_response(code):
    if code == '499':
        return 1
    else:
        return 0


def check_black(ip):
    if ip in black_list:
        return 1
    else:
        return 0


def check_white(ip):
    if ip in white_list:
        return 0
    else:
        return 1


def check_wp_login(ip,type):
    a = re.search(r'wp-login*', type)
    if a is not None:
        if check_white(ip) == 0:
            return 0
        else:
            return 1
    return 0


def check_php_admin(ip,type):
    a = re.search(r'phpmyadmin*', type)
    if a is not None:
        if check_white(ip) == 0:
            return 0
        else:
            return 1
    else:
        return 0


def is_suspicious(row):
    susp = list()
    susp.append(check_response(row["Response_code"]))
    susp.append(check_black(row["IP"]))
    susp.append(check_white(row["IP"]))
    susp.append(check_wp_login(row["IP"], row["Type"]))
    susp.append(check_php_admin(row["IP"], row["Type"]))
    if sum(susp) >= 2:
        return True
    else:
        return False


# First lets create a list with data
with open('access.log', "r") as file :
   for line in file:
       data.append(list(map(''.join, re.findall(r'\"(.*?)\"|\[(.*?)\]|(\S+)', line))))

# Here we've got all acces.log data in pandas dataframe
access_info = pd.DataFrame(data)
# drop non usefull columns
access_info = access_info.drop(columns=[1,2,7])
# lets rename them to more convenient format
access_info.columns = [
    "IP",
    "Time",
    "Type",
    "Response_code",
    "0",
    "Headers"
]
print(access_info)
# Now we've very good representation off our logs
# Let's find out suspicious addresses using the following conditions
#  black list
#  white list
#  all who access to php my admin except 5.135.213.197
#  all who access to wp-login except 5.135.213.197
#  499 response code
#  two or more sign means that address is suspicious
white_list = []
black_list = []
# read white list
with open('white_list.txt', "r") as file:
    for line in file:
        white_list.append(line)

# read black list
with open('black_list.txt', "r") as file:
    for line in file:
        black_list.append(line)


access_info['is_suspicious'] = access_info.apply(lambda x: is_suspicious(x), axis=1)
print("suspicious_ip is:")
suspicious_request = access_info[access_info["is_suspicious"] == True]
print(suspicious_request["IP"].unique())

# README #
A simple project which involve our MTB group to get
some statistics and make them funny with some widgets
on web

##Dependencies
https://www.npmjs.com/package/strava-v3

##Before run
create a json file named athletes.json where store
credentials token for user who wants to monitor
#####athletes.json:
```{
  "15953830": {
    "id": 15953830,
    "name": "Sebba",
    "code": "token here"
  }}
```
 one object for every user, obj key must be the userid

#####strava-ui.sh:
```
#!/usr/bin/env bash
 
export DEBUG=*
export NODE_ENV=development
export EXPRESS_IP=127.0.0.1
export EXPRESS_PORT=3000  
export INSTANCE_NAME=strava-ui 
```
others configuration can be seen in config.js

even chart can be configured on the fly in external json file
#####charts.json
```
{
    "name": "KOM",                                              #name visible in view
    "type": "uphill",                                           #type, not in use right now
    "field": "stats.ytd_ride_totals.elevation_gain",            #access field in data file
    "mode": false,                                              #can be 'length' for measuring array size or 'maxInArray' for maximum in array false for everything else
    "arrField": "total_elevation_gain",                         #only for 'maxInArray' mode
    "cupIcon": "fab fa-forumbee",                               #cup icon customization
    "math": [
      "a",
      "return a"                                                #here we can set math formulas such as: "return a/60/60/24" 
    ],
    "unit": "m",                                                #measure unit
    "icon": "<i class=\"red bigger-150 fa fa-mountain\"></i>"   #chart logo
  }
```

##Features
* 1  total ascend
* 2  personal info
* 3  last activity
* 4  KOM list

####TODO
*   Order activities by date descending



##Bugs

####Major
* activities are since the beginning
* activities are not ordered by date

####Minor



##Fixed

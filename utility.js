var id = 18102299;
id = 15953830;
var sumClimb = 0;
var sumDistance = 0;
var totalRide = 0;

for (key in aths[id].activities) {
    var a = aths[id].activities[key];
    if ((a.type == 'Ride') && (moment(a.start_date) > new Date('2018-01-01'))) {
        console.log(a.start_date);
        sumClimb += a.total_elevation_gain;
        sumDistance += a.distance;
        totalRide++;
        console.log(a.name)
    }
}
console.log('climb', sumClimb)
console.log('distance', sumDistance)
console.log('count', aths[id].activities.length)
console.log('count ride', totalRide)
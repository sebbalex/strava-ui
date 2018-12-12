var type = "Ride";

function widgetCreate(data) {
    var year = 2018;

    var name = data.personal.firstname;
    var distance = data.stats.ytd_ride_totals.distance;
    var counter = data.stats.ytd_ride_totals.count;
    var tu = (distance / 1000) / counter;
    tu = tu.toFixed(0);
    var kmr = 100 - tu;
    var koms = data.listkom.length;
    var uphill = data.stats.ytd_ride_totals.elevation_gain;
    var timespent = (data.stats.ytd_ride_totals.elapsed_time / 60 / 60 / 24).toFixed(0);
    var clubs = data.personal.clubs.length;
    var actvitiesKMSArr = elaborateActivities(data.activities).slice(-10);
    var actvitiesKMS = actvitiesKMSArr.join(',');
    var kmPerc = ((actvitiesKMSArr[actvitiesKMSArr.length - 1] / actvitiesKMSArr[actvitiesKMSArr.length - 2]) * 100 - 100).toFixed(2);
    var kmPercArrow = (kmPerc > 0) ? 'fa-arrow-up' : 'fa-arrow-down';
    var kmPercColor = (kmPerc > 0) ? 'success' : 'danger';

    var text =
        '                            <div class="col-sm-4 ">' +
        '                                <!-- #section:pages/dashboard.infobox -->' +
        '                                <div class="infobox infobox-green">' +
        '                                    <div class="infobox-icon">' +
        '                                        <i class="ace-icon fa fa-bicycle"></i>' +
        '                                    </div>' +
        '' +
        '                                    <div class="infobox-data">' +
        // '                                        <span class="infobox-data-number"></span>' +
        '                                        <div class="infobox-content"><h3 style="margin-top: 10px">' + name + '</h3></div>' +
        '                                    </div>' +
        '' +
        '                                    <!-- #section:pages/dashboard.infobox.stat -->' +
        // '                                    <div class="stat stat-success">8%</div>' +
        '' +
        '                                    <!-- /section:pages/dashboard.infobox.stat -->' +
        '                                </div>' +
        '' +
        '                                <div class="infobox infobox-blue">' +
        '                                    <div class="infobox-icon">' +
        '                                        <i class="ace-icon fa fa-tachometer-alt"></i>' +
        '                                    </div>' +
        '' +
        '                                    <div class="infobox-data">' +
        '                                        <span class="infobox-data-number">' + distance / 1000 + ' km</span>' +
        '                                        <div class="infobox-content">Distanza ' + year + '</div>' +
        '                                    </div>' +
        '' +
        // '                                    <div class="badge badge-success">' +
        // '                                        +3%' +
        // '                                        <i class="ace-icon fa fa-arrow-up"></i>' +
        // '                                    </div>' +
        '                                </div>' +
        '' +
        '                                <div class="infobox infobox-pink">' +
        '                                    <div class="infobox-icon">' +
        '                                        <i class="ace-icon fa fa-road"></i>' +
        '                                    </div>' +
        '' +
        '                                    <div class="infobox-data">' +
        '                                        <span class="infobox-data-number">' + counter + '</span>' +
        '                                        <div class="infobox-content">Ride ' + year + '</div>' +
        '                                    </div>' +
        // '                                    <div class="stat stat-important">4%</div>' +
        '                                </div>' +
        '' +
        '                                <div class="infobox infobox-red">' +
        '                                    <div class="infobox-icon">' +
        '                                        <i class="ace-icon fa fa-mountain"></i>' +
        '                                    </div>' +
        '' +
        '                                    <div class="infobox-data">' +
        '                                        <span class="infobox-data-number">' + uphill + ' m</span>' +
        '                                        <div class="infobox-content">Scalata ' + year + '</div>' +
        '                                    </div>' +
        '                                </div>' +
        '' +
        '                                <div class="infobox infobox-orange2">' +
        '                                    <!-- #section:pages/dashboard.infobox.sparkline -->' +
        '                                    <div class="infobox-chart">' +
        '                                        <span class="sparkline" data-values="' + actvitiesKMS + '"></span>' +
        '                                    </div>' +
        '' +
        '                                    <!-- /section:pages/dashboard.infobox.sparkline -->' +
        '                                    <div class="infobox-data">' +
        '                                        <span class="infobox-data-number"></span>' +
        '                                        <div class="infobox-content">KM ultime uscite</div>' +
        '                                    </div>' +
        '' +
        '                                    <div class="badge badge-' + kmPercColor + '">' +
        '                                        ' + kmPerc + '%' +
        '                                        <i class="ace-icon fa ' + kmPercArrow + '"></i>' +
        '                                    </div>' +
        '                                </div>' +
        '' +
        '                                <div class="infobox infobox-blue2">' +
        '                                    <div class="infobox-progress">' +
        '                                        <!-- #section:pages/dashboard.infobox.easypiechart -->' +
        '                                        <div class="easy-pie-chart percentage" data-percent="' + tu + '" data-size="46">' +
        '                                            <span class="percent">' + tu + '</span>%' +
        '                                        </div>' +
        '' +
        '                                        <!-- /section:pages/dashboard.infobox.easypiechart -->' +
        '                                    </div>' +
        '' +
        '                                    <div class="infobox-data">' +
        '                                        <span class="infobox-text">Distanza media</span>' +
        '' +
        '                                        <div class="infobox-content">' +
        '                                            <span class="bigger-110">~</span>' +
        '                                            ' + kmr + ' km su 100' +
        '                                        </div>' +
        '                                    </div>' +
        '                                </div>' +
        '' +
        '                                <!-- /section:pages/dashboard.infobox -->' +
        '                                <div class="space-6"></div>' +
        '' +
        '                                <!-- #section:pages/dashboard.infobox.dark -->' +
        '                                <div class="infobox infobox-green infobox-small infobox-dark">' +
        '                                        <!-- #section:pages/dashboard.infobox.easypiechart -->' +
        // '                                        <div class="easy-pie-chart percentage" data-percent="61" data-size="39">' +
        // '                                            <span class="percent">61</span>%' +
        // '                                        </div>' +
        '                                       <div class="infobox-icon">' +
        '                                           <i class="ace-icon fa fa-crown"></i>' +
        '                                       </div>' +
        '' +
        '                                        <!-- /section:pages/dashboard.infobox.easypiechart -->' +
        '' +
        '                                    <div class="infobox-data">' +
        '                                        <div class="infobox-content">' + koms + ' KOMs</div>' +
        '                                        <div class="infobox-content">Raggiunti</div>' +
        '                                    </div>' +
        '                                </div>' +
        '' +
        '                                <div class="infobox infobox-blue infobox-small infobox-dark">' +
        '                                    <!-- #section:pages/dashboard.infobox.sparkline -->' +
        '                                    <div class="infobox-icon">' +
        '                                        <i class="ace-icon fa fa-home"></i>' +
        '                                    </div>' +
        '' +
        '                                    <!-- /section:pages/dashboard.infobox.sparkline -->' +
        '                                    <div class="infobox-data">' +
        '                                        <div class="infobox-content">Fuori casa</div>' +
        '                                        <div class="infobox-content">' + timespent + ' days</div>' +
        '                                    </div>' +
        '                                </div>' +
        '' +
        '                                <div class="infobox infobox-grey infobox-small infobox-dark">' +
        '                                    <div class="infobox-icon">' +
        '                                        <i class="ace-icon fa fa-users"></i>' +
        '                                    </div>' +
        '' +
        '                                    <div class="infobox-data">' +
        '                                        <div class="infobox-content">Clubs</div>' +
        '                                        <div class="infobox-content">' + clubs + '</div>' +
        '                                    </div>' +
        '                                </div>' +
        '' +
        '                                <!-- /section:pages/dashboard.infobox.dark -->' +
        '                            </div>' +
        '' +
        '                            <div class="vspace-12-sm"></div>';
    return text;
}


function rewardsDraw(data, standings) {
    var name1st = standings[0].name;
    var name2nd = standings[1].name;
    var name3rd = standings[2].name;

    var max1st = standings[0].max;
    var max2nd = standings[1].max;
    var max3rd = standings[2].max;

    var var1st = name1st + ' ' + max1st + ' ' + data.unit;
    var var2nd = name2nd + ' ' + max2nd + ' ' + data.unit;
    var var3rd = name3rd + ' ' + max3rd + ' ' + data.unit;

    var standing = data.name;
    var icon = data.icon;
    var cupIcon = data.cupIcon || 'fas fa-trophy';
    var text =
        '                            <div class="col-sm-2 ">' +
        '                                <div class="row">' +
        '                                   <div class="height-auto width-100">' +
        '                                   <h4 style="text-align: center">' + icon + '&nbsp;' + standing + '</h4>' +
        '                                   </div>' +
        '                                </div>' +
        '                                <div class="row">' +
        '                                   <div class="infobox width-100">' +
        '                                        <div class="infobox-icon">' +
        '                                           <i style="color: gold" class="bigger-300 ' + cupIcon + '"></i>' +
        '                                        </div>' +
        '                                        <div class="infobox-data">' +
        '                                            <div class="infobox-content"><h4 style="margin-top: 10px">' + var1st + '</h4></div>' +
        '                                        </div>' +
        '                                    </div>' +
        '                                </div>' +
        '                                <div class="row">' +
        '                                   <div class="infobox width-100">' +
        '                                        <div class="infobox-icon">' +
        '                                           <i style="color: silver" class="bigger-300 ' + cupIcon + '"></i>' +
        '                                        </div>' +
        '                                        <div class="infobox-data">' +
        '                                            <div class="infobox-content"><h4 style="max-width: 100%;margin-top: 10px">' + var2nd + '</h4></div>' +
        '                                        </div>' +
        '                                    </div>' +
        '                                </div>' +
        '                                <div class="row">' +
        '                                   <div class="infobox width-100">' +
        '                                        <div class="infobox-icon">' +
        '                                           <i style="color: saddlebrown" class="bigger-300 ' + cupIcon + '"></i>' +
        '                                        </div>' +
        '                                        <div class="infobox-data">' +
        '                                            <div class="infobox-content"><h4 style="margin-top: 10px">' + var3rd + '</h4></div>' +
        '                                        </div>' +
        '                                    </div>' +
        '                                </div>' +
        '                             </div>';
    return text;
}

function initComponents() {
    $('.sparkline').each(function () {
        var $box = $(this).closest('.infobox');
        var barColor = !$box.hasClass('infobox-dark') ? $box.css('color') : '#FFF';
        $(this).sparkline('html', {
            tagValuesAttribute: 'data-values',
            type: 'bar',
            barColor: barColor,
            chartRangeMin: $(this).data('min') || 0
        });
    });

    $('.easy-pie-chart.percentage').each(function () {
        var $box = $(this).closest('.infobox');
        var barColor = $(this).data('color') || (!$box.hasClass('infobox-dark') ? $box.css('color') : 'rgba(255,255,255,0.95)');
        var trackColor = barColor == 'rgba(255,255,255,0.95)' ? 'rgba(255,255,255,0.25)' : '#E2E2E2';
        var size = parseInt($(this).data('size')) || 50;
        $(this).easyPieChart({
            barColor: barColor,
            trackColor: trackColor,
            scaleColor: false,
            lineCap: 'butt',
            lineWidth: parseInt(size / 10),
            animate: /msie\s*(8|7|6)/.test(navigator.userAgent.toLowerCase()) ? false : 1000,
            size: size
        });
    });
}

function elaborateActivities(data) {
    var kms = [];
    data.forEach(function (elem) {
        // console.log(elem.start_date);
        kms.push(elem.distance);
    })
    return kms;
}

function rewardsCalculator(data) {
    $.ajax({
        url: '/athletes/charts',
        type: 'GET',
        cache: true,
        success: function (dataAjax) {
            chart = dataAjax;
            var rewards = $('#rewardsContent').html();
            var i = 0;
            for (var key in chart) {
                //hack to be able to load chart json data from file/server
                var math = new Function(chart[key].math[0], chart[key].math[1]);
                chart[key].math = math;

                if ((i == 0) || (i % 6 == 0))
                    rewards += '<div class="row">'

                rewards += rewardsDraw(chart[key], standings(data, chart[key]));


                i++;
                if ((i > 0) && (i % 6 == 0))
                    rewards += '</div><div class="space-20"></div>'

            }
            $('#rewardsContent').html(rewards);

        }
    });
}

function getMaxItemInArray(arr, name) {
    var max = 0;
    for (var key in arr) {
        //workaround for activity type, forced to Ride
        if ((arr[key].type) && (arr[key].type != type))
            continue;
        var app = arr[key][name];
        max = (app > max) ? app : max;
        // console.log(arr, name, max);
    }
    return max;
}

function getDescendantProp(obj, desc) {
    var arr = desc.split(".");
    while (arr.length && (obj = obj[arr.shift()])) ;
    return obj;
}

function standings(data, chart) {

    var rank = 1;
    var result = [];
    var names = [];
    var isLength = (chart.mode == 'length');
    var isMaxInArray = (chart.mode == 'maxInArray');
    while (rank < 4) {
        var max = 0;
        var name = '';

        for (var key in data) {
            var app = '';
            if (isLength)
            // console.log(isLength)
                app = getDescendantProp(data[key], chart.field).length;
            else if (isMaxInArray)
                app = getMaxItemInArray(getDescendantProp(data[key], chart.field), chart.arrField);
            else
                app = getDescendantProp(data[key], chart.field);

            //skip if already in rank
            if (names.includes(data[key].personal.firstname))
                continue;

            name = (app > max) ? data[key].personal.firstname : name;
            max = (app > max) ? app : max;

            // console.log(rank, name, max, chart.name);
        }
        names.push(name);
        result.push({rank: rank, name: name, max: chart.math(max).toFixed(0)});
        rank++;
    }
    return result;
}

aths = {};

function successLoading(data) {
    // console.log(data);
    aths = JSON.parse(data);
    var i = 0;
    var text = $('#mainContent').html();
    rewardsCalculator(aths);
    for (var key in aths) {
        // console.log(aths[key]);
        if ((i == 0) || (i % 3 == 0))
            text += '<div class="row">'

        text += widgetCreate(aths[key]);


        i++;
        if ((i > 0) && (i % 3 == 0))
            text += '</div><div class="space-20"></div>'

    }
    $('#mainContent').html(text);
    initComponents();
}

function updateSyncStatus() {
    var text = 'Update every 6hrs, updated to: ';
    var elem = $('#nav-search > a > i');
    $({deg: 0}).animate({deg: 360}, {
        duration: 2000,
        step: function (now) {
            // in the step-callback (that is fired each step of the animation),
            // you can use the `now` paramter which contains the current
            // animation-position (`0` up to `angle`)
            elem.css({
                transform: 'rotate(' + now + 'deg)'
            });
        }
    });
    $('#syncedTo').html('loading new stats...');
    setTimeout(function () {
        $.ajax({
            url: '/athletes/stats',
            type: 'GET',
            cache: false,
            success: function (data) {
                var time = moment(JSON.parse(data).time);
                $('#syncedTo').html(text + time.format('H:mm of D/M'));
            },
            error: function (XMLHttpRequest, textStatus, errorThrown) {
                console.log('Qualcosa è andato storto, prova a ricaricare la pagina!', 'danger', 'Error');
                return false;
            }
        });
    }, 2000)

}

$(function () {
    var intervalRefreshStats = 60 * 5 * 1000 //5mins

    //load data from server
    $.ajax({
        url: '/athletes',
        type: 'GET',
        // data: {play_date: date, message: message},
        cache: false,
        success: successLoading,
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('Qualcosa è andato storto, prova a ricaricare la pagina!', 'danger', 'Error');
            return false;
        }
    });

    updateSyncStatus();
    setInterval(function () {
        updateSyncStatus();
    }, intervalRefreshStats)


})


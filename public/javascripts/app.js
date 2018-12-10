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
    var name = standings.name;
    var standing = data.name;
    var icon = data.icon;
    var text =
        '                            <div class="col-sm-3 ">' +
        '                                <div class="row">' +
        '                                   <div class="height-auto width-50">' +
        '                                   <h4 style="text-align: center">' + icon + '&nbsp;' + standing + '</h4>' +
        '                                   </div>' +
        '                                </div>' +
        '                                <div class="row">' +
        '                                   <div class="infobox width-auto">' +
        '                                        <div class="infobox-icon">' +
        '                                           <i style="color: gold" class="bigger-300 fas fa-trophy"></i>' +
        '                                        </div>' +
        '                                    </div>' +
        '                                   <div class="infobox">' +
        '                                        <div class="infobox-data">' +
        '                                            <div class="infobox-content"><h3 style="margin-top: 10px">' + name + ' '+standings.max +'</h3></div>' +
        '                                        </div>' +
        '                                    </div>' +
        '                                </div>' +
        '                                <div class="row">' +
        '                                   <div class="infobox width-auto">' +
        '                                        <div class="infobox-icon">' +
        '                                           <i style="color: silver" class="bigger-300 fas fa-trophy"></i>' +
        '                                        </div>' +
        '                                    </div>' +
        '                                   <div class="infobox ">' +
        '                                        <div class="infobox-data">' +
        '                                            <div class="infobox-content"><h3 style="margin-top: 10px">' + name + '</h3></div>' +
        '                                        </div>' +
        '                                    </div>' +
        '                                </div>' +
        '                                <div class="row">' +
        '                                   <div class="infobox width-auto">' +
        '                                        <div class="infobox-icon">' +
        '                                           <i style="color: saddlebrown" class="bigger-300 fas fa-trophy"></i>' +
        '                                        </div>' +
        '                                    </div>' +
        '                                   <div class="infobox">' +
        '                                        <div class="infobox-data">' +
        '                                            <div class="infobox-content"><h3 style="margin-top: 10px">' + name + '</h3></div>' +
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
    var chart = [
        {
            name: 'KOM',
            type: 'uphill',
            field: 'stats.ytd_ride_totals.elevation_gain',
            icon: '<i class="red bigger-150 fa fa-mountain"></i>'
        },
        {
            name: 'Best assente',
            type: 'outhome',
            field: 'stats.ytd_ride_totals.elapsed_time',
            icon: '<i class="orange bigger-150 fa fa-sign-out-alt"></i>'
        },
        {
            name: 'Best km',
            type: 'distance',
            field: 'stats.ytd_ride_totals.distance',
            icon: '<i class="blue bigger-150 fa fa-tachometer-alt"></i>'
        }
    ]
    var rewards = $('#rewardsContent').html();
    var i = 0;
    for (var key in chart) {
        // console.log(chart[key]);
        if ((i == 0) || (i % 4 == 0))
            rewards += '<div class="row">'

        rewards += rewardsDraw(chart[key], standings(data, chart[key]));



        i++;
        if ((i > 0) && (i % 4 == 0))
            rewards += '</div><div class="space-20"></div>'

    }
    $('#rewardsContent').html(rewards);
}

function getDescendantProp(obj, desc) {
    var arr = desc.split(".");
    while (arr.length && (obj = obj[arr.shift()])) ;
    return obj;
}

function standings(data, chart) {
    var max = 0;
    var name = '';
    for (var key in data) {
        var app = getDescendantProp(data[key], chart.field);
        name = (app>max) ? data[key].personal.firstname : name;
        max = (app>max) ? app : max;


        console.log(name)
    }
    return {name: name, max: max};
}

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

$(function () {
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

})


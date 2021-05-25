let sound = new Audio("https://dm0qx8t0i9gc9.cloudfront.net/previews/audio/BsTwCwBHBjzwub4i4/alarm-clock-buzzer-beeps_MyERv24__NWM.mp3");
let isPlayed = false;

let api = "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict";

let interval;
var table = document.getElementById("result");
let date = new Date();
date.setDate(date.getDate() + 1);
document.getElementById('date').value =  date.getDate() + '-0' + (date.getMonth()+1) + '-' + date.getFullYear();

function onClickSearch() {
    let district_id = document.getElementById('district_id').value;
    renderResult(district_id);
}

function renderResult(district_id) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            let data = JSON.parse(this.response);
            for(var i = 0; i < data['sessions'].length ; i++) {
                if(data['sessions'][i]['available_capacity'] > 0 && data['sessions'][i]['vaccine'] == 'COVISHIELD') {
                    let rowdata = data['sessions'][i];
                    let row = table.insertRow(1);
                    let col1 = row.insertCell(0);
                    col1.innerHTML  = rowdata['name'] + '<br>' + rowdata['address'];
                    let col2 = row.insertCell(1);
                    col2.innerHTML  = rowdata['date'];
                    let col3 = row.insertCell(2);
                    col3.innerHTML  = rowdata['vaccine'];
                    let col4 = row.insertCell(3);
                    col4.innerHTML  = rowdata['fee_type'];
                    let col5 = row.insertCell(4);
                    col5.innerHTML  = rowdata['available_capacity_dose1'] + ' / ' + rowdata['available_capacity_dose2'] + ' / ' + rowdata['available_capacity'];
                    let col6 = row.insertCell(5);
                    col6.innerHTML  = rowdata['min_age_limit'] + '+';

                    playSound();
                }
            }
            document.getElementById('loading').style.visibility = "hidden";
            setTimeout(function() { renderResult(district_id) }, 3300);
        }
    };
    xhttp.open("GET", "https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByDistrict?district_id=" + district_id + "&date=" + document.getElementById('date').value, true);
    document.getElementById('loading').style.visibility = "visible";
    xhttp.send();
}

function playSound() {
    if (isPlayed == false) {
        isPlayed = true;
        sound.play();
    }
}
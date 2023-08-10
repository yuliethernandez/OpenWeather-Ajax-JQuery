$(document).ready(
    function(){
        //getWeather();
        $("#btnGetWeather").click(function(){
            return getWeather();
        });
});

/*Current Weather Data - http://openweathermap.org/current
5 Day/3 Hour Forecast - http://openweathermap.org/forecast5 */
function getWeather(){
    clearContentTable();
    getCurrentCondition();
    //getFiveDaysForecast();
}

function clearContentTable(){
    $('#contentRows').empty();
}
/*Current Conditions in |City|
The |City| in the content block header should be replaced with the JSON data from the open weather map service (ex: Akron).
The content block should be divided into two vertical columns.
The left column should display the icon and description for the current conditions.
The right column should display the temperature, humidity, and wind data. 
&units=metric, you will get the temperature in degree Celcius. If you want the temperature in Farenheit, use &units=imperial*/
function getCurrentCondition(){
    $('#errorMessages').empty();
    validateDatas();
    var zipCode = $('#inputZipCode').val();
    var units = $('#inputUnit').val();

    var urlGetCurrentConditions = 'https://api.openweathermap.org/data/2.5/weather?q=' + zipCode + '&APPID=c10bb3bd22f90d636baa008b1529ee25&units=' + units;
    
    $.ajax({
        type:'GET',
        url: urlGetCurrentConditions,
        success: function(data){
            var city = data.name;
            var description = data.weather[0].description;
            var temperature = data.main.temp; 
            var humidity = data.main.humidity; 
            var wind = data.wind.speed;

            /*var row = '<tr>';
                row += '<td><img src="http://openweathermap.org/img/w/'+ data.weather[0].icon + '.png">'+ description +'</td>';
                row += '<td>Temperature: ' + temperature + '</td>';
                row += '</tr>';
                row += '<tr>';
                row += '<td></td>';
                row += '<td>Humidity: ' + humidity + '</td>';
                row += '</tr>';
                row += '<tr>';
                row += '<td></td>';
                row += '<td>Wind: ' + wind + '</td>';
                row += '</tr>' ;*/

            var descriptionCurrentConditions = '<img src="http://openweathermap.org/img/w/'+ data.weather[0].icon+'.png">'+ description;
            var tdTemperature = 'Temperature: ' + temperature;
            var tdHumidity = 'Humidity: ' + humidity + '%';
            var tdWind = 'Wind: ' + wind + ' miles/hours'; //implement a condition for undefined

            $('#pCurrentCondition').empty();
            //contentRowsCond.empty();
            pCurrentCondition.append(city);
            $('#tdCurrentCondition').html(descriptionCurrentConditions);
            $('#tdTemperature').html(tdTemperature);
            $('#tdhumidity').html(tdHumidity);
            $('#tdwind').html(tdWind);
            $('#inputZipCode').val('');
            //contentRowsCond.append(row);
        },
        error: function(){
            $('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service. Please try again later.'));
        }
    })
    getFiveDaysForecast();
    $('#containerCurrentCondition').show();
}
/*Five Day Forecast
Beneath the content block header should be 5 columns of data with a similar format.
Each column should have a top line consisting of a date formatted like "3 August".
Beneath the date, an icon for the weather type and description should appear.
Beneath the icon, the high and low temperatures should be listed with the proper units (C or F). */
function getFiveDaysForecast(){
    //$('#errorMessages').empty();
    var contentRowsForecast = $('#contentRowsForecast');
    var zipCode = $('#inputZipCode').val();
    //var units = $('#inputUnit').val();
    validateDatas();

    var urlGetFiveDaysForecast = 'https://api.openweathermap.org/data/2.5/forecast?q=' + zipCode + '&APPID=c10bb3bd22f90d636baa008b1529ee25';

    $.ajax({
        type: 'GET',
        url: urlGetFiveDaysForecast,
        succes: function(data){
            var firstDay = data.list[0].dt_txt;
            var secondDay = data.list[9].dt_txt;
            var thirdDay = data.list[17].dt_txt;
            var fourthDay = data.list[25].dt_txt;
            var fifthDay = data.list[33].dt_txt;

            
            var table = '<tr>';                   
                table += '<td>firstDay</td>';    
                table += '<td>secondDay</td>'; 
                table += '<td>thirdDay</td>'; 
                table += '<td>fourthDay</td>'; 
                table += '<td>fifthDay</td>';        
                table += '</tr>';
            
            contentRowsForecast.append(table);
        },
        'dataType': 'json',
        error: function(){
            $('#errorMessages')
                .append($('<li>')
                .attr({class: 'list-group-item list-group-item-danger'})
                .text('Error calling web service. Please try again later.'));
        }
    })
    $('#fiveDaysForecast').show();
}
/*if a user enters an invalid zip code (not 5 digits), then a Bootstrap contextual error background element 
should appear above the horizontal form. It should be 100% of the width of the screen and display a validation 
error: "Zip code: please enter a 5-digit zip code". */
function validateDatas(input){

}
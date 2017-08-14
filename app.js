let channels = ['freecodecamp', 'membtv', 'escapeaoe', 'C9Sneaky', 'TheSpeedGamers', 'DkaneOfficial', 'T90Official', 'ZeroEmpires', 'DrDisRespectLIVE', 'KingGothalion'];

let ul = document.getElementById("channels");
let listItems = ul.getElementsByTagName("li");
let statusItems = ul.getElementsByClassName("status");
let checkOutChannel = ul.getElementsByClassName('link');
let channelName = ul.getElementsByClassName('title');
let aButton = ul.getElementsByTagName('a');
let picture = ul.getElementsByClassName('profile-pic');
let searchitem = document.getElementById('searchBar');
let searchChannel = document.getElementById('searchBarContent');

(function fire() {
    $('#searchResult').hide();
    for (let i = 0; i < channels.length; i++) {
        getChannelInfo(channels[i], i);
    }
})()

function getChannelInfo(name, index) {
    $.getJSON("https://api.twitch.tv/kraken/streams/" + name + "?client_id=gvs1dph0z4nprptrzakral8izebdfr", function (data) {
        channelName[index].innerHTML = name;
        checkOutChannel[index].href ="https://www.twitch.tv/"+name;
        if (data.stream != null) {
            picture[index].src = data.stream.channel.logo;
            statusItems[index].innerHTML = 'online';
            statusItems[index].classList.add('class', 'badge-info');
            listItems[index].classList.add('class', 'on');
            aButton[index].classList.add('class', 'btn-info');
            checkOutChannel[index].innerHTML = "Watch Live Stream!";
        } else {
            statusItems[index].innerHTML = 'offline';
            statusItems[index].classList.add('class', 'badge-default');
            listItems[index].classList.add('class', 'off');
            aButton[index].classList.add('class', 'btn-default');
            checkOutChannel[index].innerHTML = "Browse The Channel";
            getOfflineProfilePicture(name, index);
        }
    });
}

function getOfflineProfilePicture(offlineChannel, num) {
    $.ajax({
        url: "https://api.twitch.tv/kraken/channels/" + offlineChannel + "?client_id=gvs1dph0z4nprptrzakral8izebdfr",
        type: 'GET',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            channelName[num].innerHTML = 'ERROR, the channel "' + offlineChannel + '" does not exist';
            console.log('status:' + XMLHttpRequest.status + ', status text: ' + XMLHttpRequest.statusText);
        },
        success: function (data) {
            picture[num].src = data.logo;
        }
    });
}

searchitem.addEventListener('submit', (event) => {
    event.preventDefault();
    let channelName = searchChannel.value;
    console.log(channelName);
    getChannelInfo(channelName, 10);
    $('.on').hide();
    $('.off').hide();
    $('#searchResult').show();
});

$('.allOnline').click(function () {
    $('.off').hide();
    $('.on').show();
});

$('.allOffline').click(function () {
    $('.on').hide();
    $('.off').show();
});
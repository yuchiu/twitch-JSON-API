let channels = ['freecodecamp', 'TheRace', 'TwitchPresents', 'C9Sneaky', 'TheSpeedGamers', 'DkaneOfficial', 'Ninja', 'Cryaotic', 'SoLLUMINATI', 'KingGothalion'];

const channelList = document.getElementById("channels");
const listItems = channelList.getElementsByTagName("li");
const statusItems = channelList.getElementsByClassName("status");
const checkOutChannel = channelList.getElementsByClassName('link');
const channelName = channelList.getElementsByClassName('title');
const aButton = channelList.getElementsByTagName('a');
const picture = channelList.getElementsByClassName('profile-pic');
const searchBar = document.getElementById('searchBar');
const searchChannel = document.getElementById('searchBarContent');
const addList = document.getElementById('add-list');


(function fire() {
    $('#searchResult').hide();
    for (let i = 0; i < channels.length; i++) {
        getChannelInfo(channels[i], i);
    }
})()

function getChannelInfo(name, index) {
    $.get("https://api.twitch.tv/kraken/streams/" + name + "?client_id=gvs1dph0z4nprptrzakral8izebdfr", function (data) {
        channelName[index].innerHTML = name;
        checkOutChannel[index].href ="https://www.twitch.tv/"+name;
        if (data.stream != null) {
            picture[index].src = data.stream.channel.logo;
            statusItems[index].innerHTML = 'online';
            statusItems[index].classList.add('class', 'online-status');
            listItems[index].classList.add('class', 'on');
            checkOutChannel[index].innerHTML = "Watch Live Stream!";
        } else {
            statusItems[index].innerHTML = 'offline';
            statusItems[index].classList.add('class', 'offline-status');
            listItems[index].classList.add('class', 'off');
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
        },
        success: function (data) {
            picture[num].src = data.logo;
        }
    });
}
function getResultChannel(name){
    $.ajax({
        url: "https://api.twitch.tv/kraken/channels/" + name + "?client_id=gvs1dph0z4nprptrzakral8izebdfr",
        type: 'GET',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            console.log('faled')
            $('#result-title').innerHTML = 'ERROR, the channel "' + name + '" does not exist';
        },
        success: function (data) {
            console.log('sucess'+ data.logo)
            $('#result-profile-pic').src = data.logo;
        }
    });
}

searchBar.addEventListener('submit', (event) => {
    event.preventDefault();
    let channelName = searchChannel.value;
    getResultChannel(channelName)
    $('#result-placeholder').hide();
    $('#searchResult').show();
});
addList.addEventListener('click', (event)=>{
    event.preventDefault();
    let channelName = searchChannel.value;
    channels.push(channelName)
    console.log(channels)
})
$('#allChannels').click(function () {
    $('.off').show();
    $('.on').show();
});
$('#allOnline').click(function () {
    $('.off').hide();
    $('.on').show();
});

$('#allOffline').click(function () {
    $('.on').hide();
    $('.off').show();
});
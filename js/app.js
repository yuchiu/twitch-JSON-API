let channels = ['freecodecamp', 'DrDisRespectLIVE', 'TwitchPresents', 'C9Sneaky', 'TheSpeedGamers', 'DkaneOfficial', 'Ninja', 'Cryaotic', 'SoLLUMINATI', 'KingGothalion'];

const channelList = document.getElementById("channels");
const listItems = channelList.getElementsByTagName("li");
const statusItems = channelList.getElementsByClassName("status");
const channelName = channelList.getElementsByClassName('title');
const aButton = channelList.getElementsByTagName('a');
const picture = channelList.getElementsByClassName('profile-pic');
const searchBar = document.getElementById('searchBar');
const searchChannel = document.getElementById('searchBarContent');


(function fire() {
    $('#searchResult').hide();
    for (let i = 0; i < channels.length; i++) {
        getChannelInfo(channels[i], i);
    }
})()


function getChannelInfo(name, index) {
    $.get("https://api.twitch.tv/kraken/streams/" + name + "?client_id=gvs1dph0z4nprptrzakral8izebdfr", function (data) {
        $(".inner").append("<p>Test</p>");
        channelName[index].innerHTML = name;
        if (data.stream != null) {
            picture[index].src = data.stream.channel.logo;
            statusItems[index].classList.add('status-on');
            listItems[index].classList.add('on-group');
        } else {
            statusItems[index].classList.add('status-off');
            listItems[index].classList.add('off-group');
            offlinePic(name, index);
        }
    });
}



function getResultChannel(name) {
    resultOfflinePic(name)
    $.get("https://api.twitch.tv/kraken/streams/" + name + "?client_id=gvs1dph0z4nprptrzakral8izebdfr", function (data) {
        $('#search-result').append(`<h2 id="result-title">${name}</h2><a id="result-link" href="https://www.twitch.tv/${name}" role="button" target="_blank">check out the channel</a>`);
        if (data.stream != null) {
            $('#search-result').append(`<div id="result-status" >On</div>`)
        } else {
            $('#search-result').append(`<div id="result-status" >Off</div>`)
        }
    });
}

function resultOfflinePic(offlineChannel) {
    $.ajax({
        url: "https://api.twitch.tv/kraken/channels/" + offlineChannel + "?client_id=gvs1dph0z4nprptrzakral8izebdfr",
        type: 'GET',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#search-result').append(`<h2 id="result-title">Channel Dosen't Exist</h2>`);

        },
        success: function (data) {
            $('#search-result').append(`<img src="${data.logo}" id="result-profile-pic">`)
        }
    });
}

function offlinePic(offlineChannel, num) {
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
searchBar.addEventListener('submit', (event) => {
    event.preventDefault();
    if(searchChannel.value){
        let channelName = searchChannel.value;
        $('#result-placeholder').hide();
        $('#search-result').empty()
        getResultChannel(channelName)
        $('#search-result').show();}
});

$('#allChannels').click(function () {
    $('.off-group').show("slow");
    $('.on-group').show("slow");
    $('#allChannels').addClass('status-active');
    $('#allOnline').removeClass('status-active');
    $('#allOffline').removeClass('status-active');
});
$('#allOnline').click(function () {
    $('.off-group').hide("slow");
    $('.on-group').show("slow");
    $('#allOnline').addClass('status-active');
    $('#allChannels').removeClass('status-active');
    $('#allOffline').removeClass('status-active');

});

$('#allOffline').click(function () {
    $('.on-group').hide("slow");
    $('.off-group').show("slow");
    $('#allOffline').addClass('status-active');
    $('#allChannels').removeClass('status-active');
    $('#allOnline').removeClass('status-active');
});
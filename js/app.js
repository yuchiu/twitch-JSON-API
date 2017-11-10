(function () {
    $('#searchResult').hide();
    for (let i = 0; i < channels.length; i++) {
        getChannelInfo(channels[i], i);
    }
})()

function getChannelInfo(channelName, index) {
    getProfilePic(channelName, index);
    $.get("https://api.twitch.tv/kraken/streams/" + channelName + "?client_id=gvs1dph0z4nprptrzakral8izebdfr", function (data) {
        $channel[index].id = `${channelName}`
        $channelTitle[index].innerHTML = channelName;
        if (data.stream != null) {
            $statusBar[index].classList.add('status-on');
            $channel[index].classList.add('on-group');
        } else {
            $statusBar[index].classList.add('status-off');
            $channel[index].classList.add('off-group');
        }
    });
}

function getProfilePic(offlineChannel, num) {
    $.ajax({
        url: "https://api.twitch.tv/kraken/channels/" + offlineChannel + "?client_id=gvs1dph0z4nprptrzakral8izebdfr",
        type: 'GET',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $channelTitle[num].innerHTML = 'ERROR, the channel "' + offlineChannel + '" does not exist';
        },
        success: function (data) {
            $profilePic[num].src = data.logo;
        }
    });
}



function getResultChannel(channelName) {
    $('#result-placeholder').hide();
    $('#search-result').empty();
    $('#search-result').show();
    resultOfflinePic(channelName)
}

function resultOfflinePic(channelName) {
    $.ajax({
        url: "https://api.twitch.tv/kraken/channels/" + channelName + "?client_id=gvs1dph0z4nprptrzakral8izebdfr",
        type: 'GET',
        error: function (XMLHttpRequest, textStatus, errorThrown) {
            $('#search-result').append(`<h2 id="result-title">Channel Dosen't Exist</h2>`);

        },
        success: function (data) {
            $('#search-result').css('background-image', `url(${data.video_banner})`);
            $('#search-result').append(`<img src="${data.profile_banner}" id="result-profile-banner"/>`)
            $('#search-result').append(`<img src="${data.logo}" id="result-profile-pic"/>`)
            $('#search-result').append(`<h2 id="result-title">${channelName}</h2>`)
            checkOnOrOff(channelName)
        }
    });
}

function checkOnOrOff(channelName) {
    $.get("https://api.twitch.tv/kraken/streams/" + channelName + "?client_id=gvs1dph0z4nprptrzakral8izebdfr", function (data) {
        if (data.stream != null) {

            $('#search-result').append(`<a href="https://go.twitch.tv/${channelName}" target="_blank" id="result-url">Streaming Live! <i class="fa fa-external-link"></i></a>`)
        } else {
            $('#search-result').append(`<a href="https://go.twitch.tv/${channelName}" target="_blank" id="result-url">Channel Offline <i class="fa fa-external-link"></i></a>`)
        }
    });
}
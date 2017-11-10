let channels = ['freecodecamp', 'shroud', 'TwitchPresents', 'moonduckTV', 'TheSpeedGamers', 'ESL_SC2', 'Ninja', 'summit1g', 'WilliamChyr', 'KingGothalion'];

const $channel = $(".channel-wrapper");
const $statusBar = $(".status-bar");
const $channelTitle = $('.title');
const $profilePic = $('.profile-pic');
const $searchForm = $('#search-form');
const $searchBar = $('#search-bar');

const $allChannels = $("#allChannels");
const $allOnline = $("#allOnline");
const $allOffline = $("#allOffline");

$allChannels.click(function () {
    $('.off-group').show("slow");
    $('.on-group').show("slow");
    $allChannels.addClass('status-active');
    $allOnline.removeClass('status-active');
    $allOffline.removeClass('status-active');
});
$allOnline.click(function () {
    $('.off-group').hide("slow");
    $('.on-group').show("slow");
    $allOnline.addClass('status-active');
    $allChannels.removeClass('status-active');
    $allOffline.removeClass('status-active');

});

$allOffline.click(function () {
    $('.on-group').hide("slow");
    $('.off-group').show("slow");
    $allOffline.addClass('status-active');
    $allChannels.removeClass('status-active');
    $allOnline.removeClass('status-active');
});

$channel.click(function (e) {
    if (e.target.tagName == 'LI') {
        getResultChannel(e.target.id)
    } else if (e.target.tagName == 'H4') {
        getResultChannel(e.target.innerHTML)
    }
});
$searchForm.submit((e) => {
    e.preventDefault();
    if ($searchBar.val()) {
        let $channelTitle = $searchBar.val();
        getResultChannel($channelTitle)
    }
});
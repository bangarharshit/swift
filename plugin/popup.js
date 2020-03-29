
$(document).ready(function () {
    $('input[type=radio]').click(function(){
        sendMethodToContent(this.value);
        $('#keyword_input').val('');
    });
    $('#keyword_submit_button').click(function () {
        $('input:radio[name=speed]').each(function () { $(this).prop('checked', false); });
        sendMethodToContent($('#keyword_input').val())

    });
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {id: 'fetchSpeed'}, function (response) {
            const speed = Number(response.speed);
            switch (speed) {
                case 0.5:
                    $('#half').prop("checked", true);
                    break;
                case 1:
                    $('#normal').prop("checked", true);
                    break;
                case 1.5:
                    $('#onehalf').prop("checked", true);
                    break;
                case 2:
                    $('#double').prop("checked", true);
                    break;
                default:
                    $('#keyword_input').val(response.speed);
            }
        });
    });
});

const sendMethodToContent = function (speedValue) {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {id: 'changeSpeed', speedVal: speedValue});
    });
};
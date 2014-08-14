$('#sidebox .tab').toggle(function(){
    $('#sidebox').animate({'top': '200px;'});
}, function(){
    $('#sidebox').animate({'top':-$('#sidebox_content').height()});
});
$(document).ready(function() {
    //
    // GLOBAL VARIABLES ==================================================================================
    //
    var database = firebase.database();
    var materialClicked = false;
    var materialId = '';
    var studentObjKey = '';
    var videosObj;
    var counter;
    //
    // CODE ==================================================================================
    //



    $(document.body).on('click', '.card-panel', function() {

        if (materialClicked === false) {
            materialClicked = true;
            $(this).addClass('selected-card');
            $(this).animateCss('bounce');
            materialId = $(this).data('id');
        } else {
            $('.card-panel').removeClass('selected-card');
            $(this).addClass('selected-card');
            $(this).animateCss('bounce');
            materialId = $(this).data('id');
        }
    });

    $(document.body).on('click', '.collection-item', function() {
        studentObjKey = $(this).attr('data-studentKey');
        counter = $(this).attr('data-counter');
        String(studentObjKey);
        $('.collection-item').removeClass('active');
        $(this).addClass('active');
        $(this).animateCss('bounce');
    });

    $('#assign-button').on('click', function() {
        if (materialId.length > 0 && studentObjKey.length > 0) {
            counter++;
            var videoKeyRem = database.ref().child(studentObjKey).child('videos').push({
                videoKey: "",
                videoId: materialId
            }).key;
            database.ref().child(studentObjKey).update({
                counter: counter
            });
            database.ref().child(studentObjKey).child('videos').child(videoKeyRem).update({
                videoKey: videoKeyRem
            });
            $('.card-panel').removeClass('selected-card');
            //reset video ID and student key
            materialId = '';
            studentObjKey = '';
            $('.lightspeed').animateCss('bounceOutRight');
        } else {
            $("#modal3").show();
            $('.modal-close').on('click', function() {
                $('#modal3').hide();
            });
        }
        return false;
    });
});

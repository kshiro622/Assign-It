$(document).ready(function() {
    //
    // FIREBASE INITIALIZE ==================================================================================
    //
    var config = {
        apiKey: "AIzaSyD-9fvYxn1sAxKuAb7mtF0qCQyfZiZ2cDU",
        authDomain: "assign-it.firebaseapp.com",
        databaseURL: "https://assign-it.firebaseio.com",
        storageBucket: "assign-it.appspot.com",
        messagingSenderId: "701919698493"
    };
    firebase.initializeApp(config);
    //
    // GLOBAL VARIABLES ==================================================================================
    //
    var database = firebase.database();
    var pushKey;
    //
    // CODE ==================================================================================
    //
    // Firebase call that happens on page load and value updates.
    database.ref().on("value", function(snapshot) {
        $('#student-list').empty();

        snapshot.forEach(function(childSnapshot) {
            var name = childSnapshot.val().name;
            var keyFromDatabase = childSnapshot.val().key;
            var videos = childSnapshot.val().videos;
            var counter = childSnapshot.val().counter;
            // var email = childSnapshot.val().email;
            $('#student-list').append("<a href='#!' class='collection-item' data-studentKey='" + keyFromDatabase + "' data-counter='" + counter + "'>" + name + "<span class='counter'> (" + counter + ")</span><span class='right delete' data-keyDelete='" + keyFromDatabase + "'>X</span></a>");
        });
        // If it fails, cue error handling.
    }, function(errorObject) {
        // Log a read error and its error code.
        console.log("The read failed: " + errorObject.code);
    });
    // Adding Students
    $("#add-button").on('click', function() {
        var name = $('#icon_name').val().trim();
        var email = $('#icon_email').val().trim();
        if (email === "") {
            email = "No user email";
        }
        if (name.length > 0 && email.length > 0) {
            // Push to database and get key.
            pushKey = database.ref().push({
                name: name,
                email: email,
                videos: '',
                key: 'none',
                counter: 0
            }).key;

            database.ref().child(pushKey).update({
                key: pushKey
            });
            // Empty input fields.
            $('#icon_name').val('');
            $('#icon_email').val('');
        } else if (name.length > 0) {
            // Push to database and get key.
            pushKey = database.ref().push({
                name: name,
                videos: '',
                key: 'none',
                counter: 0
            }).key;

            database.ref().child(pushKey).update({
                key: pushKey
            });
            // Empty input fields.
            $('#icon_name').val('');
        } else {
            $("#modal1").show();
            $('.modal-close').on('click', function() {
                $('#modal1').hide();
            });

        }
        $('.rotate').animateCss('rotateIn');
        // Don't refresh.
        return false;
    });

    $('#icon_email, #icon_name').keypress(function(e) {
        if (e.which == 13) { //Enter key pressed
            $('#add-button').click(); //Trigger search button click event
            return false;
        }
    });

    // Delete student from database and DOM when X is clicked
    $(document.body).on('click', '.delete', function() {
        var key = $(this).attr('data-keyDelete');
        String(key);
        $('#modal5').show();
        $('#yes').on('click', function() {
            $('#modal5').hide();
            database.ref().child(key).remove();
        });

        $('#no').on('click', function() {
            $('#modal5').hide();
        });

    });
});

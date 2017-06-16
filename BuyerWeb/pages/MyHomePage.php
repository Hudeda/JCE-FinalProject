<?php
/**
 * Created by IntelliJ IDEA.
 * User: hudeda
 * Date: 10/02/2017
 * Time: 13:45
 */
?>
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">

</head>
<body>

<br>

<div class="container-fluid bg-3 text-center">
    <h3 id="titleHomePage">קנייה משותפת - סרטוני הדרכה</h3><br>
    <div class="row">
        <div class="col-sm-4">
            <p class="labelVideo">יצורת קבוצת רכישה חדשה</p>
            <div align="center" class="embed-responsive embed-responsive-16by9">
                <video class="embed-responsive-item" poster="image/logoVideo.jpeg">
                    <source src="http://buy-with-friends.com/video/createNewGroup.mp4" type="video/mp4">
                </video>
            </div>
        </div>
        <div class="col-sm-4" >
            <p class="labelVideo">איך נרשמים/מתחברים למערכת</p>
            <div align="center" class="embed-responsive embed-responsive-16by9">
                <video class="embed-responsive-item" poster="image/logoVideo.jpeg">
                    <source src="http://buy-with-friends.com/video/connectionBuyer.mp4" type="video/mp4">
                </video>
            </div>
        </div>
        <div class="col-sm-4">
            <p class="labelVideo">?מי אנחנו</p>
            <div align="center" class="embed-responsive embed-responsive-16by9">
                <video class="embed-responsive-item" poster="image/logoVideo.jpeg">
                    <source src="http://buy-with-friends.com/video/buyWithFriendsDescription.mp4" type="video/mp4">
                </video>
            </div>
        </div>
    </div>
</div>
<br>

<div class="container-fluid bg-3 text-center">
    <div class="row">
        <div class="col-sm-4">
            <p class="labelVideo">?שכחת סיסמה</p>
            <div align="center" class="embed-responsive embed-responsive-16by9">
                <video class="embed-responsive-item" poster="image/logoVideo.jpeg">
                    <source src="http://buy-with-friends.com/video/sendEmailForgotPassword.mp4" type="video/mp4">
                </video>
            </div>
        </div>
        <div class="col-sm-4">
            <p class="labelVideo">הצטרפות לקבוצת רכישה קיימת</p>
            <div align="center" class="embed-responsive embed-responsive-16by9">
                <video class="embed-responsive-item" poster="image/logoVideo.jpeg">
                    <source src="http://buy-with-friends.com/video/addToGroup.mp4" type="video/mp4">
                </video>
            </div>
        </div>
        <div class="col-sm-4">
            <p class="labelVideo">אפשרויות חיפוש של קבוצות באתר</p>
            <div align="center" class="embed-responsive embed-responsive-16by9">
                <video class="embed-responsive-item" poster="image/logoVideo.jpeg">
                    <source src="http://buy-with-friends.com/video/searchOptions.mp4" type="video/mp4">
                </video>
            </div>
        </div>
    </div>
</div>
<br><br>
</body>
<script>
    $("video").click(function() {
        //console.log(this);
        if (this.paused) {
            this.play();
        } else {
            this.pause();
        }
    });
</script>
</html>
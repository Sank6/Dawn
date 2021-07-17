$(document).ready(function() {
    $('.minus').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        return false;
    });
    $('.plus').click(function () {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        return false;
    });
});


function toggleStreaks(self) {
    let el = document.getElementById("points-for-steak")
    if (self.checked) {
        el.style.display = "block"
    } else {
        el.style.display = "none"
    }
}

function notifications() {
    if (document.getElementById("notifications-checkbox").checked) {
        if (window.Notification && Notification.permission === "granted") {
            new Notification("Reminder", {
                icon: "/assets/icons/512x512.png",
                body: "Notifications are enabled"
            });
        } else if (window.Notification && Notification.permission !== "denied") {
            Notification.requestPermission(function (permission) {
                if (permission === "granted") {
                    new Notification("Reminder", {
                        icon: "/assets/icons/512x512.png",
                        body: "Notifications are enabled"
                    });
                } else {
                    document.getElementById("notifications-checkbox").checked = false;
                }
            });
        }
    }
}
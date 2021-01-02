window.onload = function () {
    const useNodeJS = false;
    const defaultLiffId = "1655425611-ajLdABOq";

    let myLiffId = "";

    if (useNodeJS) {
        fetch('/send-id')
            .then(function (reqResponse) {
                return reqResponse.json();
            })
            .then(function (jsonResponse) {
                myLiffId = jsonResponse.id;
                initializeLiffOrDie(myLiffId);
            })
            .catch(function (error) {
                document.getElementById("liffAppContent").classList.add('hidden');
                document.getElementById("nodeLiffIdErrorMessage").classList.remove('hidden');
            });
    } else {
        myLiffId = defaultLiffId;
        initializeLiffOrDie(myLiffId);
    }
};

function initializeLiffOrDie(myLiffId) {
    if (!myLiffId) {
        document.getElementById("liffAppContent").classList.add('hidden');
        document.getElementById("liffIdErrorMessage").classList.remove('hidden');
    } else {
        initializeLiff(myLiffId);
    }
}

// Initialize LIFF
function initializeLiff(myLiffId) {
    liff
        .init({
            liffId: myLiffId
        })
        .then(() => {
            initializeApp();
        })
        .catch((err) => {
            document.getElementById("liffAppContent").classList.add('hidden');
            document.getElementById("liffInitErrorMessage").innerHTML = 'err:' + err.message;
            document.getElementById("liffInitErrorMessage").classList.remove('hidden');
        });
}

function initializeApp() {
    displayLiffData();
    displayIsInClientInfo();
    registerButtonHandlers();

    if (liff.isLoggedIn()) {
        document.getElementById('liffLoginButton').disabled = true;
    } else {
        document.getElementById('liffLogoutButton').disabled = true;
    }
}

function displayLiffData() {
    document.getElementById('isInClient').textContent = liff.isInClient();
    document.getElementById('isLoggedIn').textContent = liff.isLoggedIn();
}

function displayIsInClientInfo() {
    if (liff.isInClient()) {
        document.getElementById('liffLoginButton').classList.toggle('hidden');
        document.getElementById('liffLogoutButton').classList.toggle('hidden');
        document.getElementById('isInClientMessage').textContent = 'You are opening the app in the in-app browser of LINE.';
    } else {
        document.getElementById('isInClientMessage').textContent = 'You are opening app in an external browser.';
    }
}

function getProfileUser() {
    liff.getProfile()
        .then(function (profile) {
            document.getElementById('displayNameField').textContent = profile.displayName;

            const profilePicture = document.getElementById('profilePicture');

            if (profilePicture.firstElementChild) {
                profilePicture.removeChild(profilePicture.firstElementChild);
            }

            const img = document.createElement('img');
            img.src = profile.pictureUrl;
            img.alt = 'Profile Picture';
            img.classList.add('user-img');
            profilePicture.appendChild(img);

            // ambil gambar default
            const defaultPicture = document.getElementById('defaultPicture');
            // jika ada gambar baru, maka hapus gambar default
            if (img) {
                defaultPicture.remove();
            }

        })
        .catch(function (error) {
            window.alert('Error getting profile: ' + error);
        });
}

// Even Handlers
function registerButtonHandlers() {
    // open in external browser
    document.getElementById('openWindowButton').addEventListener('click', function () {
        liff.openWindow({
            url: 'https://mysubmissionapp.herokuapp.com/',
            external: true
        });
    });

    // close the window
    document.getElementById('closeWindowButton').addEventListener('click', function () {
        if (!liff.isInClient()) {
            sendAlertIfNotInClient();
        } else {
            liff.closeWindow();
        }
    });

    // login button
    document.getElementById('liffLoginButton').addEventListener('click', function () {
        if (!liff.isLoggedIn()) {
            liff.login();
        }
    });

    // logout button
    document.getElementById('liffLogoutButton').addEventListener('click', function () {
        if (liff.isLoggedIn()) {
            liff.logout();
            window.location.reload();
        }
    });

    // send a message
    document.getElementById('sendMessageButton').addEventListener('click', function () {
        if (!liff.isInClient()) {
            sendAlertIfNotInClient();
        } else {
            liff.sendMessages([{
                    'type': 'text',
                    'text': "Anda telah menggunakan fitur Send Message"
                }])
                .then(function () {
                    window.alert('Ini adalah pesan dari fitur Send Message');
                })
                .catch(function (error) {
                    window.alert('Error sending message: ' + error);
                });
        }
    });

    // get profile
    document.getElementById('getProfileButton').addEventListener('click', function () {
        getProfileUser();

        // liff.getProfile()
        //     .then(function (profile) {
        //         // document.getElementById('userIdProfileField').textContent = profile.userId;
        //         document.getElementById('displayNameField').textContent = profile.displayName;

        //         const profilePicture = document.getElementById('profilePicture');
        //         if (profilePicture.firstElementChild) {
        //             profilePicture.removeChild(profilePicture.firstElementChild);
        //         }

        //         const img = document.createElement('img');
        //         img.src = profile.pictureUrl;
        //         img.alt = 'Profile Picture';
        //         profilePicture.appendChild(img);

        //         document.getElementById('statusMessageField').textContent = profilePicture.statusMessage;
        //     })
        //     .catch(function (error) {
        //         window.alert('Error getting profile: ' + error);
        //     });
    });
}

function sendAlertIfNotInClient() {
    alert('This button is unavailable as LIFF is currently being opened in a external browser.');
}

function toggleElement(elementId) {
    const elem = document.getElementById(elementId);
    if (elem.offsetWidth > 0 && elem.offsetHeight > 0) {
        elem.style.display = 'none';
    } else {
        elem.style.display = 'block';
    }
}
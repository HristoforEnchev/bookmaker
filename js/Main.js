// listen for form submit
document.getElementById('myForm').addEventListener('submit', saveBookmark);

function saveBookmark(e) {
    var siteName = document.getElementById('siteName').value;
    var siteUrl = document.getElementById('siteUrl').value;

    if (!validate(siteName, siteUrl)) {
        return;
    }

    var bookmark = {
        name: siteName,
        url: siteUrl
    };

    // local storage test
    //localStorage.setItem(bookmark.name, bookmark.url);
    //localStorage.getItem('test')
    //localStorage.removeItem('dir');

    if (localStorage.getItem('bookmarks') === null) {

        var bookmarks = [];
        bookmarks.push(bookmark);

        // set to local storage
        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    } else {
        // get bookmarks from local storage
        var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

        // add bookmark to array
        bookmarks.push(bookmark);

        localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    }

    document.getElementById('myForm').reset();

    fetchBookmarks();

    // prevent form from submiting
    e.preventDefault();
    
}

function fetchBookmarks() {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    var bookmarksResults = document.getElementById('bookmarksResults');

    bookmarksResults.innerHTML = '';

    for (var i = 0; i < bookmarks.length; i++) {
        var name = bookmarks[i].name;
        var url = bookmarks[i].url;

        console.log(url);

        bookmarksResults.innerHTML +=
            '<div class="well">' +
            '<h3>' + name +
            ' <a class="btn btn-default" target="_blank" href="' + url + '">Visit</a>' +
            ' <a onclick="deleteBookmark(\''+name+'\')" class="btn btn-danger"  href="#">Delete</a>' +
            '</h3>' +
            '</div>';
    }
}

function deleteBookmark(name) {
    var bookmarks = JSON.parse(localStorage.getItem('bookmarks'));

    

    for (var i = 0; i < bookmarks.length; i++) {
        if (bookmarks[i].name === name) {
            bookmarks.splice(i, 1);
            break;
        }
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

    fetchBookmarks();
}

function validate(siteName, siteUrl) {
    if (!siteName || !siteUrl) {
        alert('Please fill in the form!');
        return false;
    }

    var expression = /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi;
    var regex = new RegExp(expression);

    if (!siteUrl.match(regex)) {
        alert('Please use a valid Url');
        return false;
    }

    return true;
}
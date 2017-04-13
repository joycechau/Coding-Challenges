const root = 'https://jsonplaceholder.typicode.com';

$(document).ready(function(){
  initializeTables();
});

function fetchUser(userId) {
  return $.ajax({
    url: root + `/users/${userId}`,
    method: 'GET'
  });
}

function fetchUserAlbums(userId) {
  return $.ajax({
    url: root + `/albums?userId=${userId}`,
    method: 'GET'
  });
}

function initializeTables() {
  setUserName(1);
  setUserName(2);
  setUserAlbums(1);
  setUserAlbums(2);
}

function setUserName(userId) {
  fetchUser(userId).then(function(user) {
    $(`#name-${userId}`).text(`${user.name}'s Albums`);
  });
}

function setUserAlbums(userId) {
  fetchUserAlbums(userId).then(function(albums) {
    albums.forEach((album) => {
      $(`#albums-${userId}`).append(
        $(`<li id='${album.id}' draggable='true'> ondragstart=${drag.bind(this)}`).append(`<div class="album-id">${album.id}</div>`, `<div class="album-title">${album.title}</div>`).on("mousedown", (e) => drag(e))
      );
    });
  });
}

function dragging(e) {
  e.preventDefault();
}

function drag(e) {
  // e.dataTransfer.ef
  e.dataTransfer.setData("text", e.target.id);
}

function drop(e) {
  e.preventDefault();
  const album = e.dataTransfer.getData("text");
  e.target.appendChild(document.getElementById(album));
}

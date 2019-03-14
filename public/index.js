const getHedgehogs = () => {
  $('#hedgehog-info').html('');

/***************************
* This queries the API to bring in the json asyncronously. line 8 if successful calls
* .json() on the response and then if that is successful line 10 calls appendHedgehogs.
* appendHedgehogs iterates over the list of hedgehogs and diplays each ones name id and
* allergies. If the response is unsuccessful .catch on line 13 throws the error to the user.
*/
  fetch(`https://hedgehog-party.herokuapp.com/api/v1/invites`)
    .then(response => response.json())
    .then(hedgehogs => appendHedgehogs(hedgehogs))
    .catch(error => console.error({ error }));
};

const appendHedgehogs = (hedgehogs) => {
  hedgehogs.forEach(hedgehog => {
    appendHedgehog(hedgehog);
  });
};

const appendHedgehog = (hedgehog) => {
  $('#invited-hedgehogs-info').append(`
    <article class="invited-hedgehog">
      <p class="name">${hedgehog.name}</p>
      <p class="hoglet-number">${hedgehog.hoglets}</p>
      <p class="allergies">${hedgehog.allergies}</p>
      <button
        id="${hedgehog.id}"
        class="uninvite-btn"
        aria-label="Uninvite">
        uninvite
      </button>
    </article>
  `);
};

const postHedgehog = () => {
  fetch(`https://hedgehog-party.herokuapp.com/api/v1/invites`, {
    method: 'POST',
    headers: { 'Content-Type':
  'application/json'},
      body: JSON.stringify({
        name: document.getElementById('name').value,
        hoglets: document.getElementById('hoglets').value,
        allergies: document.getElementById('allergies').value
      })
  })
  .then(res => res.json())
  .then(response => console.log('Success:', JSON.stringify(response)))
  .catch(error => console.error('Error:', error));

}

const addNewHedgehog = (event) => {
  event.preventDefault();
  postHedgehog();
  console.log("we are in the addNewHedgehog function");
};


const unInviteHedgehog = () => {
  console.log("we are in the unInviteHedgehog function");
};

getHedgehogs();


$('#invite-btn').on('click', addNewHedgehog);
$('#invited-hedgehogs-info').on('click', '.uninvite-btn', unInviteHedgehog);

//URL: https://hedgehog-party.herokuapp.com/api/v1/invites

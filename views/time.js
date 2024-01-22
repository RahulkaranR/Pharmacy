function updateDateTime() {
    const now = new Date();
    const currentDateTime = now.toLocaleString();
    document.querySelector('#datetime').textContent = moment(Date.now()).format('HH-mm-ss');
}
setInterval(updateDateTime, 1000);
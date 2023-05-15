const butInstall = document.getElementById('buttonInstall');

window.addEventListener('beforeinstallprompt', (event) => {

    // Store triggered events //
    window.deferredPrompt = event;

    // Remove hidden class from button //
    butInstall.classList.toggle('hidden', false);
});

butInstall.addEventListener('click', async () => {
    const promptEvent = window.deferredPrompt;

    if (!promptEvent) {
     return;
    }

    // Show prompt //
    promptEvent.prompt();
});

// Handler for the `appinstalled` event //
window.addEventListener('appinstalled', (event) => {
    // Clear prompt //
    window.deferredPrompt = null;
});
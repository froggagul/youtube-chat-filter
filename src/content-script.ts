document.addEventListener('DOMContentLoaded', async function() {
    /**
     * 이미 있는 code 바꾸는 query
     */
    const regex = /미통당|미친|의사|정지/gi;
    // Select the node that will be observed for mutations
    const targetNode = document.getElementById('item-offset');
    // Options for the observer (which mutations to observe)
    const config = {
        childList: true, subtree: true
    };
    // Callback function to execute when mutations are observed
    const callback = function(mutationsList, observer) {
        mutationsList.forEach(mutation => {
            if (mutation.type === 'childList' && mutation.target.id === 'message') {
                const resultText = mutation.target.innerText.replace(regex, "**");
                console.log(mutation.target.innerText);
                mutation.target.id = "filteredMessage";
                mutation.target.innerText = resultText;
            }
        });
    };
    const observer = new MutationObserver(callback);
    // chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    //     console.log(request);
    //     // onMessage must return "true" if response is async.
    //     if (request.id === 'observer') {
    //         if (request.status) {
    //             observer.observe(targetNode, config);
    //         } else {
    //             observer.disconnect();
    //         }
    //     }
    // });
    // observer.observe(targetNode, config);
    const changeObservation = (request) => {
        console.log(request);
        if (request.id === 'observer') {
            if (request.status) {
                console.log('connected');
                observer.observe(targetNode, config);
            } else {
                console.log('disconnected');
                observer.disconnect();
            }
        }
    }
    chrome.runtime.onMessage.addListener(changeObservation);

    window.addEventListener('unload', () => {
        observer?.disconnect();
    })
});

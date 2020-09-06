import React, { useEffect, useState } from "react";
import "./Popup.scss";

export default function Popup() {
  useEffect(() => {
    // Example of how to send a message to eventPage.ts.
    chrome.runtime.sendMessage({ popupMounted: true });
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
      chrome.tabs.sendMessage(tabs[0].id, { id: 'observer', status: true});
    });
  }, []);
  const [status, setStatus] = useState<boolean>(true);
  const connect = () => {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { id: 'observer', status: !status});
    });
    setStatus(!status);
  };

  return (
    <div className="popupContainer" onClick={connect}>
      filter is {status ? 'on' : 'off'}
    </div>
  );
}

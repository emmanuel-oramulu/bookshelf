// client/src/utils/pushSubscription.js

const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
  .replace(/-/g, '+')
  .replace(/_/g, '/');

  const rawData = window.atob(base64);
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
};

// 🔥 use env variable instead of hardcoding
const API_URL = import.meta.env.VITE_API_URL;

export const subscribeUser = async () => {
  if (!('serviceWorker' in navigator) || !('PushManager' in window)) {
    alert('Push messaging is not supported in this browser.');
    return false;
  }

  try {
    const registration = await navigator.serviceWorker.ready;

    const existingSubscription =
    await registration.pushManager.getSubscription();

    if (existingSubscription) {
      return existingSubscription;
    }

    const publicKey = import.meta.env.VITE_VAPID_KEY;
    const uint8Key = urlBase64ToUint8Array(publicKey);

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: uint8Key
    });

    const response = await fetch(`${API_URL}/subscribe`, {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Content-Type': 'application/json'
      }
    });

    if (!response.ok) throw new Error('Failed to save subscription');

    return subscription;

  } catch (err) {
    console.error('Subscribe error:', err);
    alert(`Failed to subscribe user: ${err.message}`);
    return null;
  }
}
// Inside your service worker (sw.js)

// Helper to convert VAPID key (reuse your existing function)
/*const urlBase64ToUint8Array = (base64String) => {
  const padding = '='.repeat((4 - base64String.length % 4) % 4);
  const base64 = (base64String + padding)
    .replace(/-/g, '+')
    .replace(/_/g, '/');

  const rawData = self.atob(base64);  // Use self.atob in SW
  return Uint8Array.from([...rawData].map(char => char.charCodeAt(0)));
};

const VAPID_PUBLIC_KEY = 'YOUR_VAPID_PUBLIC_KEY_HERE'; // Better to pass via message or hardcode safely

self.addEventListener('pushsubscriptionchange', (event) => {
  console.log('🛠️ Push subscription changed (old one became invalid)');

  event.waitUntil(
    (async () => {
      try {
        // Get the old subscription (the one that just became invalid)
        const oldSubscription = event.oldSubscription;

        // Re-subscribe using the SAME options as before
        const newSubscription = await self.registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
        });

        console.log('✅ New subscription created:', newSubscription.endpoint);

        // Send the NEW subscription to your backend so it replaces the old one
        await fetch(`${self.location.origin}/api/update-subscription`, {  // or your /subscribe endpoint
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            oldEndpoint: oldSubscription ? oldSubscription.endpoint : null,
            newSubscription: newSubscription   // full object
          })
        });

        console.log('✅ Server updated with new subscription');
      } catch (err) {
        console.error('❌ Failed to handle pushsubscriptionchange:', err);
        // Optional: You could show a notification asking the user to re-subscribe manually
      }
    })()
  );
});*/

export const unsubscribeUser = async () => {
  try {
    const registration = await navigator.serviceWorker.ready;
    const subscription = await registration.pushManager.getSubscription();

    if (!subscription) return true;

    // 🔥 Send to backend BEFORE unsubscribing
    const response = await fetch(`${API_URL}/unsubscribe`, {
      method: 'POST',
      body: JSON.stringify(subscription),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    alert(response.message);

    await subscription.unsubscribe();

    return true;

  } catch (error) {
    console.error('Unsubscribe error:', error);
    alert(`Unsubscribe failed: ${error.message}`);
    return false;
  }
};

export const getExistingSubscription = async () => {
  const registration = await navigator.serviceWorker.ready;
  return await registration.pushManager.getSubscription();
};
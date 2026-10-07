'use strict';
const express = require('express');
const router = express.Router();
const webpush = require('web-push');

webpush.setVapidDetails(
  'mailto:oramuluemmanuel294@gmail.com', // Replace with your email
  process.env.VAPID_PUBLIC_KEY,
  process.env.VAPID_PRIVATE_KEY
);

let subscriptions = [
  {
    endpoint:
      'https://fcm.googleapis.com/fcm/send/fEchtAYHgBI:APA91bHIZ7rSPB5QHTLgVMnFuuJEVYUZh9X_c8qL83rq7lAzyr4uX4Imcl_abu-Az5VQ4mHqe18g9Ug7yTtznpeW5fIsxJhRO8TDGsHjZ6ip9sxkeqYIMvyc_OZBE950m1BpoY-VqQKj',
    expirationTime: null,
    keys: {
      p256dh:
        'BLwsE6ga7LUal8GGxpukRNu9eTL40MuAB2NRcUnxWv4rw-3eMmO1sjUhRj_usagEkukG_pvy_NYohq3-Gaez_Bc',
      auth: '0TDUv_pAjYwAkzr5SGZE6A',
    },
  },
];

// Endpoint to receive subscription from frontend
router.post('/subscribe', (req, res) => {
  const subscription = req.body;
  subscriptions.push(subscription); // Save to "DB"
  res.status(201).json({});
  console.log('New subscription received', subscription);
});

// Endpoint to trigger a notification (test)
// server/server.js

router.post('/send-notification', async (req, res) => {
  const payload = JSON.stringify({
    title: 'Library Alert 📖',
    body: 'Time to log your reading progress!',
    url: '/books',
  });

  console.log(`Attempting to send to ${subscriptions.length} subscribers...`);

  const invalidEndpoints = [];

  // Send to all subscriptions safely
  await Promise.all(
    subscriptions.map(async (sub, index) => {
      try {
        await webpush.sendNotification(sub, payload);
        console.log(`✅ Sent to subscription ${index + 1}`);
      } catch (err) {
        console.error(`--- Error for subscription ${index + 1} ---`);
        console.error(`Status Code: ${err.statusCode}`);
        console.error(`Body: ${err.body || err.message}`);

        // 404 or 410 means the subscription is dead → remove it
        if (err.statusCode === 404 || err.statusCode === 410) {
          console.log(
            `🗑️  Removing invalid subscription (status ${err.statusCode})`
          );
          invalidEndpoints.push(sub.endpoint); // Collect endpoint instead of index
        }
      }
    })
  );

  // Remove all invalid ones after all sends finish (safest)
  if (invalidEndpoints.length > 0) {
    subscriptions = subscriptions.filter(
      (sub) => !invalidEndpoints.includes(sub.endpoint)
    );
    console.log(
      `Cleaned up ${invalidEndpoints.length} invalid subscription(s).`
    );
  }

  res.status(200).json({
    message: 'Push sequence completed.',
    cleaned: invalidEndpoints.length,
  });
});

router.post('/unsubscribe', (req, res) => {
  const incomingSub = req.body;

  const foundIndex = subscriptions.findIndex(
    (sub) =>
      sub.endpoint === incomingSub.endpoint &&
      sub.keys?.p256dh === incomingSub.keys?.p256dh // extra safety
  );

  if (foundIndex !== -1) {
    subscriptions.splice(foundIndex, 1); // in-place removal (no new array)
    console.log('✅ Subscription removed (using findIndex + splice).');
    res.status(200).json({
      message: '🔕 Notification has been turned off.',
    });
  } else {
    res.status(404).json({
      message: '❌ Subscription not found.',
    });
    console.error('❌ Subscription not found.');
  }
});

module.exports = router;

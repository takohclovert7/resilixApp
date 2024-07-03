import notifee, { AndroidImportance, AndroidGroupAlertBehavior, EventType } from '@notifee/react-native';

const setupNotifee = async (data, emergencyType) => {
  // Create a default notification channel with high importance
  await notifee.createChannel({
    id: 'default',
    name: 'Default Channel',
    importance: AndroidImportance.HIGH,
  });

  // Display the notification
  await displayNotification(data, emergencyType);

  // Handle foreground events (like notification dismissal or press)
  notifee.onForegroundEvent(({ type, detail }) => {
    switch (type) {
      case EventType.DISMISSED:
        // console.log('User dismissed notification:', detail.notification);
        break;
      case EventType.PRESS:
        // console.log('User pressed notification:', detail.notification);
        // Handle notification click here
        break;
      case EventType.ACTION_PRESS:
        handleActionPress(detail.pressAction.id, detail.notification.id);
        break;
    }
  });

  // Handle background events
  notifee.onBackgroundEvent(async ({ type, detail }) => {
    switch (type) {
      case EventType.DISMISSED:
        // console.log('Notification dismissed in background:', detail.notification);
        break;
      case EventType.ACTION_PRESS:
        await handleBackgroundActionPress(detail.pressAction.id, detail.notification.id);
        break;
      default:
        break;
    }
  });
};

const handleActionPress = async (actionId, notificationId) => {
  switch (actionId) {
    case 'mark-as-read':
      // console.log('Mark as Read action pressed:', notificationId);
      // Handle mark as read action
      await notifee.cancelNotification(notificationId);
      break;
    case 'read-more':
      // console.log('Read More action pressed:', notificationId);
      // Handle read more action
      break;
    default:
      break;
  }
};

const handleBackgroundActionPress = async (actionId, notificationId) => {
  switch (actionId) {
    case 'mark-as-read':
      // console.log('Mark as Read action pressed in background:', notificationId);
      // Handle mark as read action in background
      await notifee.cancelNotification(notificationId);
      break;
    case 'read-more':
      // console.log('Read More action pressed in background:', notificationId);
      // Handle read more action in background
      // For example, you can navigate to a specific screen or trigger an in-app action here
      break;
    default:
      break;
  }
};

const displayNotification = async (data, emergencyType) => {
  // Display the notification using Notifee
  await notifee.displayNotification({
    title: emergencyType,
    body: data,
    android: {
      channelId: 'default',
      groupId: 'message-group',
      groupAlertBehavior: AndroidGroupAlertBehavior.SUMMARY,
      pressAction: {
        id: 'default',
        launchActivity: 'default', // Ensures the app launches when the notification is tapped
      },
      actions: [
        { title: 'Mark as Read', pressAction: { id: 'mark-as-read' } },
        { title: 'Read More', pressAction: { id: 'read-more', launchActivity: 'default' } }, // Ensures the app launches when Read More is pressed
      ],
    },
  });
};

export const initializeNotifee = (data, emergencyType) => {
  setupNotifee(data, emergencyType).catch(console.error);
};

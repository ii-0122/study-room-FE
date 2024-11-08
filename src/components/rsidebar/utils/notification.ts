let openNtfCount = 0;

export const showNotification = (nickname: string, message: string) => {
  if ('Notification' in window) {
    Notification.requestPermission().then((permission) => {
      if (permission === 'granted') {
        if (openNtfCount < 1) {
          const notification = new Notification(nickname, {
            body: message,
            icon: '/favicon.png',
          });

          openNtfCount++;

          notification.onclick = () => {
            window.focus();
            notification.close();
          };

          notification.onclose = () => {
            openNtfCount--;
          };
        }
      }
    });
  }
};

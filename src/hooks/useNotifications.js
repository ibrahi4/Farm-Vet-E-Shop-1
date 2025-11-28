import { useState, useEffect } from "react";

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // مؤقت: بيانات تجريبية (لن تكسر المشروع)
    const dummy = [];

    setNotifications(dummy);
    setUnreadCount(dummy.filter(n => !n.read).length);
  }, []);

  return {
    notifications,
    unreadCount,
  };
}

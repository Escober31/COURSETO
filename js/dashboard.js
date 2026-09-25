/**
 * COURSETO - Dashboard Logic
 * Handles session protection, dynamic user nickname & avatar initial,
 * notification bell popover, and user menu dropdown.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Session Protection: redirect if not logged in
  const currentUser = AuthService.requireAuth('index.html');
  if (!currentUser) return;

  // 2. Dynamic User Information
  const userNickname = currentUser.nickname || 'Student';
  const firstLetter = userNickname.charAt(0).toUpperCase();

  // Populate Nickname in Header (only on pages with dynamic greeting)
  const headerGreetingEl = document.querySelector('[data-dynamic-greeting="true"]');
  if (headerGreetingEl) {
    headerGreetingEl.textContent = `Welcome Back! ${userNickname}`;
  }

  // Populate Avatar Letter
  const userAvatarEl = document.getElementById('userAvatar');
  if (userAvatarEl) {
    userAvatarEl.textContent = firstLetter;
    userAvatarEl.setAttribute('title', `${currentUser.fullName || userNickname} (${currentUser.email || ''})`);
  }

  // Populate Dropdown Profile Info
  const menuUserNameEl = document.getElementById('menuUserName');
  const menuUserEmailEl = document.getElementById('menuUserEmail');
  if (menuUserNameEl) menuUserNameEl.textContent = currentUser.fullName || userNickname;
  if (menuUserEmailEl) menuUserEmailEl.textContent = currentUser.email || '';

  // 3. User Avatar Menu Toggle
  const userMenuDropdown = document.getElementById('userMenuDropdown');
  if (userAvatarEl && userMenuDropdown) {
    userAvatarEl.addEventListener('click', (e) => {
      e.stopPropagation();
      userMenuDropdown.classList.toggle('active');
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (!userMenuDropdown.contains(e.target) && e.target !== userAvatarEl) {
        userMenuDropdown.classList.remove('active');
      }
    });
  }

  // 4. Logout Handlers
  const logoutButtons = document.querySelectorAll('.action-logout');
  logoutButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      if (confirm('Are you sure you want to sign out?')) {
        AuthService.logout('index.html');
      }
    });
  });

  // 5. Notification Bell interaction
  const notifBell = document.getElementById('notificationBell');
  if (notifBell) {
    notifBell.addEventListener('click', () => {
      alert(`Notifications for ${userNickname}:\n• You have completed Lesson 7 of Web Development Fundamentals.\n• Next quiz is scheduled for tomorrow at 2:00 PM.`);
    });
  }

  // 6. Interactive buttons
  const continueButtons = document.querySelectorAll('.action-continue-course');
  continueButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      window.location.href = 'my-courses.html';
    });
  });
});

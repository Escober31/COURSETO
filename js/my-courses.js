/**
 * COURSETO - My Courses Logic
 * Dynamically updates page header to "Course Of: {Nickname}",
 * renders avatar initial, protects session, and manages interactions.
 */

document.addEventListener('DOMContentLoaded', () => {
  // 1. Session Protection: redirect if not logged in
  const currentUser = AuthService.requireAuth('index.html');
  if (!currentUser) return;

  // 2. Dynamic User Information
  const userNickname = currentUser.nickname || 'Student';
  const firstLetter = userNickname.charAt(0).toUpperCase();

  // Populate Nickname in Header ("Course Of: {Nickname}")
  const headerGreetingEl = document.getElementById('myCoursesHeaderTitle');
  if (headerGreetingEl) {
    headerGreetingEl.textContent = `Course Of: ${userNickname}`;
  }

  // Populate Avatar Initial
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
      alert(`Notifications for ${userNickname}:\n• You have 3 active courses in progress.\n• Keep up the great work!`);
    });
  }

  // 6. Course Button Handlers
  const continueButtons = document.querySelectorAll('.action-continue-lesson');
  continueButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      alert('Resuming Lesson 8: Modern JavaScript DOM Manipulation & Events.');
    });
  });

  const viewButtons = document.querySelectorAll('.action-view-course');
  viewButtons.forEach(btn => {
    btn.addEventListener('click', (e) => {
      const courseName = e.target.getAttribute('data-course') || 'Course';
      alert(`Opening ${courseName} syllabus and modules...`);
    });
  });
});

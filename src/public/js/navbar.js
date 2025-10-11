document.addEventListener('DOMContentLoaded', () => {
  const profileBtn = document.getElementById('profileBtn');
  const dropdown = document.getElementById('profileDropdown');

  if (profileBtn && dropdown) {
    profileBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const open = dropdown.hidden;
      dropdown.hidden = !open;
      profileBtn.setAttribute('aria-expanded', !open);
    });

    document.addEventListener('click', (e) => {
      if (!profileBtn.contains(e.target) && !dropdown.contains(e.target)) {
        dropdown.hidden = true;
        profileBtn.setAttribute('aria-expanded', false);
      }
    });
  }

  const logoutBtn = document.getElementById('logoutBtn');
  if (logoutBtn) {
    logoutBtn.addEventListener('click', async (e) => {
      e.preventDefault();
      try {
        localStorage.removeItem('cartId');
        await fetch('/api/sessions/logout', {
          method: 'POST',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' }
        });
      } catch (err) {
        console.error(err);
      }
      window.location.href = '/';
    });
  }
});
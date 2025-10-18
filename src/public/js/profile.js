// Maneja el envío del formulario de perfil y refresca la UI

document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("profileForm");
  const avatarPreview = document.getElementById("avatarPreview");

  if (!form) return;

  // Vista previa instantánea
  const avatarInput = document.getElementById("avatar");
  avatarInput?.addEventListener("change", (e) => {
    const file = e.target.files[0];
    if (file) avatarPreview.src = URL.createObjectURL(file);
  });

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const formData = new FormData(form);
    try {
      const res = await fetch("/api/users/profile", {
        method: "PUT",
        body: formData,
        credentials: "include",
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        alert(data.message || "Error al actualizar perfil");
        return;
      }

      // 🖼️ Actualizar avatar en navbar
      if (data.user.avatar) {
        const navbarAvatar = document.querySelector(".navbar-avatar");
        const navbarInitials = document.querySelector(".navbar-initials");

        if (navbarAvatar) {
          navbarAvatar.src = data.user.avatar + "?t=" + Date.now();
          navbarAvatar.style.display = "block";
        }

        if (navbarInitials) navbarInitials.style.display = "none";
      }

      // 👤 Actualizar inputs visibles
      form.querySelector('[name="first_name"]').value = data.user.first_name;
      form.querySelector('[name="last_name"]').value = data.user.last_name;
      form.querySelector('[name="email"]').value = data.user.email;
      form.querySelector('[name="age"]').value = data.user.age || "";

      alert("Perfil actualizado correctamente ✅");

      // Refrescar cookie/token visualmente
      setTimeout(() => window.location.reload(), 500);
    } catch (err) {
      console.error("Error al actualizar perfil:", err);
      alert("Error al actualizar perfil");
    }
  });
});

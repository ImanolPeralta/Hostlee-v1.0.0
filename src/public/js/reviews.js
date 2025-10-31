document.addEventListener("DOMContentLoaded", async () => {
  const productId = document.querySelector(".add-to-cart")?.dataset?.productId;
  const reviewsContainer = document.getElementById("reviewsContainer");
  const reviewForm = document.getElementById("reviewForm");

  // ======================
  // 1️⃣ Cargar reseñas existentes
  // ======================
  async function loadReviews() {
    try {
      const res = await fetch(`/api/reviews/${productId}`);
      const reviews = await res.json();

      reviewsContainer.innerHTML = "";

      if (!reviews.length) {
        reviewsContainer.innerHTML = `<p class="no-reviews">Todavía no hay reseñas. Sé el primero en opinar.</p>`;
        return;
      }

      reviews.forEach((r) => {
        const userAvatar = r.user?.avatar || "/img/default-avatar.png";
        const userName = `${r.user?.first_name || "Usuario"} ${
          r.user?.last_name || ""
        }`.trim();
        const formattedDate = new Date(r.createdAt).toLocaleDateString();

        const div = document.createElement("div");
        div.classList.add("review-item");
        div.innerHTML = `
          <div class="review-header">
            <img src="${userAvatar}" alt="Avatar de ${userName}" class="review-avatar"/>
            <div>
              <strong>${userName}</strong>
              <p class="review-date">${formattedDate}</p>
            </div>
          </div>
          <p class="review-comment">"${r.comment}"</p>
        `;
        reviewsContainer.appendChild(div);
      });
    } catch (err) {
      console.error("Error cargando reseñas:", err);
      reviewsContainer.innerHTML = `<p class="error">Error al cargar reseñas.</p>`;
    }
  }

  await loadReviews();

  // ======================
  // 2️⃣ Enviar nueva reseña
  // ======================
  if (reviewForm) {
    reviewForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const comment = document.getElementById("reviewComment").value.trim();

      if (!comment) return;

      try {
        const res = await fetch("/api/reviews", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ productId, comment }),
        });

        if (res.ok) {
          document.getElementById("reviewComment").value = "";
          await loadReviews();
        } else {
          const error = await res.json();
          alert(error.error || "No se pudo enviar la reseña");
        }
      } catch (err) {
        console.error("Error enviando reseña:", err);
      }
    });
  }
});

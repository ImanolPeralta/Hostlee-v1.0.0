document.addEventListener("DOMContentLoaded", async () => {
  const productId = document.querySelector(".add-to-cart")?.dataset?.productId;
  const reviewsContainer = document.getElementById("reviewsContainer");
  const reviewForm = document.getElementById("reviewForm");
  const ratingContainer = document.createElement("div");
  ratingContainer.classList.add("rating-section");

  document
    .querySelector(".reviews-section")
    .insertAdjacentElement("beforebegin", ratingContainer);

  // ======================
  // 🔸 Cargar reseñas y promedio
  // ======================
  async function loadReviews() {
    try {
      const res = await fetch(`/api/reviews/${productId}`);
      const { reviews, avgRating } = await res.json();

      // Mostrar rating promedio arriba
      ratingContainer.innerHTML = renderAverageRating(avgRating);

      // Reseñas
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
          ${
            r.rating
              ? `<div class="user-rating">${renderStars(r.rating)}</div>`
              : ""
          }
          <p class="review-comment">"${r.comment || ""}"</p>
        `;
        reviewsContainer.appendChild(div);
      });
    } catch (err) {
      console.error("Error cargando reseñas:", err);
      reviewsContainer.innerHTML = `<p class="error">Error al cargar reseñas.</p>`;
    }
  }

  // ======================
  // 🔸 Render promedio de estrellas
  // ======================
  function renderAverageRating(avg) {
    if (!avg) return `<p class="no-rating">Sin puntuaciones aún</p>`;

    const stars = renderStars(Math.round(avg));
    return `
      <div class="average-rating">
        <h3>Puntuación del alojamiento</h3>
        <div class="stars">${stars}</div>
        <p class="avg-number">${avg} / 5</p>
      </div>
      ${window.userLoggedIn ? renderRatingForm() : ""}
    `;
  }

  // ======================
  // 🔸 Render de estrellas dinámicas
  // ======================
  function renderStars(count) {
    let stars = "";
    for (let i = 1; i <= 5; i++) {
      stars += `<i class="fa-solid fa-star${i <= count ? " filled" : ""}"></i>`;
    }
    return stars;
  }

  // ======================
  // 🔸 Formulario de puntuación
  // ======================
  function renderRatingForm() {
    return `
      <div class="rating-form">
        <p>Puntuar alojamiento:</p>
        <div class="star-input">
          ${[1, 2, 3, 4, 5]
            .map((i) => `<i class="fa-regular fa-star" data-value="${i}"></i>`)
            .join("")}
        </div>
      </div>
    `;
  }

  // ======================
  // 🔸 Enviar rating
  // ======================
  ratingContainer.addEventListener("click", async (e) => {
    if (!e.target.matches(".star-input i")) return;
    const rating = e.target.dataset.value;

    try {
      const res = await fetch(`/api/reviews/${productId}/rating`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ rating }),
      });

      if (res.ok) {
        await loadReviews();
      } else {
        const error = await res.json();
        alert(error.error || "No se pudo enviar la puntuación");
      }
    } catch (err) {
      console.error("Error enviando puntuación:", err);
    }
  });

  // ======================
  // 🔸 Enviar nueva reseña
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

  await loadReviews();
});

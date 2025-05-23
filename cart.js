let cart = JSON.parse(localStorage.getItem('cart')) || [];

function renderCart() {
  const cartItemsDiv = document.getElementById('cart-items');
  if (cart.length === 0) {
    cartItemsDiv.innerHTML = '<p class="empty-message">🛒 Your cart is empty.</p>';
    localStorage.removeItem('cart');
    return;
  }

  let cartHTML = '';

  cart.forEach((item, index) => {
    cartHTML += `
      <div class="cart-item" data-index="${index}">
        <span class="delete-icon" onclick="deleteItem(${index})"><i class="bi bi-trash3-fill"></i></span>
        <div class="cart-left">
          <h4>Item ${index + 1}</h4>
          <p><strong>Product:</strong> ${item.type}</p>
          <p><strong>Size:</strong> ${item.size}</p>
          <p><strong>Design:</strong> ${item.design}</p>
          <p><strong>Quantity:</strong> ${item.quantity}</p>
          <p><strong>Color:</strong> ${item.color}${item.colorSpecify ? ` (${item.colorSpecify})` : ''}</p>
          <p><strong>Description:</strong> ${item.description || 'N/A'}</p>
          <p><strong>Total:</strong> P${item.totalCost}</p>

          <div class="progress-container">
            <span class="progress-status" id="status-${index}">Status: Pending</span>
            <button class="confirm-button" onclick="markAsDelivered(${index})">Mark as Delivered</button>
          </div>
        </div>

        <div class="comment-box">
          <label for="comment-${index}">Comment</label>
          <input type="text" id="comment-${index}" placeholder="Feedback about the order" />
          <label for="rating-${index}">Rating (out of 5)</label>
          <select id="rating-${index}">
            <option value="">Select</option>
            <option value="1">⭐ </option>
            <option value="2">⭐⭐ </option>
            <option value="3">⭐⭐⭐ </option>
            <option value="4">⭐⭐⭐⭐ </option>
            <option value="5">⭐⭐⭐⭐⭐ </option>
          </select>
          <button class="send-button" id="send-btn-${index}" onclick="sendComment(${index})">Send</button>
          <div class="sent-message" id="sent-msg-${index}" style="display:none;">✅ Feedback for this product already sent.</div>
        </div>
      </div>
    `;
  });

  cartItemsDiv.innerHTML = cartHTML;
}

function deleteItem(index) {
  cart.splice(index, 1);
  localStorage.setItem('cart', JSON.stringify(cart));
  renderCart();
}

function markAsDelivered(index) {
  const statusEl = document.getElementById('status-' + index);
  if (statusEl) {
    statusEl.textContent = 'Status: Delivered';
    statusEl.classList.add('delivered');
  }
}

function sendComment(index) {
  const commentInput = document.getElementById('comment-' + index);
  const ratingSelect = document.getElementById('rating-' + index);
  const sendBtn = document.getElementById('send-btn-' + index);
  const messageDiv = document.getElementById('sent-msg-' + index);

  const comment = commentInput?.value.trim();
  const rating = ratingSelect?.value;

  if (!comment || !rating) {
    alert("Please enter a comment and select a rating before sending.");
    return;
  }

  const number = '26773684840';
  const message = `Hello, I am leaving feedback on Item ${index + 1}:\n\nComment: "${comment}"\nRating: ${rating} out of 5`;

  const url = `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
  window.open(url, '_blank');

  commentInput.disabled = true;
  ratingSelect.disabled = true;
  sendBtn.disabled = true;
  messageDiv.style.display = 'block';
}

document.addEventListener('DOMContentLoaded', renderCart);

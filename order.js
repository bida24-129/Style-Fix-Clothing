document.addEventListener('DOMContentLoaded', function() {
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    menuToggle.addEventListener('click', function() {
        nav.classList.toggle('active');
        this.classList.toggle('active');
    });
});
  const sizeOptions = {
    "T-shirt": ["X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large"],
    "Hoodie": ["X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large"],
    "Sweater": ["X-Small", "Small", "Medium", "Large", "X-Large", "XX-Large"],
    "Cap": ["Small", "Medium", "Large"],
    "Cup": [],
    "Bucket-Hat": ["Small", "Medium", "Large"],
    "Pouche": [],
    "Cushion": [],
    "Bag": []
  };

  const designOptions = {
    "T-shirt": ["Pocket", "A4", "A3"],
    "Hoodie": ["Pocket", "A4", "A3"],
    "Sweater": ["Pocket", "A4", "A3"],
    "Cap": ["Pocket"],
    "Cup": ["Pocket"],
    "Bucket-Hat": ["Pocket"],
    "Pouche": ["A6"],
    "Cushion": ["A4", "A3"],
    "Bag": ["A4"]
  };

  const priceTable = {
    "T-shirt": { "Pocket": 100, "A4": 120, "A3": 140 },
    "Hoodie": { "Pocket": 280, "A4": 320, "A3": 340 },
    "Sweater": { "Pocket": 200, "A4": 220, "A3": 240 },
    "Cushion": { "A4": 100 },
    "Pouche": { "A6": 70 },
    "Cap": { "Pocket": 90 },
    "Cup": { "Pocket": 100 },
    "Bucket-Hat": { "Pocket": 110 },
    "Bag": { "A4": 150 }
  };

  document.getElementById('type').addEventListener('change', function () {
    const selectedType = this.value;
    const sizeSelect = document.getElementById('size');
    sizeSelect.innerHTML = '';
    if (sizeOptions[selectedType].length > 0) {
      sizeOptions[selectedType].forEach(size => {
        const option = document.createElement('option');
        option.value = size;
        option.textContent = size;
        sizeSelect.appendChild(option);
      });
      sizeSelect.disabled = false;
    } else {
      const option = document.createElement('option');
      option.value = '';
      option.textContent = 'N/A';
      sizeSelect.appendChild(option);
      sizeSelect.disabled = true;
    }

    const designSelect = document.getElementById('design');
    designSelect.innerHTML = '';
    designOptions[selectedType].forEach(design => {
      const option = document.createElement('option');
      option.value = design;
      option.textContent = design;
      designSelect.appendChild(option);
    });
  });

  function toggleColorSpecify(value) {
    const colorSpecify = document.getElementById('colorSpecify');
    if (value === 'Specify') {
      colorSpecify.style.display = 'block';
    } else {
      colorSpecify.style.display = 'none';
      document.getElementById('color_specify').value = "";
    }
  }

  function calculateTotalCost(productType, designSize, quantity) {
    let unitPrice = priceTable[productType]?.[designSize];
    if (!unitPrice) return null;
    let total = unitPrice * quantity;
    if (quantity >= 10) total *= 0.95;
    return total;
  }

  function sendToWhatsapp(name, email, phone, address, type, size, design, quantity, description, color, colorSpecify) {
    let number = '26773684840';
    let url = "https://wa.me/" + number + "?text=" +
      "Hello, I would like to place an order for the following items:\n\n" +
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}\nProduct Type: ${type}\nProduct Size: ${size}\nDesign Size: ${design}\nQuantity: ${quantity}\nDescription: ${description}\nColor: ${color}` +
      (color === 'Specify' ? `\nSpecify Color: ${colorSpecify}` : "") + "\n\nThank you!";
    window.open(url, '_blank');
  }

  async function handleOrder(event) {
    event.preventDefault();

    let name = document.getElementById('name').value;
    let email = document.getElementById('email').value;
    let phone = document.getElementById('phone').value;
    let address = document.getElementById('address').value;
    let type = document.getElementById('type').value;
    let size = document.getElementById('size').value;
    let design = document.getElementById('design').value;
    let quantity = parseInt(document.getElementById('quantity').value);
    let description = document.getElementById('description').value;
    let color = document.getElementById('color').value;
    let colorSpecify = document.getElementById('color_specify').value;

    let totalCost = calculateTotalCost(type, design, quantity);
    if (totalCost === null) {
      alert("Invalid product type or design size.");
      return;
    }

    let item = {
      type, size, design, quantity, description, color,
      colorSpecify, totalCost: totalCost.toFixed(2)
    };
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));

    alert(`Total Cost: P${totalCost.toFixed(2)}${quantity >= 10 ? " (5% discount applied!)" : ""}`);

    sendToWhatsapp(name, email, phone, address, type, size, design, quantity, description, color, colorSpecify);

    try {
      let response = await fetch('customer_ordr.php', {
        method: 'POST',
        body: JSON.stringify({
          name, email, phone, address, type, size, design,
          quantity, description, color, colorSpecify
        }),
        headers: { 'Content-Type': 'application/json' }
      });

      let result = await response.json();
      document.getElementById('responseMessage').textContent = result.message;
    } catch (error) {
      document.getElementById('responseMessage').textContent = 'Error submitting the order.';
    }
  }

  function showOrderForm() {
    document.body.classList.add('popup-open');
    document.getElementById('orderForm').style.display = 'block';
  }

  function hideOrderForm() {
    document.body.classList.remove('popup-open');
    document.getElementById('orderForm').style.display = 'none';
  }

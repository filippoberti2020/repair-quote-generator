document.addEventListener('DOMContentLoaded', function () {
  // Fetch data from JSON file
  fetch('brands.json')
    .then(response => response.json())
    .then(data => {
      // Populate brand dropdown
      const brandSelect = document.getElementById('brandSelect');
      data.brands.forEach((brand, index) => {
        const option = document.createElement('option');
        option.value = index;
        option.text = brand;
        brandSelect.appendChild(option);
      });

      // Add event listener for brand selection
      brandSelect.addEventListener('change', function () {
        const selectedBrandIndex = this.value;
        const selectedBrand = data.brands[selectedBrandIndex];

        // Enable the model dropdown and populate it with models based on the selected brand
        const modelSelect = document.getElementById('modelSelect');
        modelSelect.innerHTML = ''; // Clear previous options

        if (selectedBrand) {
          const models = getModelsForBrand(selectedBrand);
          models.forEach((model, index) => {
            const option = document.createElement('option');
            option.value = index;
            option.text = model;
            modelSelect.appendChild(option);
          });

          // Enable the model dropdown
          modelSelect.disabled = false;
        } else {
          // Disable the model dropdown if no brand is selected
          modelSelect.disabled = true;
        }
      });
    })
    .catch(error => console.error('Error fetching data:', error));

  // Function to get models based on the selected brand (you can customize this function)
  function getModelsForBrand(brand) {
    // For simplicity, returning a dummy array of models. You can replace this with your own logic.
    return ["Model1", "Model2", "Model3"];
  }
});


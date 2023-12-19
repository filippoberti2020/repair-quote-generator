document.addEventListener('DOMContentLoaded', function () {
  const brandsSelect = document.getElementById('brandSelect');
  const modelsSelect = document.getElementById('modelSelect');
  const repairsSelect = document.getElementById('repairSelect');

  // Load brands from the JSON
  fetch('brands.json')
    .then(response => response.json())
    .then(data => {
      // Populate brand select options
      data.brands.forEach(brand => {
        const option = document.createElement('option');
        option.value = brand;
        option.text = brand;
        brandsSelect.add(option);
      });

      // Event listener for brand selection
      brandsSelect.addEventListener('change', function () {
        const selectedBrand = this.value;

        // Load models for the selected brand from the JSON
        fetch('models.json')
          .then(response => response.json())
          .then(modelsData => {
            // Clear previous models
            modelsSelect.innerHTML = '';
            repairsSelect.innerHTML = ''; // Clear repairs when changing brand

            // Populate model select options
            modelsData[selectedBrand].forEach(model => {
              const option = document.createElement('option');
              option.value = model;
              option.text = model;
              modelsSelect.add(option);
            });

            // Enable the model select
            modelsSelect.disabled = false;
          })
          .catch(error => console.error('Error fetching models data:', error));
      });

      // Event listener for model selection
      modelsSelect.addEventListener('change', function () {
        const selectedModel = this.value;

        // Load repairs for the selected model from the JSON
        fetch('repairs.json')
          .then(response => response.json())
          .then(repairsData => {
            // Clear previous repairs
            repairsSelect.innerHTML = '';

            // Populate repair select options
            repairsData[selectedModel].forEach(repair => {
              const option = document.createElement('option');
              option.value = repair.name;
              option.text = repair.name + ' - $' + repair.price;
              repairsSelect.add(option);
            });

            // Enable the repair select
            repairsSelect.disabled = false;
          })
          .catch(error => console.error('Error fetching repairs data:', error));
      });
    })
    .catch(error => console.error('Error fetching brands data:', error));
});


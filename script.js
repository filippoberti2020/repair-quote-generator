document.addEventListener('DOMContentLoaded', function () {
  const brandsSelect = document.getElementById('brandSelect');
  const modelsSelect = document.getElementById('modelSelect');
 const repairsContainer = document.getElementById('repairsContainer'); // Add this line


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
             if (!modelsSelect.disabled) {
	        modelsSelect.innerHTML = '';
	        repairsSelect.innerHTML = ''; // Clear repairs when changing brand
 		}

            // Populate model select options
            modelsData[selectedBrand].forEach(model => {
		        const option = document.createElement('option');
		        option.value = model;
		        option.text = model;
		        modelsSelect.add(option);
		        });

            // Enable the model select
            modelsSelect.disabled = false;
            modelsSelect.selectedIndex = -1; // Add this line to reset the selected index
            modelsSelect.dispatchEvent(new Event('change')); // Trigger change event to update repairs select
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
            // Clear previous repairs text
            repairsContainer.textContent = '';

            // Display repairs text
            repairsData[selectedModel].forEach(repair => {
              const repairText = `${repair.name} - $${repair.price}`;
              const repairTextNode = document.createTextNode(repairText);
              repairsContainer.appendChild(repairTextNode);

              // Add a line break after each repair text
              const lineBreak = document.createElement('br');
              repairsContainer.appendChild(lineBreak);
            });
          })
          .catch(error => console.error('Error fetching repairs data:', error));
      });
    })
    .catch(error => console.error('Error fetching brands data:', error));
});

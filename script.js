document
  .getElementById("bloodGroupForm")
  .addEventListener("submit", async (event) => {
    event.preventDefault(); // Prevent form from refreshing the page

    // Get values from form inputs
    const name = document.getElementById("name").value;
    const bloodGroup = document.getElementById("bloodGroup").value;

    try {
      // Send data to the backend
      const response = await fetch("http://localhost:5000/api/addData", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, bloodGroup }), // Send data as JSON
      });

      // Check if the response is successful
      if (response.ok) {
        alert("Data submitted successfully!");
      } else {
        alert("Failed to submit data");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("An error occurred while submitting data");
    }
  });

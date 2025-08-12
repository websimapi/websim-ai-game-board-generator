document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('board-form');
    const input = document.getElementById('board-description');
    const inputContainer = document.getElementById('input-container');
    const loadingContainer = document.getElementById('loading-container');
    const boardContainer = document.getElementById('board-container');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        const description = input.value.trim();
        if (!description) return;

        // Hide input form and show loader
        inputContainer.classList.add('hidden');
        loadingContainer.classList.remove('hidden');

        try {
            // Construct a detailed prompt for better results
            const prompt = `A top-down view of a fantasy board game map based on: "${description}". High detail, vibrant colors, epic fantasy style.`;
            
            const result = await websim.imageGen({
                prompt: prompt,
                aspect_ratio: "1:1" // Game boards are often square
            });

            if (result.url) {
                const img = document.createElement('img');
                img.onload = () => {
                    // Hide loader and show board once the image is loaded
                    loadingContainer.classList.add('hidden');
                    boardContainer.classList.remove('hidden');
                };
                img.onerror = () => {
                    throw new Error('Image failed to load.');
                };
                img.src = result.url;
                img.alt = `Game board of ${description}`;
                boardContainer.innerHTML = ''; // Clear previous board if any
                boardContainer.appendChild(img);
            } else {
                throw new Error('Image generation did not return a URL.');
            }

        } catch (error) {
            console.error('Error generating game board:', error);
            // Re-show input so user can try again
            loadingContainer.classList.add('hidden');
            inputContainer.classList.remove('hidden');
            // Provide feedback to the user
            alert('Sorry, there was an error generating your game board. Please try again.');
        }
    });
});


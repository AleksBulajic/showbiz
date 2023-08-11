import React, { useState, useEffect } from "react";


export default function App() {
  const [loading, setLoading] = useState(true); // State to track loading state
  const [error, setError] = useState(false); // State to track errors
  const [flagText, setFlagText] = useState(""); // State to store the flag text
  const [charIndex, setCharIndex] = useState(0); // State to track the index of the character being displayed

  // Effect to fetch the flag URL and load the flag text
  useEffect(() => {
    // Replace with the actual URL obtained in step 2
    const flagApiUrl =
      "https://wgg522pwivhvi5gqsn675gth3q0otdja.lambda-url.us-east-1.on.aws/73686f";

    // Function to fetch the flag URL
    const fetchFlagUrl = async () => {
      try {
        const response = await fetch(flagApiUrl);
        if (response.ok) {
          const responseData = await response.text(); // Read the response as text
          if (responseData === "showbiz") {
            setFlagText(responseData); // Update the flag text
          } else {
            setError(true); // Handle other non-"showbiz" content
          }
        } else {
          setError(true); // Handle other errors
        }
      } catch (error) {
        console.error("An error occurred while fetching flag data.", error);
        setError(true); // Handle errors
      } finally {
        setLoading(false); // Set loading to false when request is complete
      }
    };

    // Call the function to fetch the flag URL and load the flag text
    fetchFlagUrl();
  }, []); // Empty dependency array ensures the effect runs only once

  // Effect to control the typewriter animation
  useEffect(() => {
    if (!loading && !error) {
      // Start the animation when the flag text is loaded and no errors
      const intervalId = setInterval(() => {
        // Update the character index to display the next character
        setCharIndex((prevIndex) => {
          if (prevIndex < flagText.length - 1) {
            return prevIndex + 1;
          }
          // Stop the animation when all characters are displayed
          clearInterval(intervalId);
          return prevIndex;
        });
      }, 500); // Half-second delay between each character
      return () => {
        // Cleanup: clear the interval when the component unmounts or when the animation is done
        clearInterval(intervalId);
      };
    }
  }, [loading, error, flagText]);

  return (
    <div className="App">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Failed to load flag.</p>
      ) : flagText ? (
        <ul>
          {flagText.split("").map((char, index) => (
            <li
              key={index}
              style={{ display: charIndex >= index ? "inline-block" : "none" }}
            >
              {char}
            </li>
          ))}
        </ul>
      ) : (
        <p>No flag available.</p>
      )}
    </div>
  );
}

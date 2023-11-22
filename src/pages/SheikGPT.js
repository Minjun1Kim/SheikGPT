import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import 'bootstrap/dist/css/bootstrap.min.css';

const StyledContainer = styled.div`
  background-color: #121212;
  color: #ffffff;
  padding: 20px;
  border-radius: 10px;
  max-width: 600px;
  margin: 0 auto;
  margin-top: 50px;
`;

const StyledTextArea = styled.textarea`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
`;

const StyledButton = styled.button`
  background-color: #61dafb;
  color: #fff;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #4fa3d1;
  }
`;

const SheikGPT = () => {
    const [prompt, setPrompt] = useState('');
    const [response, setResponse] = useState('');
  
    const handlePromptChange = (e) => {
      setPrompt(e.target.value);
    };
  
    const handleGenerateResponse = async () => {
      try {
        const apiKey = process.env.REACT_APP_OPENAI_API_KEY;
        const apiUrl = 'https://api.openai.com/v1/engines/davinci/completions';
  
        const requestBody = {
          prompt: prompt,
          max_tokens: 100,
        };
  
        const response = await axios.post(apiUrl, requestBody, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${apiKey}`,
          },
        });
  
        setResponse(response.data.choices[0].text.trim());
      } catch (error) {
        console.error('Error generating response:', error);
        setResponse('Error generating response'); // Update response state in case of an error
      }
    };
  
    return (
      <StyledContainer>
        <h1>SheikhGPT - Islamic Q&A</h1>
        <StyledTextArea
          placeholder="Enter your Islamic question..."
          value={prompt}
          onChange={handlePromptChange}
        />
        <StyledButton onClick={handleGenerateResponse}>Get Response</StyledButton>
        <div>
          <strong>Response:</strong>
          <p>{response}</p>
        </div>
      </StyledContainer>
    );
  };
  
export default SheikGPT;

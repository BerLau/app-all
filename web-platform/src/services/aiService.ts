import type { ModelType, LLMModel } from '../types';

const SIMULATED_AI_DELAY = 1000;

export const availableModels: LLMModel[] = [
  {
    id: 'simulated',
    name: 'Simulated AI (Demo)',
    provider: 'local'
  },
  {
    id: 'deepseek',
    name: 'DeepSeek',
    provider: 'deepseek'
  }
];

// AI service supporting multiple LLM providers
export class AIService {
  private static instance: AIService;
  private currentModel: ModelType = 'simulated';

  private constructor() {}

  static getInstance(): AIService {
    if (!AIService.instance) {
      AIService.instance = new AIService();
    }
    return AIService.instance;
  }

  setModel(model: ModelType): void {
    this.currentModel = model;
  }

  getCurrentModel(): ModelType {
    return this.currentModel;
  }

  async generateCode(prompt: string, language: string): Promise<string> {
    if (this.currentModel === 'deepseek') {
      return this.generateCodeWithDeepSeek(prompt, language);
    }
    return this.generateCodeSimulated(prompt, language);
  }

  private async generateCodeWithDeepSeek(prompt: string, language: string): Promise<string> {
    try {
      // Call backend API proxy instead of DeepSeek directly
      const response = await fetch('/api/generate-code', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          prompt,
          language
        })
      });

      if (!response.ok) {
        const errorData = await response.json();
        // If backend indicates fallback should be used
        if (errorData.fallback) {
          console.warn('Backend API not available or configured. Using simulated mode.');
          return this.generateCodeSimulated(prompt, language);
        }
        throw new Error(`API error: ${response.statusText}`);
      }

      const data = await response.json();
      return data.code || '';
    } catch (error) {
      console.error('Error calling backend API:', error);
      // Fallback to simulated mode on error
      return this.generateCodeSimulated(prompt, language);
    }
  }

  private async generateCodeSimulated(prompt: string, language: string): Promise<string> {
    // Simulate AI processing
    await new Promise(resolve => setTimeout(resolve, SIMULATED_AI_DELAY));

    // Simple code generation based on keywords in the prompt
    const lowerPrompt = prompt.toLowerCase();

    if (language === 'javascript' || language === 'typescript') {
      if (lowerPrompt.includes('hello world') || lowerPrompt.includes('hello')) {
        return `function helloWorld() {
  console.log('Hello, World!');
}

helloWorld();`;
      }
      if (lowerPrompt.includes('button') || lowerPrompt.includes('click')) {
        return `// Create a button with click handler
const button = document.createElement('button');
button.textContent = 'Click Me';
button.addEventListener('click', () => {
  console.log('Button clicked!');
});
document.body.appendChild(button);`;
      }
      if (lowerPrompt.includes('fetch') || lowerPrompt.includes('api')) {
        return `// Fetch data from an API
async function fetchData(url) {
  try {
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// Example usage
fetchData('https://api.example.com/data');`;
      }
      if (lowerPrompt.includes('component') || lowerPrompt.includes('react')) {
        return `import React, { useState } from 'react';

function MyComponent() {
  const [count, setCount] = useState(0);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </div>
  );
}

export default MyComponent;`;
      }
    }

    if (language === 'python') {
      if (lowerPrompt.includes('hello world') || lowerPrompt.includes('hello')) {
        return `def hello_world():
    print("Hello, World!")

if __name__ == "__main__":
    hello_world()`;
      }
      if (lowerPrompt.includes('class') || lowerPrompt.includes('object')) {
        return `class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age
    
    def greet(self):
        return f"Hello, my name is {self.name} and I'm {self.age} years old."

# Example usage
person = Person("John", 30)
print(person.greet())`;
      }
    }

    if (language === 'html') {
      if (lowerPrompt.includes('form') || lowerPrompt.includes('input')) {
        return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Form Example</title>
</head>
<body>
    <form id="myForm">
        <label for="name">Name:</label>
        <input type="text" id="name" name="name" required>
        
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
        
        <button type="submit">Submit</button>
    </form>
</body>
</html>`;
      }
      return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>My Page</title>
</head>
<body>
    <h1>Welcome</h1>
    <p>This is a sample HTML page.</p>
</body>
</html>`;
    }

    // Default response
    return `// AI-generated code for: ${prompt}
// Language: ${language}

// Your code will appear here based on your voice command
console.log("Processing your request...");`;
  }

  async explainCode(code: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, SIMULATED_AI_DELAY));

    if (!code.trim()) {
      return "No code to explain. Please provide some code first.";
    }

    return `This code appears to be a ${this.detectLanguage(code)} snippet. 
It contains approximately ${code.split('\n').length} lines of code.
The code structure suggests it's implementing functionality for handling user interactions.`;
  }

  async improveCode(code: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, SIMULATED_AI_DELAY));

    if (!code.trim()) {
      return code;
    }

    // Simple improvements (in production, AI would actually analyze and improve)
    let improved = code;
    improved = improved.replace(/var /g, 'const ');
    improved = improved.replace(/console\.log/g, 'console.info');
    
    return `// AI-improved code
${improved}`;
  }

  private detectLanguage(code: string): string {
    if ((code.includes('def ') || code.includes('import ')) && code.includes(':')) {
      return 'Python';
    }
    if (code.includes('function') || code.includes('const') || code.includes('let')) {
      return 'JavaScript';
    }
    if (code.includes('<!DOCTYPE') || code.includes('<html')) {
      return 'HTML';
    }
    if (code.includes('#include') || code.includes('int main')) {
      return 'C/C++';
    }
    return 'Unknown';
  }
}

export default AIService.getInstance();

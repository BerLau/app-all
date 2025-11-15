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

    if (lowerPrompt.includes('hello world') || lowerPrompt.includes('hello')) {
      return `void main() {
  print('Hello, World!');
}`;
    }
    
    if (lowerPrompt.includes('stateless') || lowerPrompt.includes('widget')) {
      return `import 'package:flutter/material.dart';

class MyWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      child: Text('Hello from Flutter!'),
    );
  }
}`;
    }
    
    if (lowerPrompt.includes('stateful') || lowerPrompt.includes('counter')) {
      return `import 'package:flutter/material.dart';

class CounterWidget extends StatefulWidget {
  @override
  _CounterWidgetState createState() => _CounterWidgetState();
}

class _CounterWidgetState extends State<CounterWidget> {
  int _counter = 0;

  void _incrementCounter() {
    setState(() {
      _counter++;
    });
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Counter App'),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Text('Counter: $_counter'),
            SizedBox(height: 20),
            ElevatedButton(
              onPressed: _incrementCounter,
              child: Text('Increment'),
            ),
          ],
        ),
      ),
    );
  }
}`;
    }
    
    if (lowerPrompt.includes('button') || lowerPrompt.includes('onpressed')) {
      return `import 'package:flutter/material.dart';

ElevatedButton(
  onPressed: () {
    print('Button clicked!');
  },
  child: Text('Click Me'),
)`;
    }
    
    if (lowerPrompt.includes('listview') || lowerPrompt.includes('list')) {
      return `import 'package:flutter/material.dart';

ListView.builder(
  itemCount: 10,
  itemBuilder: (context, index) {
    return ListTile(
      leading: Icon(Icons.star),
      title: Text('Item ${'$'}{index + 1}'),
      subtitle: Text('Description for item ${'$'}{index + 1}'),
    );
  },
)`;
    }

    if (lowerPrompt.includes('form') || lowerPrompt.includes('textfield')) {
      return `import 'package:flutter/material.dart';

class MyForm extends StatefulWidget {
  @override
  _MyFormState createState() => _MyFormState();
}

class _MyFormState extends State<MyForm> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    return Form(
      key: _formKey,
      child: Column(
        children: [
          TextFormField(
            controller: _nameController,
            decoration: InputDecoration(labelText: 'Name'),
            validator: (value) {
              if (value == null || value.isEmpty) {
                return 'Please enter your name';
              }
              return null;
            },
          ),
          ElevatedButton(
            onPressed: () {
              if (_formKey.currentState!.validate()) {
                print('Form is valid: ${'$'}{_nameController.text}');
              }
            },
            child: Text('Submit'),
          ),
        ],
      ),
    );
  }

  @override
  void dispose() {
    _nameController.dispose();
    super.dispose();
  }
}`;
    }

    // Default response
    return `// AI-generated Dart code for: ${prompt}
// All code is written with Flutter (Dart)

void main() {
  print('Processing your request...');
}`;
  }

  async explainCode(code: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, SIMULATED_AI_DELAY));

    if (!code.trim()) {
      return "No code to explain. Please provide some code first.";
    }

    return `This code appears to be a Dart snippet. 
It contains approximately ${code.split('\n').length} lines of code.
The code structure suggests it's implementing functionality for a Flutter application.`;
  }

  async improveCode(code: string): Promise<string> {
    await new Promise(resolve => setTimeout(resolve, SIMULATED_AI_DELAY));

    if (!code.trim()) {
      return code;
    }

    // Simple Dart-specific improvements (in production, AI would actually analyze and improve)
    let improved = code;
    
    // Add Flutter import if missing and code contains Flutter widgets
    // Use regex to check for import with flexible formatting
    const hasFlutterImport = /import\s+['"]package:flutter\/material\.dart['"]/i.test(improved);
    const hasFlutterWidgets = /\b(Widget|StatelessWidget|StatefulWidget|MaterialApp|Scaffold)\b/.test(improved);
    
    if (!hasFlutterImport && hasFlutterWidgets) {
      improved = 'import \'package:flutter/material.dart\';\n\n' + improved;
    }
    
    return `// AI-improved code
${improved}`;
  }
}

export default AIService.getInstance();

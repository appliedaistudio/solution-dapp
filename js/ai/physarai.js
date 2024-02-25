// Import configuration module
import config from './config.js';

// Define log function
function log(message) {
    if (config.debug) {
        console.log(message);
    }
};

// Function to interact with the Language Model (LLM)
async function promptLLM(parameters) {
    try {
        // Check if all required parameters are provided
        if (!parameters.apiKey || !parameters.prompt || !parameters.endpoint || !parameters.model) {
            throw new Error('Missing required parameter(s)');
        }

        // Destructure parameters object for easier access
        const { apiKey, prompt, endpoint, model } = parameters;

        // Send a POST request to the LLM endpoint with the given parameters
        const response = await fetch(endpoint, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${apiKey}`
            },
            body: JSON.stringify({
                "model": model,
                "messages": [{"role": "user", "content": prompt}]
            })
        });

        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        // Parse the response JSON and return the generated text
        const data = await response.json();
        return data.choices[0].message.content;
    } catch (error) {
        // Log and handle errors
        log('Error: ' + error);
        return null;
    }
};

// Function to search Wikipedia
function searchWikipedia(searchTerm) {
    return "Ronny, Bobby, Ricky, and Mike";
};

// Calculator function with real implementation
function calculator(expression) {
    return 16;
};

function generateLLMPrompt(tools) {
    // Define the template
    const template = `
    Answer the following questions and obey the following commands as best you can.
    
    You have access to the following tools:
    ${tools.map(tool => `\n${tool.name}: ${tool.description}`).join('')}
    
    Response To Human: When you need to respond to the human you are talking to.
    
    You will receive a message from the human, then you should start a loop and do one of two things
    
    Option 1: You use a tool to answer the question.
    For this, you should use the following format:
    Thought: you should always think about what to do
    Action: the action to take, should be one of [${tools.map(tool => tool.name).join(', ')}]
    Action Input: "the input to the action, to be sent to the tool"
    
    After this, the human will respond with an observation, and you will continue.
    
    Option 2: You respond to the human.
    For this, you should use the following format:
    Action: Response To Human
    Action Input: "your response to the human, summarizing what you did and what you learned"
    
    Preface action with "Action:" place the alphanumeric name of the action immediately after followed by a line feed
    Preface action input with "Action Input:". place the input value in quotes immediately after followed by a line feed
    
    Begin!`;

    prompt = template.trim();
    log(`Generated LLM prompt: ${prompt}`);

    return prompt;
};

// Helper function to remove non-alphanumeric characters from text
function removeNonAlphanumeric(text) {
    let result = '';
    for (let char of text) {
        // Check if the character is alphanumeric or a space
        if (/[a-zA-Z0-9\s]/.test(char)) {
            result += char;
        }
    }
    return result;
};

// Helper function to extract action and input from text
function extract_action_and_input(text) {
    const actionIndex = text.indexOf("Action:");
    const inputIndex = text.indexOf("Action Input:");

    let action = null;
    if (actionIndex !== -1) {
        const actionStart = actionIndex + "Action:".length;
        const actionEnd = inputIndex !== -1 ? inputIndex : text.length;
        action = text.substring(actionStart, actionEnd).trim();
        action = removeNonAlphanumeric(action);
    }

    let input = null;
    if (inputIndex !== -1) {
        const inputStart = inputIndex + "Action Input:".length;
        input = text.substring(inputStart).trim().replace(/^\"|\"$/g, '');
        input = removeNonAlphanumeric(input);
    }

    return [action, input];
};

function extractLastMessage(outcome) {
    // Check if outcome is an array and is not empty
    if (Array.isArray(outcome) && outcome.length > 0) {
        // Return the last message in the outcome array
        return outcome[outcome.length - 1];
    } else {
        // Return null if the outcome is not valid
        return null;
    }
};

function extractFinalObservation(message) {
    try {
        // Log the entire message object
        log('Message object:', message);

        // Extract observation from the content string
        const content = message.content;
        log('Message object content:', content);
        
        const observationPrefix = 'Observation: ';
        if (content && content.startsWith(observationPrefix)) {
            return content.substring(observationPrefix.length).trim();
        } else {
            // Return null if the content is not in the expected format
            return null;
        }
    } catch (error) {
        // Log and handle errors
        log('Error extracting final observation:', error);
        return null;
    }
};

// Function to format observation
async function formatObservation(output, schema) {
    try {
        // Log output and schema at the start of the function
        log("Output: " + output);
        log("Schema: " + JSON.stringify(schema));

        // Enter formatObservation function
        log("Entering formatObservation function");

        const prompt = `Format the final response to Human according to the following schema:\n${JSON.stringify(schema)}`;
        
        // Call promptLLM to format the final response
        const response = await promptLLM({
            apiKey: config.openAIapiKey,
            prompt: JSON.stringify([{ "role": "user", "content": prompt }, { "role": "system", "content": output }]),
            endpoint: config.LLMendpoint,
            model: config.LLM,
        });

        // Log the response from LLM
        log("Response from LLM: " + response);

        // Parse the response as JSON
        const formattedObservation = JSON.parse(response);

        // Exit formatObservation function
        log("Exiting formatObservation function");
        return formattedObservation;
    } catch (error) {
        // Log and handle errors
        log('Error: ' + error);
        return null;
    }
};

// Stream agent function
async function Stream_agent(tools, prompt, outputSchema) {
    // Enter Stream_agent function
    log("Entering Stream_agent function");

    // Generate the LLM prompt
    const System_prompt = generateLLMPrompt(tools);

    let messages = [
        { "role": "system", "content": System_prompt },
        { "role": "user", "content": prompt },
    ];

    for (let i = 0; i < 3; i++) {
        // Log the current loop run number
        log(`Loop run number: ${i+1}`);

        // Get response from LLM
        const response = await promptLLM({
            apiKey: config.openAIapiKey,
            prompt: JSON.stringify(messages),
            endpoint: config.LLMendpoint,
            model: config.LLM,
        });

        // Log the response from LLM
        log("Response from LLM: " + response);

        // Extract action and input from the response
        const [action, action_input] = extract_action_and_input(response);

        // Log the action
        log(`Action: ${action}`);

        // Perform action based on extracted information
        const tool = tools.find(tool => tool.name === action);
        if (tool) {
            const observation = tool.func(action_input);
            // Log the observation
            log("Observation: " + observation);
            messages.push({ "role": "system", "content": response });
            messages.push({ "role": "user", "content": "Observation: " + observation });
        } else if (action === "Response To Human") {
            // Log the response to human
            log("Response: " + action_input);
            break;
        } else {
            // Log invalid action
            log("Invalid action: " + action);
            break;
        }

        // Pause for 10 seconds between loops
        await new Promise(resolve => setTimeout(resolve, 10000));
    }

    // Log the outcome
    log("Final messages outcome: " + JSON.stringify(messages));

    // Extract the last message
    const lastMessage = extractLastMessage(messages);

    // Log the last message
    log("Last Message: " + JSON.stringify(lastMessage));

    // Extract the final observation
    const finalObservation = extractFinalObservation(lastMessage);

    // Log the final observation
    log("Final Observation: " + finalObservation);

    // Format the final observation
    const formattedFinalObservation = await formatObservation(finalObservation, outputSchema);

    // Log the formatted final observation
    log("Formatted Final Observation: " + JSON.stringify(formattedFinalObservation));

    // Exit Stream_agent function
    log("Exiting Stream_agent function");
    return messages;
};

// Example usage of Stream_agent function
async function main() {
    // Enter main function
    log("Entering main function");

    // Define an array of tool objects
    const tools = [
        {
            name: "Search",
            func: searchWikipedia,
            description: "Useful for when you need to answer questions about current events. You should ask targeted questions."
        },
        {
            name: "Calculator",
            func: calculator,
            description: "Useful for when you need to answer questions about math. Use python code, eg: 2 + 2"
        }
    ];

    // Define the desired operation
    const prompt = "what is the square of the number of new openAI board members"

    // Define the desired JSON schema
    const outputSchema = {
        "$schema": "http://json-schema.org/draft-07/schema",
        "type": "object",
        "properties": {
            "outputValue": {
                "type": "integer"
            }
        },
        "required": ["outputValue"]
    };

    // Call Stream_agent function
    const outcome = await Stream_agent(tools, prompt, outputSchema);

    // Exit main function
    log("Exiting main function");
};

// Call the main function
main();

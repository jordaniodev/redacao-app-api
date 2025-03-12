export interface ChatCompletionMessage {
    content: string;
    role: "system" | "user" | "assistant";
}

interface ChatCompletionResponseFormat {
    type: "text" | "json_object";
}

export interface ChatCompletionRequest {
    messages: ChatCompletionMessage[];
    model: string;
    frequency_penalty?: number;
    max_tokens?: number;
    presence_penalty?: number;
    response_format: ChatCompletionResponseFormat;
    stop?: string | null;
    stream?: boolean;
    stream_options?: any | null;
    temperature: number;
    top_p?: number;
    tools?: any | null;
    tool_choice?: string;
    logprobs?: boolean;
    top_logprobs?: number | null;
}

export interface ChatCompletionResponse {
    id: string;
    object: string;
    created: number;
    model: string;
    choices: ChatCompletionChoice[];
    usage: ChatCompletionUsage;
    system_fingerprint: string;
}


interface ChatCompletionChoice {
    index: number;
    message: ChatCompletionMessage;
    logprobs: any | null;
    finish_reason: string;
}


interface ChatCompletionUsage {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
    prompt_tokens_details: ChatCompletionPromptTokensDetails;
    prompt_cache_hit_tokens: number;
    prompt_cache_miss_tokens: number;
}

interface ChatCompletionPromptTokensDetails {
    cached_tokens: number;
}

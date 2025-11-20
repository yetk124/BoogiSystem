package com.buggi.backend.llm;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Map;

@Component
public class OpenAiLlmClient implements LlmClient {

    @Value("${openai.api.key}")
    private String apiKey;

    private final RestTemplate rest = new RestTemplate();

    @Override
    public String ask(String question) {
        String url = "https://api.openai.com/v1/chat/completions";

        Map<String, Object> body = Map.of(
                "model", "gpt-4o-mini",
                "messages", new Object[]{
                        Map.of("role", "user", "content", question)
                }
        );

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.setContentType(MediaType.APPLICATION_JSON);

        HttpEntity<Map<String, Object>> requestEntity =
                new HttpEntity<>(body, headers);

        Map resp = rest.postForObject(url, requestEntity, Map.class);

        var choice = ((java.util.List) resp.get("choices")).get(0);
        var msg = (Map) ((Map) choice).get("message");
        return (String) msg.get("content");
    }
}

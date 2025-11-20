package com.buggi.backend.service;

import com.buggi.backend.core.BoogiParser;
import com.buggi.backend.dto.BoogiAskRequest;
import com.buggi.backend.dto.BoogiResponse;
import com.buggi.backend.llm.LlmClient;
import org.springframework.stereotype.Service;

@Service
public class BoogiService {

    private final LlmClient llmClient;
    private final BoogiParser parser;

    public BoogiService(LlmClient llmClient, BoogiParser parser) {
        this.llmClient = llmClient;
        this.parser = parser;
    }

    public BoogiResponse askBoogi(BoogiAskRequest request) {
        String question = request.getQuestion();

        String llmRaw = llmClient.ask(question);
        var parsed = parser.parse(llmRaw);

        return new BoogiResponse(
                String.valueOf(parsed.tag()),
                parsed.args(),
                "응답 처리 완료"
        );
    }

}

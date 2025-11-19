package com.buggi.backend.core;

import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import java.util.Map;

@Component
public class BoogiParser {

    private final ObjectMapper mapper = new ObjectMapper();

    public ParsedResult parse(String text) {
        try {
            int start = text.indexOf("<boogi_");
            int mid = text.indexOf(">");
            int end = text.indexOf("<boogi_end>");

            String tagStr = text.substring(start + 7, mid);
            int tag = Integer.parseInt(tagStr);

            String json = text.substring(mid + 1, end);
            Map<String, Object> args = mapper.readValue(json, Map.class);

            return new ParsedResult(tag, args);
        } catch (Exception e) {
            return new ParsedResult(-1, Map.of());
        }
    }

    public record ParsedResult(int tag, Map<String, Object> args) {}
}

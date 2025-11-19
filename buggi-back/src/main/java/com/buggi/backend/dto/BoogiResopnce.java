//프론트로 보내는 통합 응답

package com.buggi.backend.dto;

import java.util.Map;

public class BoogiResponse {

    // boogi_0 ~ boogi_7, 또는 "none"
    private String tag;
    // 태그별 파라미터 (title, mood, borrower 등)
    private Map<String, Object> args;
    // 화면 + TTS로 읽어줄 문장
    private String answerText;

    public BoogiResponse() {
    }

    public BoogiResponse(String tag, Map<String, Object> args, String answerText) {
        this.tag = tag;
        this.args = args;
        this.answerText = answerText;
    }

    public String getTag() {
        return tag;
    }

    public void setTag(String tag) {
        this.tag = tag;
    }

    public Map<String, Object> getArgs() {
        return args;
    }

    public void setArgs(Map<String, Object> args) {
        this.args = args;
    }

    public String getAnswerText() {
        return answerText;
    }

    public void setAnswerText(String answerText) {
        this.answerText = answerText;
    }
}

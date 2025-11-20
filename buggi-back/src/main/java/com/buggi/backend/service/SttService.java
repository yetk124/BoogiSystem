// # STT 연동 자리
// # STT 연동 자리

// src/main/java/com/buggi/backend/service/SttService.java
package com.buggi.backend.service;

import com.buggi.backend.dto.ExternalSttResponse;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

@Service
public class SttService {

    private final RestTemplate restTemplate;

    // STT 서버 주소 (Python STT 서버 포트에 맞게 수정)
    private final String STT_SERVER_URL = "http://localhost:7000/stt";

    public SttService(RestTemplateBuilder builder) {
        this.restTemplate = builder.build();
    }

    public String transcribe(MultipartFile audioFile) {

        try {
            // 1) MultipartBody 만들기
            MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();

            ByteArrayResource resource = new ByteArrayResource(audioFile.getBytes()) {
                @Override
                public String getFilename() {
                    return audioFile.getOriginalFilename() != null
                            ? audioFile.getOriginalFilename()
                            : "audio.webm";
                }
            };

            body.add("audio", resource);

            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.MULTIPART_FORM_DATA);

            HttpEntity<MultiValueMap<String, Object>> requestEntity =
                    new HttpEntity<>(body, headers);

            // 2) Python STT 서버로 전송
            ResponseEntity<ExternalSttResponse> response = restTemplate.exchange(
                    STT_SERVER_URL,
                    HttpMethod.POST,
                    requestEntity,
                    ExternalSttResponse.class
            );

            // 3) 응답에서 text 꺼내기
            ExternalSttResponse resBody = response.getBody();
            if (resBody != null && resBody.getText() != null) {
                return resBody.getText();
            } else {
                return "음성을 인식하지 못했습니다.";
            }

        } catch (Exception e) {
            e.printStackTrace();
            // 에러시 안전한 기본값
            return "STT 서버 오류가 발생했습니다.";
        }
    }
}

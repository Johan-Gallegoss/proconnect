package com.proconnect.controller;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.client.RestTemplate;
import java.lang.reflect.Field;
import static org.assertj.core.api.Assertions.assertThat;
import static org.mockito.ArgumentMatchers.*;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
@DisplayName("UserGatewayController - Prueba Unitaria")
class UserGatewayControllerTest {

    @InjectMocks
    private UserGatewayController controller;

    @Mock
    private RestTemplate restTemplate;

    @BeforeEach
    void setUp() throws Exception {
        Field field = UserGatewayController.class.getDeclaredField("restTemplate");
        field.setAccessible(true);
        field.set(controller, restTemplate);
    }

    @Test
    @DisplayName("getProfessionals: redirige petición usando RestTemplate")
    void getProfessionals_success() {
        ResponseEntity<Object> mockResponse = ResponseEntity.ok("[]");
        when(restTemplate.getForEntity(contains("/professionals"), eq(Object.class)))
                .thenReturn(mockResponse);

        ResponseEntity<?> result = controller.getProfessionals();

        assertThat(result.getStatusCode()).isEqualTo(HttpStatus.OK);
    }
}

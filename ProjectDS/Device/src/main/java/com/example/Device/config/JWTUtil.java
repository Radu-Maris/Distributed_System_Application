package com.example.Device.config;
import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureException;
import org.springframework.stereotype.Component;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JWTUtil {

    private final String SECRET_KEY = "your-secret-key"; // Use a secure key

    // Validate the token and extract the device identifier
    public String validateToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(SECRET_KEY)
                .parseClaimsJws(token)
                .getBody();

        // You can extract device-specific claims if needed
        String deviceIdentifier = claims.getSubject(); // Assuming "sub" is device identifier
        Date expiration = claims.getExpiration();

        // Validate token expiration
        if (expiration.before(new Date())) {
            throw new RuntimeException("Token has expired");
        }

        return deviceIdentifier; // Return the device identifier or other relevant data
    }
}
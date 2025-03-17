package RaduMaris.demo.util;

import io.jsonwebtoken.*;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Date;

@Component
public class JwtUtil {

    private static final String SECRET_KEY = "b228f0d9e9fab419abad21f81b911ed9a97f597dfc18ceb9f9ea48e865e004730aebbe6492b2bc915ac755da02e257d2b9b656d6da03209a785306db99bf645cb1a4c9def354053f44790d7f794b57c5ca59ae6cca31b8815022b2ecbb769d022395b5cb587fe588c79a572eb10a78527b77a227fb9dda39f5d0fccf9032c9e696def1f054196998ccf407b1252277bb7dc7423120f754e6f0189820b17a74c4cfd6af813b883f067f55178f23d5391784a8bbabb7e49ab6547a63b22b4e7e5766bb9a8a02bac917b9b05bacdd78b686146f0efae818632f04822b1477430c8ba1f2c01fc7fb5b4e478b0e99fa92d61a3d1b5f368849c3a486459099159d4916";
    private static final long EXPIRATION_TIME = 3600000;

    private final Key key = Keys.hmacShaKeyFor(SECRET_KEY.getBytes());

    public String generateToken(String username) {
        return Jwts.builder()
                .setSubject(username)
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + EXPIRATION_TIME))
                .signWith(key, SignatureAlgorithm.HS256)
                .compact();
    }

    public String validateToken(String token) {
        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            return claims.getSubject();
        } catch (JwtException | IllegalArgumentException e) {
            throw new RuntimeException("Invalid JWT token");
        }
    }
}
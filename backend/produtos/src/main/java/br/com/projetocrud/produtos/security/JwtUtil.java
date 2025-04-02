package br.com.projetocrud.produtos.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.JwtParser;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.security.Key;
import java.util.Base64;
import java.util.Date;

@Component
public class JwtUtil {

  @Value("${jwt.secret}")
  private String secret = "aXKCOOT4otrHZ+hfsiYI4yTVv/yAdMlnBivtw8X2yZk=";

  public Key getSigningKey() {
    byte[] keyBytes = Base64.getDecoder().decode(secret);
    return Keys.hmacShaKeyFor(keyBytes);
  }

  @Value("${jwt.expiration}")
  private Long expiration;

  private String secretKey = Base64.getEncoder().encodeToString("aXKCOOT4otrHZ+hfsiYI4yTVv/yAdMlnBivtw8X2yZk=".getBytes());

public String generateToken(String username) {
    return Jwts.builder()
            .setSubject(username)
            .setIssuedAt(new Date())
            .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60))
            .signWith(Keys.hmacShaKeyFor(Base64.getDecoder().decode(secretKey)), SignatureAlgorithm.HS256)
            .compact();
}


  public boolean validateToken(String token, String username) {
    return username.equals(getUsernameFromToken(token)) && !isTokenExpired(token);
  }

  public String getUsernameFromToken(String token) {
    return getClaimsFromToken(token).getSubject();
  }

  private Claims getClaimsFromToken(String token) {
    JwtParser jwtParser = Jwts.parser()
        .setSigningKey(secret)
        .build();
    return jwtParser.parseClaimsJws(token).getBody();
  }

  private boolean isTokenExpired(String token) {
    return getClaimsFromToken(token).getExpiration().before(new Date());
  }
}

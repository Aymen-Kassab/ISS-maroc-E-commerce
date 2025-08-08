package com.aymen.iss.maroc.config;

import com.aymen.iss.maroc.security.CustomAdminDetailsService;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.dao.DaoAuthenticationProvider;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;

@Configuration
public class SecurityConfig {

    @Bean
    public SecurityFilterChain filterChain(HttpSecurity http) throws Exception {
        http
                .csrf().disable()
                .authorizeHttpRequests(auth -> auth
                        .requestMatchers(
                                "/admin_login.html",
                                "/admin_signup.html",
                                "/admin/signup",
                                "/auth/signup",
                                "/css_admin/**",
                                "/js_admin/**",
                                "/css_client/**",
                                "/js_client/**",
                                "/uploads/**",
                                "/news_pictures/**",
                                "/client_home.html",
                                "/client_cart.html",
                                "/client_comp_det.html",
                                "/client_comp_purchase.html",
                                "/client_computer.html",
                                "/client_contact.html",
                                "/client_net_det.html",
                                "/client_net_purchase.html",
                                "/client_network.html",
                                "/client_printer.html",
                                "/client_prn_det.html",
                                "/client_prn_purchase.html",
                                "/api/computers/**",
                                "/api/network/**",
                                "/api/printer/**",
                                "/api/news/**",
                                "/api/contact/**",
                                "/api/admin/**",
                                "/auth/api/**",
                                "/api/command/**",
                                "/api/contact/**",
                                "/api/new/**",
                                "/logo/**"
                        ).permitAll()
                        .anyRequest().authenticated()
                )
                .formLogin(form -> form
                        .loginPage("/admin_login.html")                  // Custom login page (static)
                        .loginProcessingUrl("/do-login")                 // Form action
                        .defaultSuccessUrl("/admin_home.html", true)     // Redirect after login success
                        .failureUrl("/admin_login.html?error=true")      // Redirect with ?error=true
                        .permitAll()
                )
                .logout(logout -> logout
                        .logoutUrl("/logout")
                        .logoutSuccessUrl("/admin_login.html?logout=true")  // Redirect with ?logout=true
                        .invalidateHttpSession(true)
                        .deleteCookies("JSESSIONID")
                        .permitAll()
                );

        return http.build();
    }

    @Bean
    public DaoAuthenticationProvider authenticationProvider(CustomAdminDetailsService userDetailsService) {
        DaoAuthenticationProvider authProvider = new DaoAuthenticationProvider();
        authProvider.setUserDetailsService(userDetailsService);
        authProvider.setPasswordEncoder(passwordEncoder());
        return authProvider;
    }

    @Bean
    public BCryptPasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration config)
            throws Exception {
        return config.getAuthenticationManager();
    }
}
